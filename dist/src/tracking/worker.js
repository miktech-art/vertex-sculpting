import {
  FilesetResolver,
  HandLandmarker,
} from "../../vendor/mediapipe/vision_bundle.mjs";

let tracker = null;
self.addEventListener("message", async (event) => {
  const data = event.data;
  if (data.type === "init") {
    try {
      const root = new URL("../../vendor/mediapipe/", import.meta.url);
      const files = await FilesetResolver.forVisionTasks(
        new URL("wasm", root).href,
        true,
      );
      tracker = await HandLandmarker.createFromOptions(files, {
        baseOptions: {
          modelAssetPath: new URL("hand_landmarker.task", root).href,
          delegate: "CPU",
        },
        canvas: new OffscreenCanvas(1, 1),
        runningMode: "VIDEO",
        numHands: 2,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.65,
        minTrackingConfidence: 0.6,
      });
      self.postMessage({ type: "ready" });
    } catch (error) {
      self.postMessage({
        type: "error",
        message: error.message || "MediaPipe could not initialize.",
      });
    }
  } else if (data.type === "frame") {
    try {
      if (!tracker) throw new Error("Hand tracker is not ready.");
      const result = tracker.detectForVideo(data.frame, data.timestamp);
      self.postMessage({ type: "result", timestamp: data.timestamp, result });
    } catch (error) {
      self.postMessage({
        type: "error",
        message: error.message || "Hand tracking failed.",
      });
    } finally {
      data.frame?.close();
    }
  }
});
