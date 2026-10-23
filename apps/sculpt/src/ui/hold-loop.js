// Own a Space press until release, even if focus or modifiers change meanwhile.
export function installHoldLoopShortcut(target, start, stop, hasDialog) {
  let held = false;
  const consume = event => { event.preventDefault(); event.stopPropagation(); };
  const release = () => { if (held) { held = false; stop(); } };
  target.addEventListener('keydown', event => {
    if (event.code !== 'Space') return;
    if (held) { consume(event); return; }
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey || hasDialog()) return;
    if (event.target?.isContentEditable || event.target?.matches('textarea,select,input')) return;
    consume(event); held = true; start();
  }, true);
  target.addEventListener('keyup', event => {
    if (event.code === 'Space' && held) { consume(event); release(); }
  }, true);
  target.defaultView?.addEventListener('blur', release);
  target.addEventListener('visibilitychange', () => { if (target.hidden) release(); });
}
