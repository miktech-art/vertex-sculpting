// Fixed overlays never enlarge the document or summon a page scrollbar.
export function positionMenu(menu,anchor){
  const box=anchor.getBoundingClientRect();
  menu.style.position='fixed';menu.style.bottom='auto';menu.style.right='auto';
  menu.style.top=`${box.bottom+7}px`;
  menu.style.maxHeight=`${Math.max(32,window.innerHeight-box.bottom-15)}px`;
  menu.style.maxWidth=`${Math.max(100,window.innerWidth-16)}px`;
  menu.style.left=`${Math.max(8,Math.min(box.right-menu.offsetWidth,window.innerWidth-menu.offsetWidth-8))}px`;
}
