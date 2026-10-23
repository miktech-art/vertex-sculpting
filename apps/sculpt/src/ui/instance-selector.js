// Keep selection and deletion as separate, comfortably clickable buttons.
export function instanceRow(selector,label,onRemove){
  const row=document.createElement('div');row.className='modulation-instance';row.append(selector);
  if(onRemove){
    const remove=document.createElement('button');remove.type='button';remove.className='instance-delete';
    remove.setAttribute('aria-label',label);remove.title=label;
    remove.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5h10M6 4.5V2.5h4v2M4.5 4.5l.5 9h6l.5-9M6.5 6.5v5M9.5 6.5v5"/></svg>';
    remove.addEventListener('click',onRemove);row.append(remove);
  }
  return row;
}
