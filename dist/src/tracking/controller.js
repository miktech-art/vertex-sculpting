import { GestureBinding, inspectRightHand, PITCH_BINDING } from "./gesture.js";

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
    onPitch = () => {},
    onGate = () => {},
    getPitch = () => 220,
  } = {}) {
    this.onEnable = onEnable;
    this.onPitch = onPitch;
    this.onGate = onGate;
    this.getPitch = getPitch;
    this.button = document.querySelector("#camera-button");
    this.panel = document.querySelector("#camera-panel");
    this.video = document.querySelector("#camera-video");
    this.overlay = document.querySelector("#hand-overlay");
    this.status = document.querySelector("#camera-status");
    this.placeholder = document.querySelector("#camera-placeholder");
    this.binding = new GestureBinding();
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
    this.status.textContent = text;
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
      this.binding.reset(this.getPitch());
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
      this.setStatus("Show your right hand", "ready");
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
      // Mirror pixels before inference so handedness and the mirrored preview agree.
      c.setTransform(-1, 0, 0, 1, w, 0);
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
    if (this.blocked) {
      const sample = inspectRightHand(result);
      this.draw(sample, false);
      this.indicators(sample);
      if (sample.allowed) {
        this.setStatus("Open your hand to resume", "ready");
        return;
      }
      this.blocked = false;
      this.binding.reset(this.getPitch());
    }
    const sample = this.binding.update(result, time);
    this.draw(sample, sample.active && sample.allowed);
    this.indicators(sample);
    if (sample.active !== this.gate) {
      this.gate = sample.active;
      this.onGate(this.gate);
    }
    if (sample.pitch !== null && sample.allowed) {
      if (Math.abs(sample.pitch - (this.sentPitch ?? 0)) > 0.1) {
        this.sentPitch = sample.pitch;
        this.onPitch(sample.pitch);
      }
      this.setStatus(`Pitch active · ${Math.round(sample.pitch)} Hz`, "active");
    } else
      this.setStatus(
        !sample.hasRight
          ? "Show your right hand"
          : sample.allowed
            ? "Hold pose…"
            : "Curl middle, ring and little fingers",
        "ready",
      );
  }
  indicators(sample) {
    document.querySelectorAll("[data-finger]").forEach((node, i) => {
      node.dataset.curled = sample.curled[i] ? "true" : "false";
      node.setAttribute(
        "aria-label",
        `${["Middle", "Ring", "Little"][i]} finger ${sample.curled[i] ? "curled" : "open"}`,
      );
    });
  }
  draw(sample, active) {
    const c = this.overlay.getContext("2d"),
      w = this.overlay.width,
      h = this.overlay.height;
    c.clearRect(0, 0, w, h);
    if (!sample.landmarks) return;
    const points = sample.landmarks;
    c.lineWidth = 1.3;
    c.strokeStyle = active ? "#e7c3a1" : "#ffffffa0";
    c.beginPath();
    for (const [a, b] of EDGES) {
      c.moveTo(points[a].x * w, points[a].y * h);
      c.lineTo(points[b].x * w, points[b].y * h);
    }
    c.stroke();
    for (let i = 0; i < points.length; i++) {
      c.beginPath();
      c.arc(
        points[i].x * w,
        points[i].y * h,
        i === 8 ? 5 : 2.1,
        0,
        Math.PI * 2,
      );
      c.fillStyle = i === 8 && active ? "#e7c3a1" : "#fff";
      c.fill();
    }
    c.setLineDash([3, 5]);
    c.strokeStyle = "#ffffff35";
    for (const y of [PITCH_BINDING.top, PITCH_BINDING.bottom]) {
      c.beginPath();
      c.moveTo(w - 25, y * h);
      c.lineTo(w - 6, y * h);
      c.stroke();
    }
    c.setLineDash([]);
  }
  disarm() {
    this.blocked = true;
    this.binding.reset(this.getPitch());
    if (this.gate) {
      this.gate = false;
      this.onGate(false);
    }
    if (this.active) this.setStatus("Open your hand to resume", "ready");
  }
  stop() {
    this.epoch++;
    this.active = false;
    this.starting = false;
    cancelAnimationFrame(this.animation);
    clearInterval(this.watchdog);
    if (this.gate) {
      this.gate = false;
      this.onGate(false);
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
    this.binding.reset(this.getPitch());
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
