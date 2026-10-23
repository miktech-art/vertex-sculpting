// Actions belong to the selected instance, separate from the instance selector column.
export function instanceActions(container,{kind,index,enabled,onToggle,onRemove}){
  container.replaceChildren();
  const power=document.createElement('button');power.type='button';power.className='modulation-power';
  power.setAttribute('aria-label',`Turn ${enabled?'off':'on'} ${kind} ${index+1}`);power.setAttribute('aria-pressed',enabled);
  power.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v6M4.5 3.5a5.5 5.5 0 1 0 7 0"/></svg>';
  power.addEventListener('click',onToggle);container.append(power);
  if(onRemove){
    const remove=document.createElement('button');remove.type='button';remove.className='instance-delete';
    remove.setAttribute('aria-label',`Delete ${kind} ${index+1}`);
    remove.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5h10M6 4.5V2.5h4v2M4.5 4.5l.5 9h6l.5-9M6.5 6.5v5M9.5 6.5v5"/></svg>';
    remove.addEventListener('click',onRemove);container.append(remove);
  }
}
