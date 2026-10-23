import {routeSelect} from "./route-select.js";
import {Knob} from './knob.js';
import {TableSelect} from './table-select.js';
import {defaultLfo,getLfos,LFO_SHAPES,lfoWave,MOD_LIMITS,lfoDestinations,availableDestinations} from '../lfo.js';
export class LfoPanel {
  constructor({onEdit,onAdd,onCommit}){
    Object.assign(this,{onEdit,onAdd,onCommit});this.selected=0;this.knobs=new Map();
    this.shapes=new TableSelect(document.querySelector('#lfo-shape'),shape=>{this.onEdit(this.selected,{shape});this.onCommit();},{labels:LFO_SHAPES,label:'LFO waveform',id:'lfo-waveform-options'});
    this.canvas=document.querySelector('#lfo-canvas');this.ctx=this.canvas.getContext('2d');
    this.observer=new ResizeObserver(()=>this.draw());this.observer.observe(this.canvas);
  }
  setParams(params){
    this.params=params;this.lfos=getLfos(params);if(this.selected>=this.lfos.length)this.selected=0;
    const lfo=this.lfos[this.selected],key=`${this.selected}:${this.lfos.map(l=>`${l.target}:${l.enabled!==false}`).join(",")}`;
    if(key!==this.key){this.key=key;this.build();}
    this.shapes.setValue(lfo.shape);
    for(const [id,knob] of this.knobs)knob.setValue(lfo[id]);
    this.draw();
  }
  build(){
    const lfo=this.lfos[this.selected],container=document.querySelector('#lfo-selectors');container.replaceChildren();
    for(let i=0;i<this.lfos.length;i++){
      const b=document.createElement('button');b.className='envelope-selector';b.classList.toggle('selected',i===this.selected);b.classList.toggle('enabled',this.lfos[i].enabled!==false);
      b.setAttribute('aria-label',`LFO ${i+1}`);b.setAttribute('aria-pressed',i===this.selected);
      b.addEventListener('click',()=>{this.selected=i;this.setParams(this.params);});container.append(b);
    }
    const free=availableDestinations(lfoDestinations,this.lfos,-1).filter(([target])=>target!=='none');
    const power=document.querySelector('#lfo-power'),enabled=lfo.enabled!==false;
    power.setAttribute('aria-label',`Turn ${enabled?'off':'on'} LFO ${this.selected+1}`);power.setAttribute('aria-pressed',enabled);
    power.onclick=()=>{this.onEdit(this.selected,{enabled:!enabled});this.onCommit();};
    const add=document.createElement('button');add.className='envelope-add';add.textContent='+';add.setAttribute('aria-label','Add LFO');add.disabled=this.lfos.length>=8||!free.length;
    add.addEventListener('click',()=>{this.selected=this.lfos.length;const target=free[0]?.[0];if(target)this.onAdd({...defaultLfo(),target,amount:{pitch:2,wavePosition:.25,cutoff:1,amplitude:.5,none:0}[target]});});container.append(add);
    const route=document.querySelector('#lfo-routing');route.replaceChildren();
    routeSelect(route,{label:'LFO destination',value:lfo.target,options:availableDestinations(lfoDestinations,this.lfos,this.selected),onChange:target=>{
      this.onEdit(this.selected,{target,amount:{pitch:2,wavePosition:.25,cutoff:1,amplitude:.5,none:0}[target]});this.onCommit();
    }});
    const controls=document.querySelector('#lfo-controls');controls.replaceChildren();this.knobs.clear();
    for(const [id,label,min,max] of [['rate','Rate',.05,30],['amount','Depth',-MOD_LIMITS[lfo.target],MOD_LIMITS[lfo.target]],['phase','Phase',0,1],['delay','Delay',0,2],['fade','Fade',0,3],['offset','Offset',-1,1]]){
      const knob=new Knob({id:`lfo-${id}`,label,min,max,value:lfo[id],
        normalize:v=>id==='rate'?Math.log(v/min)/Math.log(max/min):(v-min)/(max-min),
        denormalize:n=>id==='rate'?min*(max/min)**n:min+n*(max-min),
        format:v=>id==='rate'?`${v.toFixed(2)} Hz`:['delay','fade'].includes(id)?`${v.toFixed(2)} s`:id==='amount'&&lfo.target==='pitch'?`${v.toFixed(1)} st`:id==='amount'&&lfo.target==='cutoff'?`${v.toFixed(1)} oct`:`${(v*100).toFixed(0)}%`,
        onInput:value=>this.onEdit(this.selected,{[id]:value}),onCommit:this.onCommit});
      controls.append(knob.element);this.knobs.set(id,knob);
    }
  }
  draw(){
    if(!this.lfos)return;
    const r=this.canvas.getBoundingClientRect();if(!r.width)return;
    const dpr=Math.min(window.devicePixelRatio||1,2),w=r.width,h=r.height;
    this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);
    const c=this.ctx,lfo=this.lfos[this.selected];c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
    c.strokeStyle='#303030';c.lineWidth=.6;c.beginPath();c.moveTo(6,h/2);c.lineTo(w-6,h/2);c.stroke();
    c.strokeStyle='#ccc';c.lineWidth=1;c.beginPath();
    for(let i=0;i<=400;i++){const x=6+i/400*(w-12),y=h/2-Math.max(-1,Math.min(1,lfoWave(lfo.shape,i/400*2*lfo.rate+lfo.phase)+lfo.offset))*(h/2-12);if(!i)c.moveTo(x,y);else c.lineTo(x,y);}
    c.stroke();
  }
}
