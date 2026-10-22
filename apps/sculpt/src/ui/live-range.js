// Pointer capture provides continuous updates even in embedded browsers that
// defer native range input events. Keyboard input stays native and accessible.
export function installLiveRange(input) {
  let dragging = false;
  const move = (event) => {
    const rect = input.getBoundingClientRect(),
      n = Math.max(
        0,
        Math.min(
          1,
          (event.clientX - rect.left - 3.5) / Math.max(1, rect.width - 7),
        ),
      );
    input.value = String(
      Math.round(
        Number(input.min) + n * (Number(input.max) - Number(input.min)),
      ),
    );
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };
  input.style.touchAction = "none";
  input.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    dragging = true;
    input.focus({ preventScroll: true });
    input.setPointerCapture(event.pointerId);
    move(event);
  });
  input.addEventListener("pointermove", (event) => {
    if (dragging) move(event);
  });
  const end = () => {
    if (dragging) {
      dragging = false;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };
  input.addEventListener("pointerup", end);
  input.addEventListener("pointercancel", end);
}
