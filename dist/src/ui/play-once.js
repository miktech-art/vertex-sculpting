// Reserve Space for one note, even when a slider or transport button has focus.
export function installPlayOnceShortcut(target, playOnce, hasDialog) {
  target.addEventListener("keydown", (event) => {
    if (event.code !== "Space" || event.metaKey || event.ctrlKey || event.altKey || hasDialog()) return;
    const focused = event.target;
    if (focused?.isContentEditable || focused?.matches('textarea,select,input:not([type="range"])')) return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) playOnce();
  }, true);
}
