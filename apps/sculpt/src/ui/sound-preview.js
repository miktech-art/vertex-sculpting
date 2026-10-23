import {resolveMappings} from '../model.js';
import {buildGeometry,SculptureRenderer} from '../visual/sculpture.js';

// Render a saved snapshot with exactly the same geometry and drawing code as
// the main stage. No observers, input handlers or animation loops per card.
export function soundPreview(doc) {
  const canvas=document.createElement('canvas');
  canvas.width=252;canvas.height=100;
  canvas.className='sound-preview';canvas.setAttribute('aria-hidden','true');
  const geometry=buildGeometry(doc.params,resolveMappings(doc.params,doc.routes));
  const renderer=Object.assign(Object.create(SculptureRenderer.prototype),{
    ctx:canvas.getContext('2d'),size:{width:252,height:100},geometry,
    yaw:0,pitch:0,axialRotation:0,zoom:1,pan:{x:0,y:0},events:[],
    createNoiseCanvas:()=>document.createElement('canvas'),
    createHaloCanvas:()=>document.createElement('canvas'),
  });
  renderer.fitTimeline();
  for(const copy of [...geometry.echoLayout.copies].reverse())renderer.drawObject(geometry,copy,0);
  if(geometry.particles.length)renderer.drawNoise(geometry);
  return canvas;
}
