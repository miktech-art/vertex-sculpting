import { duration, envelopeAt } from '../model.js';
export class ContourView {
  constructor(canvas){this.canvas=canvas;this.context=canvas.getContext('2d');this.observer=new ResizeObserver(()=>this.draw());this.observer.observe(canvas);}
  setParams(params){this.params=params;this.draw();}
  draw(progress=null){const p=this.params;if(!p)return;const canvas=this.canvas,r=canvas.getBoundingClientRect();if(!r.width)return;const dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(r.width*dpr)||canvas.height!==Math.round(r.height*dpr)){canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);}const c=this.context;c.setTransform(dpr,0,0,dpr,0,0);const w=r.width,h=r.height,pad=3,range=w-pad*2,total=duration(p),x=t=>pad+t/total*range,y=a=>h-5-a*(h-14);c.clearRect(0,0,w,h);c.strokeStyle='#282d27';c.lineWidth=.6;c.beginPath();c.moveTo(pad,h-5);c.lineTo(w-pad,h-5);c.stroke();
    const marks=[p.attack,p.attack+p.decay,p.attack+p.decay+p.hold];for(const t of marks){c.setLineDash([2,4]);c.beginPath();c.moveTo(x(t),5);c.lineTo(x(t),h-5);c.stroke();}c.setLineDash([]);
    c.beginPath();c.moveTo(x(0),y(0));c.lineTo(x(p.attack),y(1));c.lineTo(x(p.attack+p.decay),y(p.sustain));c.lineTo(x(p.attack+p.decay+p.hold),y(p.sustain));c.lineTo(x(total),y(0));c.strokeStyle='#959f8a';c.lineWidth=.9;c.stroke();c.lineTo(w-pad,h-5);c.lineTo(pad,h-5);c.closePath();c.fillStyle='#adb59c06';c.fill();for(const [t,a]of [[p.attack,1],[p.attack+p.decay,p.sustain],[p.attack+p.decay+p.hold,p.sustain]]){c.beginPath();c.arc(x(t),y(a),1.5,0,Math.PI*2);c.fillStyle='#aeb89f';c.fill();}
    if(progress!==null&&progress>=0&&progress<=1){const xx=x(progress*total);c.strokeStyle='#e1c2a2';c.lineWidth=.8;c.beginPath();c.moveTo(xx,3);c.lineTo(xx,h-4);c.stroke();c.beginPath();c.arc(xx,y(envelopeAt(p,progress*total)),2.2,0,Math.PI*2);c.fillStyle='#f1d4b6';c.fill();}
  }
}
