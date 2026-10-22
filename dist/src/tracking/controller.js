import {
  LoopBinding,
  ReleaseBinding,
  AttackBinding,
  inspectLoopHand,
} from "./gesture.js";

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
];

export class HandController {
  constructor({
    onEnable = () => {},
    onLoop = () => {},
    getRelease = () => 1,
    onRelease = () => {},
    getAttack = () => 0.08,
    onAttack = () => {},
    onEditing = () => {},
  } = {}) {
    this.onEnable = onEnable;
    this.onLoop = onLoop;
    this.getRelease = getRelease;
    this.onRelease = onRelease;
    this.getAttack = getAttack;
    this.onAttack = onAttack;
    this.onEditing = onEditing;
    this.editing = false;
    this.button = document.querySelector("#camera-button");
    this.panel = document.querySelector("#camera-panel");
    this.video = document.querySelector("#camera-video");
    this.overlay = document.querySelector("#hand-overlay");
    this.placeholder = document.querySelector("#camera-placeholder");
    this.binding = new LoopBinding();
    this.releaseBinding = new ReleaseBinding();
    this.attackBinding = new AttackBinding();
    this.active = false;
    this.starting = false;
    this.blocked = false;
    this.gate = false;
    this.epoch = 0;
    this.button.addEventListener("click", () => {
      if (this.active || this.starting) this.stop();
      else this.start();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.stop();
    });
    window.addEventListener("pagehide", () => this.stop());
  }
  setStatus(text, state = "off") {
    this.button.title = state === "error" ? text : "";
    this.panel.dataset.state = state;
  }
  loadWorker() {
    this.worker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () =>
          reject(
            new Error(
              "MediaPipe load timed out. Try enabling the camera again.",
            ),
          ),
        45000,
      );
      this.cancelLoad = () => {
        clearTimeout(timeout);
        reject(new Error("Cancelled"));
      };
      this.worker.addEventListener("error", (event) => {
        clearTimeout(timeout);
        const error = new Error(
          event.message || "Hand tracking worker failed.",
        );
        if (this.starting) reject(error);
        else this.fail(error);
      });
      this.worker.addEventListener("message", (event) => {
        const data = event.data;
        if (data.type === "ready") {
          clearTimeout(timeout);
          this.cancelLoad = null;
          this.panel.dataset.model = "ready";
          resolve();
        }
        if (data.type === "error") {
          clearTimeout(timeout);
          const error = new Error(data.message);
          if (this.starting) reject(error);
          else this.fail(error);
        }
        if (data.type === "result") {
          this.busy = false;
          this.lastResult = performance.now();
          this.consume(data.result, this.lastResult);
        }
      });
      this.worker.postMessage({ type: "init" });
    });
  }
  async start() {
    const epoch = ++this.epoch;
    this.starting = true;
    this.panel.dataset.model = "loading";
    this.button.textContent = "Cancel";
    this.setStatus("Loading MediaPipe…", "loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error(
          "Camera access requires a supported browser and HTTPS.",
        );
      // Start audio during the user's click so gesture notes can play without another prompt.
      const audioReady = this.onEnable();
      await Promise.all([audioReady, this.loadWorker()]);
      if (epoch !== this.epoch) return;
      this.setStatus("Waiting for camera permission…", "loading");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30, max: 30 },
        },
      });
      if (epoch !== this.epoch) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      this.video.srcObject = stream;
      await this.video.play();
      if (epoch !== this.epoch) return;
      const width = Math.min(640, this.video.videoWidth || 640),
        height = Math.round(
          (width * (this.video.videoHeight || 480)) /
            (this.video.videoWidth || 640),
        );
      this.frameCanvas = new OffscreenCanvas(width, height);
      this.frameContext = this.frameCanvas.getContext("2d");
      this.overlay.width = width;
      this.overlay.height = height;
      this.video.parentElement.style.aspectRatio = `${width}/${height}`;
      this.binding.reset();
      this.releaseBinding.reset(this.getRelease());
      this.attackBinding.reset(this.getAttack());
      this.active = true;
      this.starting = false;
      this.blocked = false;
      this.busy = false;
      this.lastVideoTime = -1;
      this.lastFrame = -Infinity;
      this.lastResult = performance.now();
      this.lastSent = -Infinity;
      this.placeholder.hidden = true;
      this.video.hidden = false;
      this.button.textContent = "Disable";
      this.setStatus("Raise left index for Loop", "ready");
      for (const track of stream.getVideoTracks())
        track.addEventListener("ended", () => this.stop());
      this.watchdog = setInterval(() => {
        if (this.active && performance.now() - this.lastResult > 550) {
          this.consume({}, performance.now());
          this.setStatus("Tracking paused", "ready");
        }
      }, 200);
      this.tick();
    } catch (error) {
      if (epoch !== this.epoch) return;
      this.fail(error);
    }
  }
  tick = () => {
    if (!this.active) return;
    const now = performance.now();
    if (
      !this.busy &&
      now - this.lastFrame >= 40 &&
      this.video.readyState >= 2 &&
      this.video.currentTime !== this.lastVideoTime
    ) {
      this.busy = true;
      this.lastFrame = now;
      this.lastVideoTime = this.video.currentTime;
      const c = this.frameContext,
        w = this.frameCanvas.width,
        h = this.frameCanvas.height;
      // Task handedness follows unmirrored camera input. Mirror only the preview/overlay.
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.drawImage(this.video, 0, 0, w, h);
      const frame = this.frameCanvas.transferToImageBitmap();
      this.worker.postMessage({ type: "frame", frame, timestamp: now }, [
        frame,
      ]);
    }
    this.animation = requestAnimationFrame(this.tick);
  };
  consume(result, time) {
    if (!this.active) return;
    let release = this.releaseBinding.update(result, time),
      attack = this.attackBinding.update(result, time);
    if (this.blocked) {
      const sample = inspectLoopHand(result);
      this.draw(sample, false, release, attack);
      this.indicators(sample, release, attack);
      if (sample.allowed || release.rawAllowed || attack.rawAllowed) {
        this.setStatus("Relax both hands to resume", "ready");
        return;
      }
      this.blocked = false;
      this.binding.reset();
      this.releaseBinding.reset(this.getRelease());
      this.attackBinding.reset(this.getAttack());
      release = this.releaseBinding.update(result, time);
      attack = this.attackBinding.update(result, time);
    }
    // Envelope gestures take priority over the single-index loop gate.
    const sample = this.binding.update(
      release.allowed || release.active || attack.allowed || attack.active
        ? {}
        : result,
      time,
    );
    const editing = release.active || attack.active;
    const wasEditing = this.editing;
    if (editing !== this.editing) {
      this.editing = editing;
      if (editing) this.onEditing(true);
    }
    this.draw(sample, sample.active && sample.allowed, release, attack);
    this.indicators(sample, release, attack);
    if (sample.active !== this.gate) {
      this.gate = sample.active;
      this.onLoop(this.gate);
    }
    if (sample.active) {
      this.setStatus("Loop on · lower left index to stop repeats", "active");
    } else if (release.release !== null && release.allowed) {
      this.onRelease(release.release);
      this.setStatus(
        `Release active · ${release.release.toFixed(2)} s`,
        "active",
      );
    } else if (attack.attack !== null && attack.allowed) {
      this.onAttack(attack.attack);
      this.setStatus(`Attack active · ${attack.attack.toFixed(2)} s`, "active");
    } else {
      this.setStatus(
        release.allowed || attack.allowed || sample.allowed
          ? "Hold pose…"
          : release.leftOpen
            ? "Pinch right thumb + index for release"
            : release.pinched
              ? "Hold left hand upright (±15°)"
              : attack.rightOpen
                ? "Pinch left thumb + index for attack"
                : attack.pinched
                  ? "Hold right hand upright (±15°)"
                  : !sample.hasLoopHand
                    ? "Show your left hand"
                    : !sample.indexExtended
                      ? "Raise your left index finger for Loop"
                      : "Raise only the left index finger for Loop",
        "ready",
      );
    }
    if (!editing && wasEditing) this.onEditing(false);
  }
  indicators(sample, release = {}, attack = {}) {
    document.querySelectorAll("[data-finger]").forEach((node) => {
      const index = ["middle", "ring", "pinky"].indexOf(node.dataset.finger);
      const valid = index < 0 ? sample.indexRaised : sample.curled[index];
      node.dataset.curled = valid ? "true" : "false";
      node.setAttribute(
        "aria-label",
        index < 0
          ? `Left index ${valid ? "raised" : "lowered"}`
          : `${["Middle", "Ring", "Pinky"][index]} finger ${valid ? "bent" : "extended"}`,
      );
    });
    for (const [id, valid] of [
      ["left-open", release.leftOpen],
      ["right-pinch", release.pinched],
      ["right-open", attack.rightOpen],
      ["left-pinch", attack.pinched],
    ]) {
      const node = document.getElementById(id);
      node.dataset.valid = valid ? "true" : "false";
      node.setAttribute(
        "aria-label",
        `${{
          "left-open": "Left hand open and upright",
          "right-pinch": "Right thumb and index pinched",
          "right-open": "Right hand open and upright",
          "left-pinch": "Left thumb and index pinched",
        }[id]}: ${valid ? "yes" : "no"}`,
      );
    }
  }
  draw(sample, active, release = {}, attack = {}) {
    const c = this.overlay.getContext("2d"),
      w = this.overlay.width,
      h = this.overlay.height;
    c.clearRect(0, 0, w, h);
    const drawHand = (points, label, highlighted) => {
      if (!points) return;
      const x = (i) => (1 - points[i].x) * w,
        y = (i) => points[i].y * h;
      c.lineWidth = 1.3;
      c.strokeStyle = highlighted ? "#e7c3a1" : "#ffffffa0";
      c.beginPath();
      for (const [a, b] of EDGES) {
        c.moveTo(x(a), y(a));
        c.lineTo(x(b), y(b));
      }
      c.stroke();
      for (let i = 0; i < points.length; i++) {
        c.beginPath();
        c.arc(x(i), y(i), i === 8 ? 5 : 2.1, 0, Math.PI * 2);
        c.fillStyle = highlighted ? "#e7c3a1" : "#fff";
        c.fill();
      }
      c.font = "18px monospace";
      c.fillText(label, x(0) + 8, y(0) - 8);
    };
    drawHand(
      release.left?.landmarks || sample.landmarks, "L",
      active || release.leftOpen || (attack.active && attack.allowed),
    );
    drawHand(
      release.right?.landmarks,
      "R",
      attack.rightOpen || (release.active && release.allowed),
    );
    for (const pose of [release, attack]) {
      if (!pose.allowed || !pose.anchor || !pose.pinch) continue;
      c.strokeStyle = "#e7c3a1";
      c.setLineDash([5, 5]);
      c.beginPath();
      c.moveTo((1 - pose.anchor.x) * w, pose.anchor.y * h);
      c.lineTo((1 - pose.pinch.x) * w, pose.anchor.y * h);
      c.stroke();
      c.setLineDash([]);
    }
  }
  disarm() {
    this.blocked = true;
    this.binding.reset();
    this.releaseBinding.reset(this.getRelease());
    this.attackBinding.reset(this.getAttack());
    if (this.editing) {
      this.editing = false;
      this.onEditing(false);
    }
    if (this.gate) {
      this.gate = false;
      this.onLoop(false);
    }
    if (this.active) this.setStatus("Relax both hands to resume", "ready");
  }
  stop() {
    this.epoch++;
    this.active = false;
    this.starting = false;
    cancelAnimationFrame(this.animation);
    clearInterval(this.watchdog);
    if (this.gate) {
      this.gate = false;
      this.onLoop(false);
    }
    if (this.editing) {
      this.editing = false;
      this.onEditing(false);
    }
    this.cancelLoad?.();
    this.cancelLoad = null;
    this.worker?.terminate();
    this.worker = null;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.video.pause();
    this.video.srcObject = null;
    this.video.hidden = true;
    this.placeholder.hidden = false;
    this.overlay
      .getContext("2d")
      .clearRect(0, 0, this.overlay.width, this.overlay.height);
    this.indicators({ curled: [false, false, false] });
    this.binding.reset();
    this.releaseBinding.reset(this.getRelease());
    this.attackBinding.reset(this.getAttack());
    this.button.textContent = "Enable";
    this.setStatus("Camera off");
  }
  fail(error) {
    this.stop();
    const message =
      {
        NotAllowedError:
          "Camera permission denied. Allow access and try again.",
        NotFoundError: "No camera found.",
        NotReadableError: "Camera is unavailable or in use.",
      }[error.name] ||
      error.message ||
      "Camera could not start.";
    this.setStatus(message, "error");
  }
}
