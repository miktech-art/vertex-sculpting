// One editor and one small portal menu per active card, outside the scrolling row.
let activeEditor=null;
export function closeSoundMenu(){activeEditor?.finish();}
export function soundCard(doc,{active,preview,onLoad,onRename,onDuplicate,onDelete,onError}){
  const item=document.createElement('div');item.className='saved-card-item';item.dataset.libraryId=doc.libraryId;
  const button=document.createElement('button');button.className='preset-card saved-card';
  button.dataset.soundKey=`saved:${doc.libraryId}`;button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',active);button.setAttribute('aria-label',`Load ${doc.name}`);
  button.append(preview);button.addEventListener('click',onLoad);
  const name=document.createElement('input');name.className='sound-card-name';name.value=doc.name;name.readOnly=true;
  name.maxLength=60;name.setAttribute('aria-label',`Rename ${doc.name}`);name.autocomplete='off';name.spellcheck=false;
  const manage=document.createElement('button');manage.className='sound-menu-button';manage.textContent='⋯';
  manage.setAttribute('aria-label',`Manage ${doc.name}`);manage.setAttribute('aria-haspopup','menu');manage.setAttribute('aria-expanded','false');
  let menu=null,editing=false,original=doc.name;
  const close=()=>{menu?.remove();menu=null;manage.setAttribute('aria-expanded','false');document.removeEventListener('pointerdown',outside,true);if(activeEditor?.item===item)activeEditor=null;};
  const finish=(cancel=false)=>{
    if(!editing){close();return true;}
    const next=cancel?original:name.value.trim().slice(0,60);
    if(!next){name.value=original;}
    editing=false;name.readOnly=true;name.blur();close();
    if(next&&next!==original){try{onRename(next);original=next;name.value=next;}catch(error){name.value=original;onError(error.message);return false;}}
    else name.value=original;
    return true;
  };
  function outside(event){if(!item.contains(event.target)&&!menu?.contains(event.target))finish();}
  const start=()=>{
    if(activeEditor?.item!==item)closeSoundMenu();
    editing=true;name.readOnly=false;name.focus({preventScroll:true});name.select();
    activeEditor={item,finish};
  };
  name.addEventListener('click',event=>{event.stopPropagation();if(!editing)start();});
  name.addEventListener('focus',()=>{if(!editing)start();});
  name.addEventListener('blur',event=>{if(menu?.contains(event.relatedTarget)||event.relatedTarget===manage)return;finish();});
  name.addEventListener('keydown',event=>{
    event.stopPropagation();
    if(event.key==='Enter'){event.preventDefault();finish();}
    if(event.key==='Escape'){event.preventDefault();finish(true);}
    if((event.key==='ArrowDown'||event.key==='Tab'&&!event.shiftKey)&&menu){event.preventDefault();menu.querySelector('button').focus();}
  });
  manage.addEventListener('click',()=>{
    if(menu){finish();return;}
    start();
    menu=document.createElement('div');menu.className='sound-card-menu';menu.setAttribute('role','menu');
    menu.setAttribute('aria-label',`Manage ${doc.name}`);
    for(const [label,action] of [['Duplicate',onDuplicate],['Delete',onDelete]]){
      const option=document.createElement('button');option.textContent=label;option.setAttribute('role','menuitem');
      option.addEventListener('pointerdown',event=>event.preventDefault());
      option.addEventListener('click',()=>{if(!finish())return;try{action();}catch(error){onError(error.message);}});
      menu.append(option);
    }
    menu.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();finish(true);manage.focus();}
      if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const options=[...menu.children];options[(options.indexOf(document.activeElement)+1)%options.length].focus();}
    });
    const box=item.getBoundingClientRect();menu.style.left=`${Math.max(8,Math.min(innerWidth-116,box.right-112))}px`;menu.style.top=`${box.bottom+4}px`;
    document.body.append(menu);manage.setAttribute('aria-expanded','true');
    document.addEventListener('pointerdown',outside,true);
  });
  item.append(button,name,manage);return item;
}
