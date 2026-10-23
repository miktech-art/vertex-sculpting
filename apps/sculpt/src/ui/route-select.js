// A downward-opening menu shared with wavetable/waveform controls.
export function routeSelect(root,{label,options,value,onChange}) {
  const wrap=document.createElement('div');wrap.className='wavetable-select route-select';
  const button=document.createElement('button');button.className='wavetable-trigger';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-label',label);button.setAttribute('aria-expanded','false');
  button.textContent=options.find(o=>o[0]===value)?.[1]||value;
  const menu=document.createElement('div');menu.className='wavetable-options';menu.setAttribute('role','listbox');menu.setAttribute('aria-label',`${label} options`);menu.hidden=true;
  const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');};
  for(const [id,title] of options){
    const option=document.createElement('button');option.textContent=title;option.setAttribute('role','option');option.setAttribute('aria-selected',id===value);
    option.addEventListener('click',()=>{close();onChange(id);});
    option.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();button.focus();}if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const items=[...menu.children],i=items.indexOf(option);items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();}});
    menu.append(option);
  }
  button.addEventListener('click',()=>{menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',!menu.hidden);if(!menu.hidden)menu.querySelector('[aria-selected="true"]')?.focus();});
  wrap.addEventListener('focusout',e=>{if(!wrap.contains(e.relatedTarget))close();});
  wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close();button.focus();}});
  wrap.append(button,menu);root.append(wrap);return wrap;
}
