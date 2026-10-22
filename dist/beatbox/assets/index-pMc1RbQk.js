(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=1021,S=1022,C=1023,w=1024,ee=1025,T=1026,te=1027,ne=1028,E=1029,re=1030,D=1031,ie=1033,ae=33776,oe=33777,se=33778,ce=33779,le=35840,ue=35841,de=35842,fe=35843,pe=36196,me=37492,he=37496,ge=37808,_e=37809,ve=37810,ye=37811,be=37812,xe=37813,Se=37814,Ce=37815,O=37816,we=37817,Te=37818,Ee=37819,k=37820,De=37821,A=36492,j=36494,Oe=36495,ke=36283,Ae=36284,je=36285,Me=36286,Ne=2300,Pe=2301,Fe=2302,Ie=2400,Le=2401,Re=2402,ze=3200,Be=3201,Ve=`srgb`,He=`srgb-linear`,Ue=`linear`,We=`srgb`,Ge=7680,Ke=35044,qe=2e3,Je=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},Ye=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Xe=1234567,Ze=Math.PI/180,Qe=180/Math.PI;function $e(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ye[e&255]+Ye[e>>8&255]+Ye[e>>16&255]+Ye[e>>24&255]+`-`+Ye[t&255]+Ye[t>>8&255]+`-`+Ye[t>>16&15|64]+Ye[t>>24&255]+`-`+Ye[n&63|128]+Ye[n>>8&255]+`-`+Ye[n>>16&255]+Ye[n>>24&255]+Ye[r&255]+Ye[r>>8&255]+Ye[r>>16&255]+Ye[r>>24&255]).toLowerCase()}function et(e,t,n){return Math.max(t,Math.min(n,e))}function tt(e,t){return(e%t+t)%t}function nt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function rt(e,t,n){return e===t?0:(n-e)/(t-e)}function it(e,t,n){return(1-n)*e+n*t}function at(e,t,n,r){return it(e,t,1-Math.exp(-n*r))}function ot(e,t=1){return t-Math.abs(tt(e,t*2)-t)}function st(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ct(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function lt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ut(e,t){return e+Math.random()*(t-e)}function dt(e){return e*(.5-Math.random())}function ft(e){e!==void 0&&(Xe=e);let t=Xe+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pt(e){return e*Ze}function mt(e){return e*Qe}function ht(e){return!(e&e-1)&&e!==0}function gt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function _t(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function vt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function yt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function bt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var xt={DEG2RAD:Ze,RAD2DEG:Qe,generateUUID:$e,clamp:et,euclideanModulo:tt,mapLinear:nt,inverseLerp:rt,lerp:it,damp:at,pingpong:ot,smoothstep:st,smootherstep:ct,randInt:lt,randFloat:ut,randFloatSpread:dt,seededRandom:ft,degToRad:pt,radToDeg:mt,isPowerOfTwo:ht,ceilPowerOfTwo:gt,floorPowerOfTwo:_t,setQuaternionFromProperEuler:vt,normalize:bt,denormalize:yt},M=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},N=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(St.makeScale(e,t)),this}rotate(e){return this.premultiply(St.makeRotation(-e)),this}translate(e,t){return this.premultiply(St.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},St=new N;function Ct(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function wt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Tt(){let e=wt(`canvas`);return e.style.display=`block`,e}var Et={};function Dt(e){e in Et||(Et[e]=!0,console.warn(e))}function Ot(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}function kt(e){let t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function At(e){let t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var jt={enabled:!0,workingColorSpace:He,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Mt(e.r),e.g=Mt(e.g),e.b=Mt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Nt(e.r),e.g=Nt(e.g),e.b=Nt(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ue:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Mt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Nt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Pt=[.64,.33,.3,.6,.15,.06],Ft=[.2126,.7152,.0722],It=[.3127,.329],Lt=new N().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rt=new N().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[He]:{primaries:Pt,whitePoint:It,transfer:Ue,toXYZ:Lt,fromXYZ:Rt,luminanceCoefficients:Ft,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:Pt,whitePoint:It,transfer:We,toXYZ:Lt,fromXYZ:Rt,luminanceCoefficients:Ft,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}});var zt,Bt=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{zt===void 0&&(zt=wt(`canvas`)),zt.width=e.width,zt.height=e.height;let n=zt.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=zt}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=wt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Mt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Mt(t[e]/255)*255):t[e]=Mt(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Vt=0,Ht=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=$e(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ut(r[t].image)):e.push(Ut(r[t]))}else e=Ut(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ut(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Bt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var Wt=0,Gt=class r extends Je{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=C,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wt++}),this.uuid=$e(),this.name=``,this.source=new Ht(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new M(0,0),this.repeat=new M(1,1),this.center=new M(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new N,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null,Gt.DEFAULT_MAPPING=300,Gt.DEFAULT_ANISOTROPY=1;var Kt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qt=class extends Je{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Kt(0,0,e,t),this.scissorTest=!1,this.viewport=new Kt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let i=new Gt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let e=0;e<a;e++)this.textures[e]=i.clone(),this.textures[e].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++)this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ht(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Jt=class extends qt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Yt=class extends Gt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Xt=class extends Gt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0)e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;else if(o===1)e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;else{if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($t.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($t.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qt.copy(this).projectOnVector(e),this.sub(Qt)}reflect(e){return this.sub(Qt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qt=new P,$t=new Zt,en=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,nn):nn.fromBufferAttribute(r,t),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),rn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),rn.copy(e.boundingBox)),rn.applyMatrix4(e.matrixWorld),this.union(rn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dn),fn.subVectors(this.max,dn),an.subVectors(e.a,dn),on.subVectors(e.b,dn),sn.subVectors(e.c,dn),cn.subVectors(on,an),ln.subVectors(sn,on),un.subVectors(an,sn);let t=[0,-cn.z,cn.y,0,-ln.z,ln.y,0,-un.z,un.y,cn.z,0,-cn.x,ln.z,0,-ln.x,un.z,0,-un.x,-cn.y,cn.x,0,-ln.y,ln.x,0,-un.y,un.x,0];return!hn(t,an,on,sn,fn)||(t=[1,0,0,0,1,0,0,0,1],!hn(t,an,on,sn,fn))?!1:(pn.crossVectors(cn,ln),t=[pn.x,pn.y,pn.z],hn(t,an,on,sn,fn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},tn=[new P,new P,new P,new P,new P,new P,new P,new P],nn=new P,rn=new en,an=new P,on=new P,sn=new P,cn=new P,ln=new P,un=new P,dn=new P,fn=new P,pn=new P,mn=new P;function hn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){mn.fromArray(e,a);let o=i.x*Math.abs(mn.x)+i.y*Math.abs(mn.y)+i.z*Math.abs(mn.z),s=t.dot(mn),c=n.dot(mn),l=r.dot(mn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var gn=new en,_n=new P,vn=new P,yn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?gn.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_n.subVectors(e,this.center);let t=_n.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(_n,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_n.copy(e.center).add(vn)),this.expandByPoint(_n.copy(e.center).sub(vn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},bn=new P,xn=new P,Sn=new P,Cn=new P,wn=new P,Tn=new P,En=new P,Dn=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){xn.copy(e).add(t).multiplyScalar(.5),Sn.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(xn);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Sn),o=Cn.dot(this.direction),s=-Cn.dot(Sn),c=Cn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(xn).addScaledVector(Sn,d),f}intersectSphere(e,t){bn.subVectors(e.center,this.origin);let n=bn.dot(this.direction),r=bn.dot(bn)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,n,r,i){wn.subVectors(t,e),Tn.subVectors(n,e),En.crossVectors(wn,Tn);let a=this.direction.dot(En),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Cn.subVectors(this.origin,e);let s=o*this.direction.dot(Tn.crossVectors(Cn,Tn));if(s<0)return null;let c=o*this.direction.dot(wn.cross(Cn));if(c<0||s+c>a)return null;let l=-o*Cn.dot(En);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},On=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/kn.setFromMatrixColumn(e,0).length(),i=1/kn.setFromMatrixColumn(e,1).length(),a=1/kn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jn,e,Mn)}lookAt(e,t,n){let r=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Nn.crossVectors(n,Fn),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Nn.crossVectors(n,Fn)),Nn.normalize(),Pn.crossVectors(Fn,Nn),r[0]=Nn.x,r[4]=Pn.x,r[8]=Fn.x,r[1]=Nn.y,r[5]=Pn.y,r[9]=Fn.y,r[2]=Nn.z,r[6]=Pn.z,r[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],ee=r[1],T=r[5],te=r[9],ne=r[13],E=r[2],re=r[6],D=r[10],ie=r[14],ae=r[3],oe=r[7],se=r[11],ce=r[15];return i[0]=a*x+o*ee+s*E+c*ae,i[4]=a*S+o*T+s*re+c*oe,i[8]=a*C+o*te+s*D+c*se,i[12]=a*w+o*ne+s*ie+c*ce,i[1]=l*x+u*ee+d*E+f*ae,i[5]=l*S+u*T+d*re+f*oe,i[9]=l*C+u*te+d*D+f*se,i[13]=l*w+u*ne+d*ie+f*ce,i[2]=p*x+m*ee+h*E+g*ae,i[6]=p*S+m*T+h*re+g*oe,i[10]=p*C+m*te+h*D+g*se,i[14]=p*w+m*ne+h*ie+g*ce,i[3]=_*x+v*ee+y*E+b*ae,i[7]=_*S+v*T+y*re+b*oe,i[11]=_*C+v*te+y*D+b*se,i[15]=_*w+v*ne+y*ie+b*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=kn.set(r[0],r[1],r[2]).length(),a=kn.set(r[4],r[5],r[6]).length(),o=kn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);let s=1/i,c=1/a,l=1/o;return An.elements[0]*=s,An.elements[1]*=s,An.elements[2]*=s,An.elements[4]*=c,An.elements[5]*=c,An.elements[6]*=c,An.elements[8]*=l,An.elements[9]*=l,An.elements[10]*=l,t.setFromRotationMatrix(An),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=qe){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=qe){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},kn=new P,An=new On,jn=new P(0,0,0),Mn=new P(1,1,1),Nn=new P,Pn=new P,Fn=new P,In=new On,Ln=new Zt,Rn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-et(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(et(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return In.makeRotationFromQuaternion(e),this.setFromRotationMatrix(In,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ln.setFromEuler(this),this.setFromQuaternion(Ln,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Rn.DEFAULT_ORDER=`XYZ`;var zn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Bn=0,Vn=new P,Hn=new Zt,Un=new On,Wn=new P,Gn=new P,Kn=new P,qn=new Zt,Jn=new P(1,0,0),Yn=new P(0,1,0),Xn=new P(0,0,1),Zn={type:`added`},Qn={type:`removed`},$n={type:`childadded`,child:null},er={type:`childremoved`,child:null},tr=class e extends Je{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bn++}),this.uuid=$e(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new P,n=new Rn,r=new Zt,i=new P(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new On},normalMatrix:{value:new N}}),this.matrix=new On,this.matrixWorld=new On,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hn.setFromAxisAngle(e,t),this.quaternion.multiply(Hn),this}rotateOnWorldAxis(e,t){return Hn.setFromAxisAngle(e,t),this.quaternion.premultiply(Hn),this}rotateX(e){return this.rotateOnAxis(Jn,e)}rotateY(e){return this.rotateOnAxis(Yn,e)}rotateZ(e){return this.rotateOnAxis(Xn,e)}translateOnAxis(e,t){return Vn.copy(e).applyQuaternion(this.quaternion),this.position.add(Vn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jn,e)}translateY(e){return this.translateOnAxis(Yn,e)}translateZ(e){return this.translateOnAxis(Xn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wn.copy(e):Wn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Gn,Wn,this.up):Un.lookAt(Wn,Gn,this.up),this.quaternion.setFromRotationMatrix(Un),r&&(Un.extractRotation(r.matrixWorld),Hn.setFromRotationMatrix(Un),this.quaternion.premultiply(Hn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zn),$n.child=e,this.dispatchEvent($n),$n.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qn),er.child=e,this.dispatchEvent(er),er.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zn),$n.child=e,this.dispatchEvent($n),$n.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,e,Kn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,qn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};tr.DEFAULT_UP=new P(0,1,0),tr.DEFAULT_MATRIX_AUTO_UPDATE=!0,tr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var nr=new P,rr=new P,ir=new P,ar=new P,or=new P,sr=new P,cr=new P,lr=new P,ur=new P,dr=new P,fr=new Kt,pr=new Kt,mr=new Kt,hr=class e{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),nr.subVectors(e,t),r.cross(nr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){nr.subVectors(r,t),rr.subVectors(n,t),ir.subVectors(e,t);let a=nr.dot(nr),o=nr.dot(rr),s=nr.dot(ir),c=rr.dot(rr),l=rr.dot(ir),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ar)!==null&&ar.x>=0&&ar.y>=0&&ar.x+ar.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ar)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ar.x),s.addScaledVector(a,ar.y),s.addScaledVector(o,ar.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(e,t),pr.fromBufferAttribute(e,n),mr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(fr,i.x),a.addScaledVector(pr,i.y),a.addScaledVector(mr,i.z),a}static isFrontFacing(e,t,n,r){return nr.subVectors(n,t),rr.subVectors(e,t),nr.cross(rr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nr.subVectors(this.c,this.b),rr.subVectors(this.a,this.b),nr.cross(rr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;or.subVectors(r,n),sr.subVectors(i,n),lr.subVectors(e,n);let s=or.dot(lr),c=sr.dot(lr);if(s<=0&&c<=0)return t.copy(n);ur.subVectors(e,r);let l=or.dot(ur),u=sr.dot(ur);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(or,a);dr.subVectors(e,i);let f=or.dot(dr),p=sr.dot(dr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(sr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return cr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(cr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(or,a).addScaledVector(sr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},gr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_r={h:0,s:0,l:0},vr={h:0,s:0,l:0};function yr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var F=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ve){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=jt.workingColorSpace){if(e=tt(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=yr(i,r,e+1/3),this.g=yr(i,r,e),this.b=yr(i,r,e-1/3)}return jt.toWorkingColorSpace(this,r),this}setStyle(e,t=Ve){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ve){let n=gr[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mt(e.r),this.g=Mt(e.g),this.b=Mt(e.b),this}copyLinearToSRGB(e){return this.r=Nt(e.r),this.g=Nt(e.g),this.b=Nt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ve){return jt.fromWorkingColorSpace(br.copy(this),e),Math.round(et(br.r*255,0,255))*65536+Math.round(et(br.g*255,0,255))*256+Math.round(et(br.b*255,0,255))}getHexString(e=Ve){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.fromWorkingColorSpace(br.copy(this),t);let n=br.r,r=br.g,i=br.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=jt.workingColorSpace){return jt.fromWorkingColorSpace(br.copy(this),t),e.r=br.r,e.g=br.g,e.b=br.b,e}getStyle(e=Ve){jt.fromWorkingColorSpace(br.copy(this),e);let t=br.r,n=br.g,r=br.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(_r),this.setHSL(_r.h+e,_r.s+t,_r.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_r),e.getHSL(vr);let n=it(_r.h,vr.h,t),r=it(_r.s,vr.s,t),i=it(_r.l,vr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},br=new F;F.NAMES=gr;var xr=0,Sr=class extends Je{static get type(){return`Material`}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xr++}),this.uuid=$e(),this.name=``,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new F(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ge,this.stencilZFail=Ge,this.stencilZPass=Ge,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn(`Material: onBuild() has been removed.`)}},Cr=class extends Sr{static get type(){return`MeshBasicMaterial`}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new F(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},wr=new P,Tr=new M,Er=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ke,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix3(e),this.setXYZ(t,wr.x,wr.y,wr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix4(e),this.setXYZ(t,wr.x,wr.y,wr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyNormalMatrix(e),this.setXYZ(t,wr.x,wr.y,wr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.transformDirection(e),this.setXYZ(t,wr.x,wr.y,wr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yt(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yt(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yt(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},Dr=class extends Er{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Or=class extends Er{constructor(e,t,n){super(new Uint32Array(e),t,n)}},kr=class extends Er{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ar=0,jr=new On,Mr=new tr,Nr=new P,Pr=new en,Fr=new en,Ir=new P,Lr=class e extends Je{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ar++}),this.uuid=$e(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ct(e)?Or:Dr)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new N().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jr.makeRotationFromQuaternion(e),this.applyMatrix4(jr),this}rotateX(e){return jr.makeRotationX(e),this.applyMatrix4(jr),this}rotateY(e){return jr.makeRotationY(e),this.applyMatrix4(jr),this}rotateZ(e){return jr.makeRotationZ(e),this.applyMatrix4(jr),this}translate(e,t,n){return jr.makeTranslation(e,t,n),this.applyMatrix4(jr),this}scale(e,t,n){return jr.makeScale(e,t,n),this.applyMatrix4(jr),this}lookAt(e){return Mr.lookAt(e),Mr.updateMatrix(),this.applyMatrix4(Mr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new kr(t,3))}else{for(let n=0,r=t.count;n<r;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pr.setFromBufferAttribute(n),this.morphTargetsRelative?(Ir.addVectors(this.boundingBox.min,Pr.min),this.boundingBox.expandByPoint(Ir),Ir.addVectors(this.boundingBox.max,Pr.max),this.boundingBox.expandByPoint(Ir)):(this.boundingBox.expandByPoint(Pr.min),this.boundingBox.expandByPoint(Pr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new P,1/0);else if(e){let n=this.boundingSphere.center;if(Pr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fr.setFromBufferAttribute(n),this.morphTargetsRelative?(Ir.addVectors(Pr.min,Fr.min),Pr.expandByPoint(Ir),Ir.addVectors(Pr.max,Fr.max),Pr.expandByPoint(Ir)):(Pr.expandByPoint(Fr.min),Pr.expandByPoint(Fr.max))}Pr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ir.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ir));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ir.fromBufferAttribute(a,t),o&&(Nr.fromBufferAttribute(e,t),Ir.add(Nr)),r=Math.max(r,n.distanceToSquared(Ir))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Er(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new P,s[e]=new P;let c=new P,l=new P,u=new P,d=new M,f=new M,p=new M,m=new P,h=new P;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new P,y=new P,b=new P,x=new P;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Er(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new P,i=new P,a=new P,o=new P,s=new P,c=new P,l=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ir.fromBufferAttribute(e,t),Ir.normalize(),e.setXYZ(t,Ir.x,Ir.y,Ir.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Er(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Rr=new On,zr=new Dn,Br=new yn,Vr=new P,Hr=new P,Ur=new P,Wr=new P,Gr=new P,Kr=new P,qr=new P,Jr=new P,I=class extends tr{constructor(e=new Lr,t=new Cr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Kr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Gr.fromBufferAttribute(s,e),a?Kr.addScaledVector(Gr,r):Kr.addScaledVector(Gr.sub(t),r))}t.add(Kr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),zr.copy(e.ray).recast(e.near),!(Br.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Br,Vr)===null||zr.origin.distanceToSquared(Vr)>(e.far-e.near)**2))&&(Rr.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Rr),(n.boundingBox===null||zr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,zr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Xr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Xr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Xr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Xr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Yr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Jr.copy(s),Jr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Jr);return l<n.near||l>n.far?null:{distance:l,point:Jr.clone(),object:e}}function Xr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Hr),e.getVertexPosition(c,Ur),e.getVertexPosition(l,Wr);let u=Yr(e,t,n,r,Hr,Ur,Wr,qr);if(u){let e=new P;hr.getBarycoord(qr,Hr,Ur,Wr,e),i&&(u.uv=hr.getInterpolatedAttribute(i,s,c,l,e,new M)),a&&(u.uv1=hr.getInterpolatedAttribute(a,s,c,l,e,new M)),o&&(u.normal=hr.getInterpolatedAttribute(o,s,c,l,e,new P),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new P,materialIndex:0};hr.getNormal(Hr,Ur,Wr,t.normal),u.face=t,u.barycoord=e}return u}var Zr=class e extends Lr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new kr(c,3)),this.setAttribute(`normal`,new kr(l,3)),this.setAttribute(`uv`,new kr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,ee=0,T=0,te=new P;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)te[e]=(s*v-b)*r,te[t]=o*i,te[n]=S,c.push(te.x,te.y,te.z),te[e]=0,te[t]=0,te[n]=m>0?1:-1,l.push(te.x,te.y,te.z),u.push(s/h),u.push(1-a/g),ee+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),T+=6}o.addGroup(f,T,_),f+=T,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Qr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function $r(e){let t={};for(let n=0;n<e.length;n++){let r=Qr(e[n]);for(let e in r)t[e]=r[e]}return t}function ei(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ti(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var ni={clone:Qr,merge:$r},ri=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ii=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ai=class extends Sr{static get type(){return`ShaderMaterial`}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ri,this.fragmentShader=ii,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qr(e.uniforms),this.uniformsGroups=ei(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},oi=class extends tr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new On,this.projectionMatrix=new On,this.projectionMatrixInverse=new On,this.coordinateSystem=qe}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},si=new P,ci=new M,li=new M,ui=class extends oi{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qe*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ze*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qe*2*Math.atan(Math.tan(Ze*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,ci,li),t.subVectors(li,ci)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ze*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},di=-90,fi=1,pi=class extends tr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ui(di,fi,e,t);r.layers=this.layers,this.add(r);let i=new ui(di,fi,e,t);i.layers=this.layers,this.add(i);let a=new ui(di,fi,e,t);a.layers=this.layers,this.add(a);let o=new ui(di,fi,e,t);o.layers=this.layers,this.add(o);let s=new ui(di,fi,e,t);s.layers=this.layers,this.add(s);let c=new ui(di,fi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},mi=class extends Gt{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hi=class extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new mi(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?o:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zr(5,5,5),i=new ai({name:`CubemapFromEquirect`,uniforms:Qr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new I(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new pi(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},gi=new P,_i=new P,vi=new N,yi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=gi.subVectors(n,t).cross(_i.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(gi),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||vi.getNormalMatrix(e),r=this.coplanarPoint(gi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new yn,xi=new P,Si=class{constructor(e=new yi,t=new yi,n=new yi,r=new yi,i=new yi,a=new yi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qe){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){return bi.center.set(0,0,0),bi.radius=.7071067811865476,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(xi.x=r.normal.x>0?e.max.x:e.min.x,xi.y=r.normal.y>0?e.max.y:e.min.y,xi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(xi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ci(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function wi(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Ti=class e extends Lr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new kr(p,3)),this.setAttribute(`normal`,new kr(m,3)),this.setAttribute(`uv`,new kr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},L={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},R={common:{diffuse:{value:new F(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new N}},envmap:{envMap:{value:null},envMapRotation:{value:new N},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new N}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new N}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new N},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new N},normalScale:{value:new M(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new N},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new N}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new N}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new N}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new F(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new F(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0},uvTransform:{value:new N}},sprite:{diffuse:{value:new F(16777215)},opacity:{value:1},center:{value:new M(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}}},Ei={basic:{uniforms:$r([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.fog]),vertexShader:L.meshbasic_vert,fragmentShader:L.meshbasic_frag},lambert:{uniforms:$r([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new F(0)}}]),vertexShader:L.meshlambert_vert,fragmentShader:L.meshlambert_frag},phong:{uniforms:$r([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new F(0)},specular:{value:new F(1118481)},shininess:{value:30}}]),vertexShader:L.meshphong_vert,fragmentShader:L.meshphong_frag},standard:{uniforms:$r([R.common,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.roughnessmap,R.metalnessmap,R.fog,R.lights,{emissive:{value:new F(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:L.meshphysical_vert,fragmentShader:L.meshphysical_frag},toon:{uniforms:$r([R.common,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.gradientmap,R.fog,R.lights,{emissive:{value:new F(0)}}]),vertexShader:L.meshtoon_vert,fragmentShader:L.meshtoon_frag},matcap:{uniforms:$r([R.common,R.bumpmap,R.normalmap,R.displacementmap,R.fog,{matcap:{value:null}}]),vertexShader:L.meshmatcap_vert,fragmentShader:L.meshmatcap_frag},points:{uniforms:$r([R.points,R.fog]),vertexShader:L.points_vert,fragmentShader:L.points_frag},dashed:{uniforms:$r([R.common,R.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:L.linedashed_vert,fragmentShader:L.linedashed_frag},depth:{uniforms:$r([R.common,R.displacementmap]),vertexShader:L.depth_vert,fragmentShader:L.depth_frag},normal:{uniforms:$r([R.common,R.bumpmap,R.normalmap,R.displacementmap,{opacity:{value:1}}]),vertexShader:L.meshnormal_vert,fragmentShader:L.meshnormal_frag},sprite:{uniforms:$r([R.sprite,R.fog]),vertexShader:L.sprite_vert,fragmentShader:L.sprite_frag},background:{uniforms:{uvTransform:{value:new N},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:L.background_vert,fragmentShader:L.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new N}},vertexShader:L.backgroundCube_vert,fragmentShader:L.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:L.cube_vert,fragmentShader:L.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:L.equirect_vert,fragmentShader:L.equirect_frag},distanceRGBA:{uniforms:$r([R.common,R.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:L.distanceRGBA_vert,fragmentShader:L.distanceRGBA_frag},shadow:{uniforms:$r([R.lights,R.fog,{color:{value:new F(0)},opacity:{value:1}}]),vertexShader:L.shadow_vert,fragmentShader:L.shadow_frag}};Ei.physical={uniforms:$r([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new N},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new N},clearcoatNormalScale:{value:new M(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new N},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new N},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new N},sheen:{value:0},sheenColor:{value:new F(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new N},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new N},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new N},transmissionSamplerSize:{value:new M},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new N},attenuationDistance:{value:0},attenuationColor:{value:new F(0)},specularColor:{value:new F(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new N},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new N},anisotropyVector:{value:new M},anisotropyMap:{value:null},anisotropyMapTransform:{value:new N}}]),vertexShader:L.meshphysical_vert,fragmentShader:L.meshphysical_frag};var Di={r:0,b:0,g:0},Oi=new Rn,ki=new On;function Ai(e,t,n,r,i,a,o){let s=new F(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new I(new Zr(1,1,1),new ai({name:`BackgroundCubeMaterial`,uniforms:Qr(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Oi.copy(n.backgroundRotation),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ki.makeRotationFromEuler(Oi)),u.material.toneMapped=jt.getTransfer(r.colorSpace)!==We,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new I(new Ti(2,2),new ai({name:`BackgroundMaterial`,uniforms:Qr(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=jt.getTransfer(r.colorSpace)!==We,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(Di,ti(e)),r.buffers.color.setClear(Di.r,Di.g,Di.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g}}function ji(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){ee(),o=!0,a!==i&&(a=i,l(a.object))}function ee(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:ee,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Mi(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Ni(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function Pi(e){let t=this,n=null,r=0,i=!1,a=!1,o=new yi,s=new N,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function Fi(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new hi(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var Ii=class extends oi{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Li=4,Ri=[.125,.215,.35,.446,.526,.582],zi=20,Bi=new Ii,Vi=new F,Hi=null,Ui=0,Wi=0,Gi=!1,Ki=(1+Math.sqrt(5))/2,qi=1/Ki,Ji=[new P(-Ki,qi,0),new P(Ki,qi,0),new P(-qi,0,Ki),new P(qi,0,Ki),new P(0,Ki,-qi),new P(0,Ki,qi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Yi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Hi=this._renderer.getRenderTarget(),Ui=this._renderer.getActiveCubeFace(),Wi=this._renderer.getActiveMipmapLevel(),Gi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ta(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ea(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hi,Ui,Wi),this._renderer.xr.enabled=Gi,e.scissorTest=!1,Qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hi=this._renderer.getRenderTarget(),Ui=this._renderer.getActiveCubeFace(),Wi=this._renderer.getActiveMipmapLevel(),Gi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:C,colorSpace:He,depthBuffer:!1},r=Zi(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zi(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xi(r)),this._blurMaterial=$i(r,e,t)}return r}_compileMaterial(e){let t=new I(this._lodPlanes[0],e);this._renderer.compile(t,Bi)}_sceneToCubeUV(e,t,n,r){let i=new ui(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor(Vi),s.toneMapping=0,s.autoClear=!1;let u=new Cr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new I(new Zr,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy(Vi),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;Qi(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ta()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ea());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new I(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Qi(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Bi)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=Ji[(r-t-1)%Ji.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new I(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):zi;m>zi&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);let h=[],g=0;for(let e=0;e<zi;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Qi(t,3*v*(r>_-Li?r-_+Li:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Bi)}};function Xi(e){let t=[],n=[],r=[],i=e,a=e-Li+1+Ri.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-Li?s=Ri[o-e+Li-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Lr;h.setAttribute(`position`,new Er(f,3)),h.setAttribute(`uv`,new Er(p,2)),h.setAttribute(`faceIndex`,new Er(m,1)),t.push(h),i>Li&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Zi(e,t,n){let r=new Jt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Qi(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function $i(e,t,n){let r=new Float32Array(zi),i=new P(0,1,0);return new ai({name:`SphericalGaussianBlur`,defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ea(){return new ai({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ta(){return new ai({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function na(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ra(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new Yi(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new Yi(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function ia(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Dt(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function aa(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(Ct(n)?Or:Dr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function oa(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function sa(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ca(e,t,n){let r=new WeakMap,i=new Kt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Yt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new M(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function la(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var ua=class extends Gt{constructor(e,t,n,i,a,o,s,c,l,u=T){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&u===1026&&(n=m),n===void 0&&u===1027&&(n=y),super(null,i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s===void 0?r:s,this.minFilter=c===void 0?r:c,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},da=new Gt,fa=new ua(1,1),pa=new Yt,ma=new Xt,ha=new mi,ga=[],_a=[],va=new Float32Array(16),ya=new Float32Array(9),ba=new Float32Array(4);function xa(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ga[i];if(a===void 0&&(a=new Float32Array(i),ga[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Sa(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ca(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function wa(e,t){let n=_a[t];n===void 0&&(n=new Int32Array(t),_a[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ta(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ea(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sa(n,t))return;e.uniform2fv(this.addr,t),Ca(n,t)}}function Da(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sa(n,t))return;e.uniform3fv(this.addr,t),Ca(n,t)}}function Oa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sa(n,t))return;e.uniform4fv(this.addr,t),Ca(n,t)}}function ka(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sa(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ca(n,t)}else{if(Sa(n,r))return;ba.set(r),e.uniformMatrix2fv(this.addr,!1,ba),Ca(n,r)}}function Aa(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sa(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ca(n,t)}else{if(Sa(n,r))return;ya.set(r),e.uniformMatrix3fv(this.addr,!1,ya),Ca(n,r)}}function ja(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sa(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ca(n,t)}else{if(Sa(n,r))return;va.set(r),e.uniformMatrix4fv(this.addr,!1,va),Ca(n,r)}}function Ma(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Na(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sa(n,t))return;e.uniform2iv(this.addr,t),Ca(n,t)}}function Pa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sa(n,t))return;e.uniform3iv(this.addr,t),Ca(n,t)}}function Fa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sa(n,t))return;e.uniform4iv(this.addr,t),Ca(n,t)}}function Ia(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function La(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sa(n,t))return;e.uniform2uiv(this.addr,t),Ca(n,t)}}function Ra(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sa(n,t))return;e.uniform3uiv(this.addr,t),Ca(n,t)}}function za(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sa(n,t))return;e.uniform4uiv(this.addr,t),Ca(n,t)}}function Ba(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(fa.compareFunction=515,a=fa):a=da,n.setTexture2D(t||a,i)}function Va(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ma,i)}function Ha(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ha,i)}function Ua(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||pa,i)}function Wa(e){switch(e){case 5126:return Ta;case 35664:return Ea;case 35665:return Da;case 35666:return Oa;case 35674:return ka;case 35675:return Aa;case 35676:return ja;case 5124:case 35670:return Ma;case 35667:case 35671:return Na;case 35668:case 35672:return Pa;case 35669:case 35673:return Fa;case 5125:return Ia;case 36294:return La;case 36295:return Ra;case 36296:return za;case 35678:case 36198:case 36298:case 36306:case 35682:return Ba;case 35679:case 36299:case 36307:return Va;case 35680:case 36300:case 36308:case 36293:return Ha;case 36289:case 36303:case 36311:case 36292:return Ua}}function Ga(e,t){e.uniform1fv(this.addr,t)}function Ka(e,t){let n=xa(t,this.size,2);e.uniform2fv(this.addr,n)}function qa(e,t){let n=xa(t,this.size,3);e.uniform3fv(this.addr,n)}function Ja(e,t){let n=xa(t,this.size,4);e.uniform4fv(this.addr,n)}function Ya(e,t){let n=xa(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Xa(e,t){let n=xa(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Za(e,t){let n=xa(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Qa(e,t){e.uniform1iv(this.addr,t)}function $a(e,t){e.uniform2iv(this.addr,t)}function eo(e,t){e.uniform3iv(this.addr,t)}function to(e,t){e.uniform4iv(this.addr,t)}function no(e,t){e.uniform1uiv(this.addr,t)}function ro(e,t){e.uniform2uiv(this.addr,t)}function io(e,t){e.uniform3uiv(this.addr,t)}function ao(e,t){e.uniform4uiv(this.addr,t)}function oo(e,t,n){let r=this.cache,i=t.length,a=wa(n,i);Sa(r,a)||(e.uniform1iv(this.addr,a),Ca(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||da,a[e])}function so(e,t,n){let r=this.cache,i=t.length,a=wa(n,i);Sa(r,a)||(e.uniform1iv(this.addr,a),Ca(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ma,a[e])}function co(e,t,n){let r=this.cache,i=t.length,a=wa(n,i);Sa(r,a)||(e.uniform1iv(this.addr,a),Ca(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ha,a[e])}function lo(e,t,n){let r=this.cache,i=t.length,a=wa(n,i);Sa(r,a)||(e.uniform1iv(this.addr,a),Ca(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||pa,a[e])}function uo(e){switch(e){case 5126:return Ga;case 35664:return Ka;case 35665:return qa;case 35666:return Ja;case 35674:return Ya;case 35675:return Xa;case 35676:return Za;case 5124:case 35670:return Qa;case 35667:case 35671:return $a;case 35668:case 35672:return eo;case 35669:case 35673:return to;case 5125:return no;case 36294:return ro;case 36295:return io;case 36296:return ao;case 35678:case 36198:case 36298:case 36306:case 35682:return oo;case 35679:case 36299:case 36307:return so;case 35680:case 36300:case 36308:case 36293:return co;case 36289:case 36303:case 36311:case 36292:return lo}}var fo=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wa(t.type)}},po=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uo(t.type)}},mo=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ho=/(\w+)(\])?(\[|\.)?/g;function go(e,t){e.seq.push(t),e.map[t.id]=t}function _o(e,t,n){let r=e.name,i=r.length;for(ho.lastIndex=0;;){let a=ho.exec(r),o=ho.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){go(n,l===void 0?new fo(s,e,t):new po(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new mo(s),go(n,e)),n=e}}}var vo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);_o(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function yo(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var bo=37297,xo=0;function So(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Co=new N;function wo(e){jt._getMatrix(Co,jt.workingColorSpace,e);let t=`mat3( ${Co.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(e)){case Ue:return[t,`LinearTransferOETF`];case We:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function To(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+So(e.getShaderSource(t),r)}return i}function Eo(e,t){let n=wo(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function Do(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Oo=new P;function ko(){return jt.getLuminanceCoefficients(Oo),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Oo.x.toFixed(4)}, ${Oo.y.toFixed(4)}, ${Oo.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ao(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(No).join(`
`)}function jo(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Mo(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function No(e){return e!==``}function Po(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fo(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Io=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lo(e){return e.replace(Io,zo)}var Ro=new Map;function zo(e,t){let n=L[t];if(n===void 0){let e=Ro.get(t);if(e!==void 0)n=L[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Lo(n)}var Bo=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vo(e){return e.replace(Bo,Ho)}function Ho(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Uo(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function Wo(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function Go(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function Ko(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function qo(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function Jo(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Yo(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Wo(n),l=Go(n),u=Ko(n),d=qo(n),f=Jo(n),p=Ao(n),m=jo(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(No).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(No).join(`
`),_.length>0&&(_+=`
`)):(g=[Uo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(No).join(`
`),_=[Uo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:L.tonemapping_pars_fragment,n.toneMapping===0?``:Do(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,L.colorspace_pars_fragment,Eo(`linearToOutputTexel`,n.outputColorSpace),ko(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(No).join(`
`)),o=Lo(o),o=Po(o,n),o=Fo(o,n),s=Lo(s),s=Po(s,n),s=Fo(s,n),o=Vo(o),s=Vo(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=yo(i,i.VERTEX_SHADER,y),S=yo(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h).trim(),r=i.getShaderInfoLog(x).trim(),a=i.getShaderInfoLog(S).trim(),o=!0,s=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=To(i,x,`vertex`),r=To(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+n+`
`+e+`
`+r)}}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:g},fragmentShader:{log:a,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new vo(i,h),ee=Mo(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let ee;this.getAttributes=function(){return ee===void 0&&C(this),ee};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(h,bo)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=xo++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Xo=0,Zo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Qo(e),t.set(e,n)),n}},Qo=class{constructor(e){this.id=Xo++,this.code=e,this.usedTimes=0}};function $o(e,t,n,r,i,a,o){let s=new zn,c=new Zo,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,ee=w===void 0?0:w.length,T=0;y.morphAttributes.position!==void 0&&(T=1),y.morphAttributes.normal!==void 0&&(T=2),y.morphAttributes.color!==void 0&&(T=3);let te,ne,E,re;if(C){let e=Ei[C];te=e.vertexShader,ne=e.fragmentShader}else te=a.vertexShader,ne=a.fragmentShader,c.update(a),E=c.getVertexShaderID(a),re=c.getFragmentShaderID(a);let D=e.getRenderTarget(),ie=e.state.buffers.depth.getReversed(),ae=_.isInstancedMesh===!0,oe=_.isBatchedMesh===!0,se=!!a.map,ce=!!a.matcap,le=!!x,ue=!!a.aoMap,de=!!a.lightMap,fe=!!a.bumpMap,pe=!!a.normalMap,me=!!a.displacementMap,he=!!a.emissiveMap,ge=!!a.metalnessMap,_e=!!a.roughnessMap,ve=a.anisotropy>0,ye=a.clearcoat>0,be=a.dispersion>0,xe=a.iridescence>0,Se=a.sheen>0,Ce=a.transmission>0,O=ve&&!!a.anisotropyMap,we=ye&&!!a.clearcoatMap,Te=ye&&!!a.clearcoatNormalMap,Ee=ye&&!!a.clearcoatRoughnessMap,k=xe&&!!a.iridescenceMap,De=xe&&!!a.iridescenceThicknessMap,A=Se&&!!a.sheenColorMap,j=Se&&!!a.sheenRoughnessMap,Oe=!!a.specularMap,ke=!!a.specularColorMap,Ae=!!a.specularIntensityMap,je=Ce&&!!a.transmissionMap,Me=Ce&&!!a.thicknessMap,Ne=!!a.gradientMap,Pe=!!a.alphaMap,Fe=a.alphaTest>0,Ie=!!a.alphaHash,Le=!!a.extensions,Re=0;a.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Re=e.toneMapping);let ze={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:te,fragmentShader:ne,defines:a.defines,customVertexShaderID:E,customFragmentShaderID:re,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:oe,batchingColor:oe&&_._colorsTexture!==null,instancing:ae,instancingColor:ae&&_.instanceColor!==null,instancingMorph:ae&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:D===null?e.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:He,alphaToCoverage:!!a.alphaToCoverage,map:se,matcap:ce,envMap:le,envMapMode:le&&x.mapping,envMapCubeUVHeight:S,aoMap:ue,lightMap:de,bumpMap:fe,normalMap:pe,displacementMap:f&&me,emissiveMap:he,normalMapObjectSpace:pe&&a.normalMapType===1,normalMapTangentSpace:pe&&a.normalMapType===0,metalnessMap:ge,roughnessMap:_e,anisotropy:ve,anisotropyMap:O,clearcoat:ye,clearcoatMap:we,clearcoatNormalMap:Te,clearcoatRoughnessMap:Ee,dispersion:be,iridescence:xe,iridescenceMap:k,iridescenceThicknessMap:De,sheen:Se,sheenColorMap:A,sheenRoughnessMap:j,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:Ce,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Fe,alphaHash:Ie,combine:a.combine,mapUv:se&&h(a.map.channel),aoMapUv:ue&&h(a.aoMap.channel),lightMapUv:de&&h(a.lightMap.channel),bumpMapUv:fe&&h(a.bumpMap.channel),normalMapUv:pe&&h(a.normalMap.channel),displacementMapUv:me&&h(a.displacementMap.channel),emissiveMapUv:he&&h(a.emissiveMap.channel),metalnessMapUv:ge&&h(a.metalnessMap.channel),roughnessMapUv:_e&&h(a.roughnessMap.channel),anisotropyMapUv:O&&h(a.anisotropyMap.channel),clearcoatMapUv:we&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:Te&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:k&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:De&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:A&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:j&&h(a.sheenRoughnessMap.channel),specularMapUv:Oe&&h(a.specularMap.channel),specularColorMapUv:ke&&h(a.specularColorMap.channel),specularIntensityMapUv:Ae&&h(a.specularIntensityMap.channel),transmissionMapUv:je&&h(a.transmissionMap.channel),thicknessMapUv:Me&&h(a.thicknessMap.channel),alphaMapUv:Pe&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(pe||ve),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(se||Pe),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:ie,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:T,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:se&&a.map.isVideoTexture===!0&&jt.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:he&&a.emissiveMap.isVideoTexture===!0&&jt.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Le&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Le&&a.extensions.multiDraw===!0||oe)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return ze.vertexUv1s=l.has(1),ze.vertexUv2s=l.has(2),ze.vertexUv3s=l.has(3),l.clear(),ze}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reverseDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=Ei[t];n=ni.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Yo(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function es(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ts(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ns(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function rs(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||ts),r.length>1&&r.sort(t||ns),i.length>1&&i.sort(t||ns)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function is(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new rs,e.set(t,[i])):n>=r.length?(i=new rs,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function as(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new P,color:new F};break;case`SpotLight`:n={position:new P,direction:new P,color:new F,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new P,color:new F,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new P,skyColor:new F,groundColor:new F};break;case`RectAreaLight`:n={color:new F,position:new P,halfWidth:new P,halfHeight:new P}}return e[t.id]=n,n}}}function os(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new M};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new M};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new M,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ss=0;function cs(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ls(e){let t=new as,n=os(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new P);let i=new P,a=new On,o=new On;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(cs);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=R.LTC_FLOAT_1,r.rectAreaLTC2=R.LTC_FLOAT_2):(r.rectAreaLTC1=R.LTC_HALF_1,r.rectAreaLTC2=R.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=ss++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function us(e){let t=new ls(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function ds(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new us(e),t.set(n,[a])):r>=i.length?(a=new us(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var fs=class extends Sr{static get type(){return`MeshDepthMaterial`}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ze,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ps=class extends Sr{static get type(){return`MeshDistanceMaterial`}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},ms=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hs=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gs(e,t,n){let i=new Si,a=new M,o=new M,s=new Kt,c=new fs({depthPacking:Be}),l=new ps,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new M},radius:{value:4}},vertexShader:ms,fragmentShader:hs}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new Lr;h.setAttribute(`position`,new Er(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new I(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let g=f.getFrameExtents();if(a.multiply(g),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/g.x),a.x=o.x*g.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/g.y),a.y=o.y*g.y,f.mapSize.y=o.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:r,magFilter:r};f.map!==null&&f.map.dispose(),f.map=new Jt(a.x,a.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(o.x*t.x,o.y*t.y,o.x*t.z,o.y*t.w),p.viewport(s),f.updateMatrices(u,e),i=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let i=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Jt(a.x,a.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],r,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var _s={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function vs(e,t){function n(){let t=!1,n=new Kt,r=null,i=new Kt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let e=t.get(`EXT_clip_control`);r?e.clipControlEXT(e.LOWER_LEFT_EXT,e.ZERO_TO_ONE_EXT):e.clipControlEXT(e.LOWER_LEFT_EXT,e.NEGATIVE_ONE_TO_ONE_EXT);let n=o;o=null,this.setClear(n)}r=e},getReversed:function(){return r},setTest:function(t){t?he(e.DEPTH_TEST):ge(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=_s[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?he(e.STENCIL_TEST):ge(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new F(0,0,0),w=0,ee=!1,T=null,te=null,ne=null,E=null,re=null,D=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ie=!1,ae=0,oe=e.getParameter(e.VERSION);oe.indexOf(`WebGL`)===-1?oe.indexOf(`OpenGL ES`)!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),ie=ae>=2):(ae=parseFloat(/^WebGL (\d)/.exec(oe)[1]),ie=ae>=1);let se=null,ce={},le=e.getParameter(e.SCISSOR_BOX),ue=e.getParameter(e.VIEWPORT),de=new Kt().fromArray(le),fe=new Kt().fromArray(ue);function pe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let me={};me[e.TEXTURE_2D]=pe(e.TEXTURE_2D,e.TEXTURE_2D,1),me[e.TEXTURE_CUBE_MAP]=pe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[e.TEXTURE_2D_ARRAY]=pe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),me[e.TEXTURE_3D]=pe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),he(e.DEPTH_TEST),o.setFunc(3),O(!1),we(1),he(e.CULL_FACE),Se(0);function he(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ge(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function _e(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function ve(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ye(t){return m!==t&&(e.useProgram(t),m=t,!0)}let be={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};be[103]=e.MIN,be[104]=e.MAX;let xe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function Se(t,n,r,i,a,o,s,c,l,u){if(t===0)h===!0&&(ge(e.BLEND),h=!1);else if(h===!1&&(he(e.BLEND),h=!0),t!==5){if(t!==g||u!==ee){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,ee=u}}else a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(be[n],be[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(xe[r],xe[i],xe[o],xe[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,ee=!1}function Ce(t,n){t.side===2?ge(e.CULL_FACE):he(e.CULL_FACE);let r=t.side===1;n&&(r=!r),O(r),t.blending===1&&t.transparent===!1?Se(0):Se(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ee(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?he(e.SAMPLE_ALPHA_TO_COVERAGE):ge(e.SAMPLE_ALPHA_TO_COVERAGE)}function O(t){T!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),T=t)}function we(t){t===0?ge(e.CULL_FACE):(he(e.CULL_FACE),t!==te&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),te=t}function Te(t){t!==ne&&(ie&&e.lineWidth(t),ne=t)}function Ee(t,n,r){t?(he(e.POLYGON_OFFSET_FILL),(E!==n||re!==r)&&(e.polygonOffset(n,r),E=n,re=r)):ge(e.POLYGON_OFFSET_FILL)}function k(t){t?he(e.SCISSOR_TEST):ge(e.SCISSOR_TEST)}function De(t){t===void 0&&(t=e.TEXTURE0+D-1),se!==t&&(e.activeTexture(t),se=t)}function A(t,n,r){r===void 0&&(r=se===null?e.TEXTURE0+D-1:se);let i=ce[r];i===void 0&&(i={type:void 0,texture:void 0},ce[r]=i),(i.type!==t||i.texture!==n)&&(se!==r&&(e.activeTexture(r),se=r),e.bindTexture(t,n||me[t]),i.type=t,i.texture=n)}function j(){let t=ce[se];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Pe(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Fe(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ie(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Le(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Re(t){de.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),de.copy(t))}function ze(t){fe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),fe.copy(t))}function Be(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ve(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function He(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},se=null,ce={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new F(0,0,0),w=0,ee=!1,T=null,te=null,ne=null,E=null,re=null,de.set(0,0,e.canvas.width,e.canvas.height),fe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:he,disable:ge,bindFramebuffer:_e,drawBuffers:ve,useProgram:ye,setBlending:Se,setMaterial:Ce,setFlipSided:O,setCullFace:we,setLineWidth:Te,setPolygonOffset:Ee,setScissorTest:k,activeTexture:De,bindTexture:A,unbindTexture:j,compressedTexImage2D:Oe,compressedTexImage3D:ke,texImage2D:Ie,texImage3D:Le,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ne,scissor:Re,viewport:ze,reset:He}}function ys(e,t,n,r){let i=bs(r);switch(n){case x:return e*t;case w:return e*t;case ee:return e*t*2;case ne:return e*t/i.components*i.byteLength;case E:return e*t/i.components*i.byteLength;case re:return e*t*2/i.components*i.byteLength;case D:return e*t*2/i.components*i.byteLength;case S:return e*t*3/i.components*i.byteLength;case C:return e*t*4/i.components*i.byteLength;case ie:return e*t*4/i.components*i.byteLength;case ae:case oe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:case fe:return Math.max(e,16)*Math.max(t,8)/4;case le:case de:return Math.max(e,8)*Math.max(t,8)/2;case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case _e:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ve:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case O:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case k:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case A:case j:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ke:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*8;case je:case Me:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function bs(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}function xs(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new M,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):wt(`canvas`)}function w(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function ee(e){return e.generateMipmaps}function T(e){l.generateMipmap(e)}function ne(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function E(e,t,n,r,i=!1){if(e!==null){if(l[e]!==void 0)return l[e];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let a=t;if(t===l.RED&&(n===l.FLOAT&&(a=l.R32F),n===l.HALF_FLOAT&&(a=l.R16F),n===l.UNSIGNED_BYTE&&(a=l.R8)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.R8UI),n===l.UNSIGNED_SHORT&&(a=l.R16UI),n===l.UNSIGNED_INT&&(a=l.R32UI),n===l.BYTE&&(a=l.R8I),n===l.SHORT&&(a=l.R16I),n===l.INT&&(a=l.R32I)),t===l.RG&&(n===l.FLOAT&&(a=l.RG32F),n===l.HALF_FLOAT&&(a=l.RG16F),n===l.UNSIGNED_BYTE&&(a=l.RG8)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RG8UI),n===l.UNSIGNED_SHORT&&(a=l.RG16UI),n===l.UNSIGNED_INT&&(a=l.RG32UI),n===l.BYTE&&(a=l.RG8I),n===l.SHORT&&(a=l.RG16I),n===l.INT&&(a=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGB8UI),n===l.UNSIGNED_SHORT&&(a=l.RGB16UI),n===l.UNSIGNED_INT&&(a=l.RGB32UI),n===l.BYTE&&(a=l.RGB8I),n===l.SHORT&&(a=l.RGB16I),n===l.INT&&(a=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(a=l.RGBA16UI),n===l.UNSIGNED_INT&&(a=l.RGBA32UI),n===l.BYTE&&(a=l.RGBA8I),n===l.SHORT&&(a=l.RGBA16I),n===l.INT&&(a=l.RGBA32I)),t===l.RGB&&n===l.UNSIGNED_INT_5_9_9_9_REV&&(a=l.RGB9_E5),t===l.RGBA){let e=i?Ue:jt.getTransfer(r);n===l.FLOAT&&(a=l.RGBA32F),n===l.HALF_FLOAT&&(a=l.RGBA16F),n===l.UNSIGNED_BYTE&&(a=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT_4_4_4_4&&(a=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(a=l.RGB5_A1)}return(a===l.R16F||a===l.R32F||a===l.RG16F||a===l.RG32F||a===l.RGBA16F||a===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),a}function re(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function D(e,t){return ee(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ie(e){let t=e.target;t.removeEventListener(`dispose`,ie),oe(t),t.isVideoTexture&&y.delete(t)}function ae(e){let t=e.target;t.removeEventListener(`dispose`,ae),ce(t)}function oe(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=x.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&se(e),Object.keys(r).length===0&&x.delete(n)}f.remove(e)}function se(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=x.get(n);delete r[t.__cacheKey],h.memory.textures--}function ce(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let le=0;function ue(){le=0}function de(){let e=le;return e>=p.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),le+=1,e}function fe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function pe(e,t){let n=f.get(e);if(e.isVideoTexture&&Me(e),e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{Se(n,e,t);return}}d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function me(e,t){let n=f.get(e);e.version>0&&n.__version!==e.version?Se(n,e,t):d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function he(e,t){let n=f.get(e);e.version>0&&n.__version!==e.version?Se(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ge(e,t){let n=f.get(e);e.version>0&&n.__version!==e.version?Ce(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let _e={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},ve={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},ye={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function be(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,_e[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,_e[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,_e[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,ve[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,ve[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,ye[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function xe(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,ie));let r=t.source,i=x.get(r);i===void 0&&(i={},x.set(r,i));let a=fe(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&se(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function Se(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=xe(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(l.TEXTURE0+n);let e=jt.getPrimaries(jt.workingColorSpace),s=t.colorSpace===``?null:jt.getPrimaries(t.colorSpace),c=t.colorSpace===``||e===s?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let u=w(t.image,!1,p.maxTextureSize);u=Ne(t,u);let f=m.convert(t.format,t.colorSpace),h=m.convert(t.type),g=E(t.internalFormat,f,h,t.colorSpace,t.isVideoTexture);be(r,t);let _,v=t.mipmaps,y=t.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=D(t,u);if(t.isDepthTexture)g=re(t.format===te,t.type),b&&(y?d.texStorage2D(l.TEXTURE_2D,1,g,u.width,u.height):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,null));else if(t.isDataTexture){if(v.length>0){y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data);t.generateMipmaps=!1}else y?(b&&d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height),x&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,u.width,u.height,f,h,u.data)):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,u.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){y&&b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,u.depth);for(let e=0,n=v.length;e<n;e++)if(_=v[e],t.format!==1023){if(f!==null){if(y){if(x){if(t.layerUpdates.size>0){let n=ys(_.width,_.height,t.format,t.type);for(let r of t.layerUpdates){let t=_.data.subarray(r*n/_.data.BYTES_PER_ELEMENT,(r+1)*n/_.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,r,_.width,_.height,1,f,t)}t.clearLayerUpdates()}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,_.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,_.data,0,0)}else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else y?x&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,h,_.data):d.texImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,f,h,_.data)}else{y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,n=v.length;e<n;e++)_=v[e],t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data):f===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,_.data):d.compressedTexImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,_.data)}}else if(t.isDataArrayTexture){if(y){if(b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,u.width,u.height,u.depth),x){if(t.layerUpdates.size>0){let e=ys(u.width,u.height,t.format,t.type);for(let n of t.layerUpdates){let t=u.data.subarray(n*e/u.data.BYTES_PER_ELEMENT,(n+1)*e/u.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,n,u.width,u.height,1,f,h,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,g,u.width,u.height,u.depth,0,f,h,u.data)}else if(t.isData3DTexture)y?(b&&d.texStorage3D(l.TEXTURE_3D,S,g,u.width,u.height,u.depth),x&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)):d.texImage3D(l.TEXTURE_3D,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(t.isFramebufferTexture){if(b){if(y)d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height);else{let e=u.width,t=u.height;for(let n=0;n<S;n++)d.texImage2D(l.TEXTURE_2D,n,g,e,t,0,f,h,null),e>>=1,t>>=1}}}else if(v.length>0){if(y&&b){let e=Pe(v[0]);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f,h,_):d.texImage2D(l.TEXTURE_2D,e,g,f,h,_);t.generateMipmaps=!1}else if(y){if(b){let e=Pe(u);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}x&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,f,h,u)}else d.texImage2D(l.TEXTURE_2D,0,g,f,h,u);ee(t)&&T(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Ce(e,t,n){if(t.image.length!==6)return;let r=xe(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=jt.getPrimaries(jt.workingColorSpace),o=t.colorSpace===``?null:jt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=w(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Ne(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=E(t.internalFormat,g,_,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=D(t,h);be(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Pe(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}ee(t)&&T(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function O(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=E(n.internalFormat,o,s,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ae(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=re(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,s=Ae(t);je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,s,a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,s,a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=E(i.internalFormat,a,o,i.colorSpace),c=Ae(t);n&&je(t)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,t.width,t.height):je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,c,s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Te(e,t){if(t&&t.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let n=f.get(t.depthTexture);n.__renderTarget=t,(!n.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),pe(t.depthTexture,0);let r=n.__webglTexture,i=Ae(t);if(t.depthTexture.format===1026)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0);else if(t.depthTexture.format===1027)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0);else throw Error(`Unknown depthTexture format`)}function Ee(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)throw Error(`target.depthTexture not supported in Cube render targets`);Te(t.__webglFramebuffer,e)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),we(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),we(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}d.bindFramebuffer(l.FRAMEBUFFER,null)}function k(e,t,n){let r=f.get(e);t!==void 0&&O(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Ee(e)}function De(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,ae);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&je(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=E(r.internalFormat,a,o,r.colorSpace,e.isXRRenderTarget===!0),c=Ae(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),we(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),be(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)O(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else O(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);ee(t)&&T(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r);d.bindTexture(l.TEXTURE_2D,a.__webglTexture),be(l.TEXTURE_2D,r),O(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,l.TEXTURE_2D,0),ee(r)&&T(l.TEXTURE_2D)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),be(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)O(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else O(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);ee(t)&&T(i),d.unbindTexture()}e.depthBuffer&&Ee(e)}function A(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(ee(r)){let t=ne(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),T(t),d.unbindTexture()}}}let j=[],Oe=[];function ke(e){if(e.samples>0){if(je(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(j.length=0,Oe.length=0,j.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.resolveDepthBuffer===!1&&(j.push(a),Oe.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Oe)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,j))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.resolveDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ae(e){return Math.min(p.maxSamples,e.samples)}function je(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Me(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ne(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(jt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=de,this.resetTextureUnits=ue,this.setTexture2D=pe,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=k,this.setupRenderTarget=De,this.updateRenderTargetMipmap=A,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=O,this.useMultisampledRTT=je}function Ss(e,t){function n(n,r=``){let i,a=jt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36492)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Cs=class extends ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},ws=class extends tr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ts={type:`move`},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ws,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ws,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ws,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ts)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ws;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ds=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Os=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ks=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Gt,i=e.properties.get(r);i.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ai({vertexShader:Ds,fragmentShader:Os,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new I(new Ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},As=class extends Je{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=new ks,_=t.getContextAttributes(),v=null,b=null,x=[],S=[],w=new M,ee=null,ne=new ui;ne.viewport=new Kt;let E=new ui;E.viewport=new Kt;let re=[ne,E],D=new Cs,ie=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Es,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Es,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Es,x[e]=t),t.getHandSpace()};function oe(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function se(){r.removeEventListener(`select`,oe),r.removeEventListener(`selectstart`,oe),r.removeEventListener(`selectend`,oe),r.removeEventListener(`squeeze`,oe),r.removeEventListener(`squeezestart`,oe),r.removeEventListener(`squeezeend`,oe),r.removeEventListener(`end`,se),r.removeEventListener(`inputsourceschange`,ce);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}ie=null,ae=null,g.reset(),e.setRenderTarget(v),p=null,f=null,d=null,r=null,b=null,ge.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,oe),r.addEventListener(`selectstart`,oe),r.addEventListener(`selectend`,oe),r.addEventListener(`squeeze`,oe),r.addEventListener(`squeezestart`,oe),r.addEventListener(`squeezeend`,oe),r.addEventListener(`end`,se),r.addEventListener(`inputsourceschange`,ce),_.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Jt(p.framebufferWidth,p.framebufferHeight,{format:C,type:l,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?te:T,a=_.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Jt(f.textureWidth,f.textureHeight,{format:C,type:l,depthTexture:new ua(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ge.setContext(r),ge.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ce(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}let le=new P,ue=new P;function de(e,t,n){le.setFromMatrixPosition(t.matrixWorld),ue.setFromMatrixPosition(n.matrixWorld);let r=le.distanceTo(ue),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function fe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),D.near=E.near=ne.near=t,D.far=E.far=ne.far=n,(ie!==D.near||ae!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),ie=D.near,ae=D.far),ne.layers.mask=e.layers.mask|2,E.layers.mask=e.layers.mask|4,D.layers.mask=ne.layers.mask|E.layers.mask;let i=e.parent,a=D.cameras;fe(D,i);for(let e=0;e<a.length;e++)fe(a[e],i);a.length===2?de(D,ne,E):D.projectionMatrix.copy(ne.projectionMatrix),pe(e,D,i)};function pe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Qe*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)};let me=null;function he(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let n=!1;t.length!==D.cameras.length&&(D.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(p!==null)a=p.getViewport(i);else{let t=d.getViewSubImage(f,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(b,t.colorTexture,f.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(b))}let o=re[r];o===void 0&&(o=new ui,o.layers.enable(r),o.viewport=new Kt,re[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),n===!0&&D.cameras.push(o)}let i=r.enabledFeatures;if(i&&i.includes(`depth-sensing`)){let n=d.getDepthInformation(t[0]);n&&n.isValid&&n.texture&&g.init(e,n,r.renderState)}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}me&&me(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ge=new Ci;ge.setAnimationLoop(he),this.setAnimationLoop=function(e){me=e},this.dispose=function(){}}},js=new Rn,Ms=new On;function Ns(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ti(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,js.copy(o),js.x*=-1,js.y*=-1,js.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(js.y*=-1,js.z*=-1),e.envMapRotation.value.setFromMatrix4(Ms.makeRotationFromEuler(js)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ps(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Fs=class{constructor(e={}){let{canvas:t=Tt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=new Uint32Array(4),_=new Int32Array(4),v=null,y=null,b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=0,this.toneMappingExposure=1;let S=this,C=!1,w=0,ee=0,T=null,te=-1,ne=null,E=new Kt,re=new Kt,D=null,ie=new F(0),ae=0,oe=t.width,se=t.height,ce=1,le=null,ue=null,de=new Kt(0,0,oe,se),fe=new Kt(0,0,oe,se),pe=!1,me=new Si,he=!1,ge=!1,_e=new On,ve=new On,ye=new P,be=new Kt,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return T===null?ce:1}let O=n;function we(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r170`),t.addEventListener(`webglcontextlost`,Xe,!1),t.addEventListener(`webglcontextrestored`,Ze,!1),t.addEventListener(`webglcontextcreationerror`,Qe,!1),O===null){let t=`webgl2`;if(O=we(t,e),O===null)throw we(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let Te,Ee,k,De,A,j,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ue,We,Ge,Ke,qe;function Je(){Te=new ia(O),Te.init(),Ge=new Ss(O,Te),Ee=new Ni(O,Te,e,Ge),k=new vs(O,Te),Ee.reverseDepthBuffer&&p&&k.buffers.depth.setReversed(!0),De=new sa(O),A=new es,j=new xs(O,Te,k,A,Ee,Ge,De),Oe=new Fi(S),ke=new ra(S),Ae=new wi(O),Ke=new ji(O,Ae),je=new aa(O,Ae,De,Ke),Me=new la(O,je,Ae,De),Be=new ca(O,Ee,j),Le=new Pi(A),Ne=new $o(S,Oe,ke,Te,Ee,Ke,Le),Pe=new Ns(S,A),Fe=new is,Ie=new ds(Te),ze=new Ai(S,Oe,ke,k,Me,m,s),Re=new gs(S,Me,Ee),qe=new Ps(O,De,Ee,k),Ue=new Mi(O,Te,De),We=new oa(O,Te,De),De.programs=Ne.programs,S.capabilities=Ee,S.extensions=Te,S.properties=A,S.renderLists=Fe,S.shadowMap=Re,S.state=k,S.info=De}Je();let Ye=new As(S,O);this.xr=Ye,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){Ye.isPresenting?console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(E)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),k.viewport(E.copy(de).multiplyScalar(ce).round())},this.getScissor=function(e){return e.copy(fe)},this.setScissor=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),k.scissor(re.copy(fe).multiplyScalar(ce).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(e){k.setScissorTest(pe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(T!==null){let t=T.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=T.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=ze.getClearColor(),r=ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,O.clearBufferuiv(O.COLOR,0,h)):(_[0]=i,_[1]=a,_[2]=o,_[3]=r,O.clearBufferiv(O.COLOR,0,_))}else r|=O.COLOR_BUFFER_BIT}t&&(r|=O.DEPTH_BUFFER_BIT),n&&(r|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Xe,!1),t.removeEventListener(`webglcontextrestored`,Ze,!1),t.removeEventListener(`webglcontextcreationerror`,Qe,!1),Fe.dispose(),Ie.dispose(),A.dispose(),Oe.dispose(),ke.dispose(),Me.dispose(),Ke.dispose(),qe.dispose(),Ne.dispose(),Ye.dispose(),Ye.removeEventListener(`sessionstart`,at),Ye.removeEventListener(`sessionend`,ot),st.stop()};function Xe(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function Ze(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=De.autoReset,t=Re.enabled,n=Re.autoUpdate,r=Re.needsUpdate,i=Re.type;Je(),De.autoReset=e,Re.enabled=t,Re.autoUpdate=n,Re.needsUpdate=r,Re.type=i}function Qe(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function $e(e){let t=e.target;t.removeEventListener(`dispose`,$e),et(t)}function et(e){tt(e),A.remove(e)}function tt(e){let t=A.get(e).programs;t!==void 0&&(t.forEach(function(e){Ne.releaseProgram(e)}),e.isShaderMaterial&&Ne.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=gt(e,t,n,r,i);k.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=je.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ke.setup(i,r,s,n,c);let h,g=Ue;if(c!==null&&(h=Ae.get(c),g=We,g.setIndex(h)),i.isMesh)r.wireframe===!0?(k.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(O.LINES)):g.setMode(O.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),k.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(O.LINES):i.isLineLoop?g.setMode(O.LINE_LOOP):g.setMode(O.LINE_STRIP)}else i.isPoints?g.setMode(O.POINTS):i.isSprite&&g.setMode(O.TRIANGLES);if(i.isBatchedMesh){if(i._multiDrawInstances!==null)g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ae.get(c).bytesPerElement:1,o=A.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(O,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function nt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,pt(e,t,n),e.side=0,e.needsUpdate=!0,pt(e,t,n),e.side=2):pt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),y=Ie.get(n),y.init(t),x.push(y),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),y.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];nt(a,n,e),r.add(a)}else nt(t,n,e),r.add(t)}}),x.pop(),y=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){A.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let rt=null;function it(e){rt&&rt(e)}function at(){st.stop()}function ot(){st.start()}let st=new Ci;st.setAnimationLoop(it),typeof self<`u`&&st.setContext(self),this.setAnimationLoop=function(e){rt=e,Ye.setAnimationLoop(e),e===null?st.stop():st.start()},Ye.addEventListener(`sessionstart`,at),Ye.addEventListener(`sessionend`,ot),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(t),t=Ye.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,T),y=Ie.get(e,x.length),y.init(t),x.push(y),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),me.setFromProjectionMatrix(ve),ge=this.localClippingEnabled,he=Le.init(this.clippingPlanes,ge),v=Fe.get(e,b.length),v.init(),b.push(v),Ye.enabled===!0&&Ye.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&ct(e,t,-1/0,S.sortObjects)}ct(e,t,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(le,ue),Se=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,Se&&ze.addToRenderList(v,e),this.info.render.frame++,he===!0&&Le.beginShadows();let n=y.state.shadowsArray;Re.render(n,e,t),he===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=v.opaque,i=v.transmissive;if(y.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];ut(r,i,e,a)}Se&&ze.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];lt(v,e,r,r.viewport)}}else i.length>0&&ut(r,i,e,t),Se&&ze.render(e),lt(v,e,t);T!==null&&(j.updateMultisampleRenderTarget(T),j.updateRenderTargetMipmap(T)),e.isScene===!0&&e.onAfterRender(S,e,t),Ke.resetDefaultState(),te=-1,ne=null,x.pop(),x.length>0?(y=x[x.length-1],he===!0&&Le.setGlobalState(S.clippingPlanes,y.state.camera)):y=null,b.pop(),v=b.length>0?b[b.length-1]:null};function ct(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)y.pushLight(e),e.castShadow&&y.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||me.intersectsSprite(e)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let t=Me.update(e),i=e.material;i.visible&&v.push(e,t,i,n,be.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||me.intersectsObject(e))){let t=Me.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),be.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&v.push(e,t,s,n,be.z,o)}}else i.visible&&v.push(e,t,i,n,be.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ct(i[e],t,n,r)}function lt(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;y.setupLightsView(n),he===!0&&Le.setGlobalState(S.clippingPlanes,n),r&&k.viewport(E.copy(r)),i.length>0&&dt(i,t,n),a.length>0&&dt(a,t,n),o.length>0&&dt(o,t,n),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function ut(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[r.id]===void 0&&(y.state.transmissionRenderTarget[r.id]=new Jt(1,1,{generateMipmaps:!0,type:Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`)?g:l,minFilter:c,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let a=y.state.transmissionRenderTarget[r.id],o=r.viewport||E;a.setSize(o.z,o.w);let s=S.getRenderTarget();S.setRenderTarget(a),S.getClearColor(ie),ae=S.getClearAlpha(),ae<1&&S.setClearColor(16777215,.5),S.clear(),Se&&ze.render(n);let u=S.toneMapping;S.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),y.setupLightsView(r),he===!0&&Le.setGlobalState(S.clippingPlanes,r),dt(e,n,r),j.updateMultisampleRenderTarget(a),j.updateRenderTargetMipmap(a),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,ft(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(j.updateMultisampleRenderTarget(a),j.updateRenderTargetMipmap(a))}S.setRenderTarget(s),S.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),S.toneMapping=u}function dt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&ft(o,t,n,s,c,l)}}function ft(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function pt(e,t,n){t.isScene!==!0&&(t=xe);let r=A.get(e),i=y.state.lights,a=y.state.shadowsArray,o=i.state.version,s=Ne.getParameters(e,i.state,a,t,n),c=Ne.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?ke:Oe).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,$e),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return ht(e,s),u}else s.uniforms=Ne.getUniforms(e),e.onBeforeCompile(s,S),u=Ne.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=Le.uniform),ht(e,s),r.needsLights=vt(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function mt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=vo.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ht(e,t){let n=A.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function gt(e,t,n,r,i){t.isScene!==!0&&(t=xe),j.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=T===null?S.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:He,c=(r.isMeshStandardMaterial?ke:Oe).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=A.get(r),v=y.state.lights;if(he===!0&&(ge===!0||e!==ne)){let t=e===ne&&r.id===te;Le.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==v.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==Le.numPlanes||_.numIntersection!==Le.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=pt(r,t,i));let C=!1,w=!1,ee=!1,E=x.getUniforms(),re=_.uniforms;if(k.useProgram(x.program)&&(C=!0,w=!0,ee=!0),r.id!==te&&(te=r.id,w=!0),C||ne!==e){k.buffers.depth.getReversed()?(_e.copy(e.projectionMatrix),kt(_e),At(_e),E.setValue(O,`projectionMatrix`,_e)):E.setValue(O,`projectionMatrix`,e.projectionMatrix),E.setValue(O,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(O,ye.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&E.setValue(O,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(O,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,w=!0,ee=!0)}if(i.isSkinnedMesh){E.setOptional(O,i,`bindMatrix`),E.setOptional(O,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(O,`boneTexture`,e.boneTexture,j))}i.isBatchedMesh&&(E.setOptional(O,i,`batchingTexture`),E.setValue(O,`batchingTexture`,i._matricesTexture,j),E.setOptional(O,i,`batchingIdTexture`),E.setValue(O,`batchingIdTexture`,i._indirectTexture,j),E.setOptional(O,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(O,`batchingColorTexture`,i._colorsTexture,j));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Be.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,E.setValue(O,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(re.envMap.value=c,re.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(re.envMapIntensity.value=t.environmentIntensity),w&&(E.setValue(O,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&_t(re,ee),a&&r.fog===!0&&Pe.refreshFogUniforms(re,a),Pe.refreshMaterialUniforms(re,r,ce,se,y.state.transmissionRenderTarget[e.id]),vo.upload(O,mt(_),re,j)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(vo.upload(O,mt(_),re,j),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(O,`center`,i.center),E.setValue(O,`modelViewMatrix`,i.modelViewMatrix),E.setValue(O,`normalMatrix`,i.normalMatrix),E.setValue(O,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];qe.update(n,x),qe.bind(n,x)}}return x}function _t(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function vt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(e,t,n){A.get(e.texture).__webglTexture=t,A.get(e.depthTexture).__webglTexture=n;let r=A.get(e);r.__hasExternalTextures=!0,r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||Te.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(e,t){let n=A.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){T=e,w=t,ee=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=A.get(e);if(s.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(O.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)j.setupRenderTarget(e);else if(s.__hasExternalTextures)j.rebindTextures(e,A.get(e.texture).__webglTexture,A.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&A.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);j.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=A.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&j.useMultisampledRTT(e)===!1?A.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,E.copy(e.viewport),re.copy(e.scissor),D=e.scissorTest}else E.copy(de).multiplyScalar(ce).floor(),re.copy(fe).multiplyScalar(ce).floor(),D=pe;if(k.bindFramebuffer(O.FRAMEBUFFER,i)&&r&&k.drawBuffers(e,i),k.viewport(E),k.scissor(re),k.setScissorTest(D),a){let r=A.get(e.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=A.get(e.texture),i=t||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}te=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=A.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){k.bindFramebuffer(O.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(!Ee.textureFormatReadable(s)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ee.textureTypeReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&O.readPixels(t,n,r,i,Ge.convert(s),Ge.convert(c),a)}finally{let e=T===null?null:A.get(T).__webglFramebuffer;k.bindFramebuffer(O.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let s=A.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){let o=e.texture,c=o.format,l=o.type;if(!Ee.textureFormatReadable(c))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ee.textureTypeReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){k.bindFramebuffer(O.FRAMEBUFFER,s);let e=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,e),O.bufferData(O.PIXEL_PACK_BUFFER,a.byteLength,O.STREAM_READ),O.readPixels(t,n,r,i,Ge.convert(c),Ge.convert(l),0);let o=T===null?null:A.get(T).__webglFramebuffer;k.bindFramebuffer(O.FRAMEBUFFER,o);let u=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ot(O,u,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,e),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,a),O.deleteBuffer(e),O.deleteSync(u),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){e.isTexture!==!0&&(Dt(`WebGLRenderer: copyFramebufferToTexture function signature has changed.`),t=arguments[0]||null,e=arguments[1]);let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;j.setTexture2D(e,0),O.copyTexSubImage2D(O.TEXTURE_2D,n,0,0,o,s,i,a),k.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0){e.isTexture!==!0&&(Dt(`WebGLRenderer: copyTextureToTexture function signature has changed.`),r=arguments[0]||null,e=arguments[1],t=arguments[2],i=arguments[3]||0,n=null);let a,o,s,c,l,u,d,f,p,m=e.isCompressedTexture?e.mipmaps[i]:e.image;n===null?(a=m.width,o=m.height,s=m.depth||1,c=0,l=0,u=0):(a=n.max.x-n.min.x,o=n.max.y-n.min.y,s=n.isBox3?n.max.z-n.min.z:1,c=n.min.x,l=n.min.y,u=n.isBox3?n.min.z:0),r===null?(d=0,f=0,p=0):(d=r.x,f=r.y,p=r.z);let h=Ge.convert(t.format),g=Ge.convert(t.type),_;t.isData3DTexture?(j.setTexture3D(t,0),_=O.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(j.setTexture2DArray(t,0),_=O.TEXTURE_2D_ARRAY):(j.setTexture2D(t,0),_=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,t.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,t.unpackAlignment);let v=O.getParameter(O.UNPACK_ROW_LENGTH),y=O.getParameter(O.UNPACK_IMAGE_HEIGHT),b=O.getParameter(O.UNPACK_SKIP_PIXELS),x=O.getParameter(O.UNPACK_SKIP_ROWS),S=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,m.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,m.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,c),O.pixelStorei(O.UNPACK_SKIP_ROWS,l),O.pixelStorei(O.UNPACK_SKIP_IMAGES,u);let C=e.isDataArrayTexture||e.isData3DTexture,w=t.isDataArrayTexture||t.isData3DTexture;if(e.isRenderTargetTexture||e.isDepthTexture){let n=A.get(e),r=A.get(t),m=A.get(n.__renderTarget),h=A.get(r.__renderTarget);k.bindFramebuffer(O.READ_FRAMEBUFFER,m.__webglFramebuffer),k.bindFramebuffer(O.DRAW_FRAMEBUFFER,h.__webglFramebuffer);for(let n=0;n<s;n++)C&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(e).__webglTexture,i,u+n),e.isDepthTexture?(w&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(t).__webglTexture,i,p+n),O.blitFramebuffer(c,l,a,o,d,f,a,o,O.DEPTH_BUFFER_BIT,O.NEAREST)):w?O.copyTexSubImage3D(_,i,d,f,p+n,c,l,a,o):O.copyTexSubImage2D(_,i,d,f,p+n,c,l,a,o);k.bindFramebuffer(O.READ_FRAMEBUFFER,null),k.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else w?e.isDataTexture||e.isData3DTexture?O.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m.data):t.isCompressedArrayTexture?O.compressedTexSubImage3D(_,i,d,f,p,a,o,s,h,m.data):O.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m):e.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,i,d,f,a,o,h,g,m.data):e.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,i,d,f,m.width,m.height,h,m.data):O.texSubImage2D(O.TEXTURE_2D,i,d,f,a,o,h,g,m);O.pixelStorei(O.UNPACK_ROW_LENGTH,v),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,y),O.pixelStorei(O.UNPACK_SKIP_PIXELS,b),O.pixelStorei(O.UNPACK_SKIP_ROWS,x),O.pixelStorei(O.UNPACK_SKIP_IMAGES,S),i===0&&t.generateMipmaps&&O.generateMipmap(_),k.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n=null,r=null,i=0){return e.isTexture!==!0&&(Dt(`WebGLRenderer: copyTextureToTexture3D function signature has changed.`),n=arguments[0]||null,r=arguments[1]||null,e=arguments[2],t=arguments[3],i=arguments[4]||0),Dt(`WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.`),this.copyTextureToTexture(e,t,n,r,i)},this.initRenderTarget=function(e){A.get(e).__webglFramebuffer===void 0&&j.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?j.setTextureCube(e,0):e.isData3DTexture?j.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?j.setTexture2DArray(e,0):j.setTexture2D(e,0),k.unbindTexture()},this.resetState=function(){w=0,ee=0,T=null,k.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=jt._getUnpackColorSpace()}},Is=class extends tr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ls=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ke,this.updateRanges=[],this.version=0,this.uuid=$e()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$e()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$e()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Rs=new P,zs=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix4(e),this.setXYZ(t,Rs.x,Rs.y,Rs.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyNormalMatrix(e),this.setXYZ(t,Rs.x,Rs.y,Rs.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.transformDirection(e),this.setXYZ(t,Rs.x,Rs.y,Rs.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),r=bt(r,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Er(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Bs=class extends Sr{static get type(){return`SpriteMaterial`}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new F(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vs,Hs=new P,Us=new P,Ws=new P,Gs=new M,Ks=new M,qs=new On,Js=new P,Ys=new P,Xs=new P,Zs=new M,Qs=new M,$s=new M,ec=class extends tr{constructor(e=new Bs){if(super(),this.isSprite=!0,this.type=`Sprite`,Vs===void 0){Vs=new Lr;let e=new Ls(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Vs.setIndex([0,1,2,0,2,3]),Vs.setAttribute(`position`,new zs(e,3,0,!1)),Vs.setAttribute(`uv`,new zs(e,2,3,!1))}this.geometry=Vs,this.material=e,this.center=new M(.5,.5)}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Us.setFromMatrixScale(this.matrixWorld),qs.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Us.multiplyScalar(-Ws.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;tc(Js.set(-.5,-.5,0),Ws,a,Us,r,i),tc(Ys.set(.5,-.5,0),Ws,a,Us,r,i),tc(Xs.set(.5,.5,0),Ws,a,Us,r,i),Zs.set(0,0),Qs.set(1,0),$s.set(1,1);let o=e.ray.intersectTriangle(Js,Ys,Xs,!1,Hs);if(o===null&&(tc(Ys.set(-.5,.5,0),Ws,a,Us,r,i),Qs.set(0,1),o=e.ray.intersectTriangle(Js,Xs,Ys,!1,Hs),o===null))return;let s=e.ray.origin.distanceTo(Hs);s<e.near||s>e.far||t.push({distance:s,point:Hs.clone(),uv:hr.getInterpolation(Hs,Js,Ys,Xs,Zs,Qs,$s,new M),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function tc(e,t,n,r,i,a){Gs.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Ks.copy(Gs):(Ks.x=a*Gs.x-i*Gs.y,Ks.y=i*Gs.x+a*Gs.y),e.copy(t),e.x+=Ks.x,e.y+=Ks.y,e.applyMatrix4(qs)}var nc=class extends Gt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rc=class extends Sr{static get type(){return`LineBasicMaterial`}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new F(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ic=new P,ac=new P,oc=new On,sc=new Dn,cc=new yn,lc=new P,uc=new P,dc=class extends tr{constructor(e=new Lr,t=new rc){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ic.fromBufferAttribute(t,e-1),ac.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ic.distanceTo(ac);e.setAttribute(`lineDistance`,new kr(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cc.copy(n.boundingSphere),cc.applyMatrix4(r),cc.radius+=i,e.ray.intersectsSphere(cc)===!1)return;oc.copy(r).invert(),sc.copy(e.ray).applyMatrix4(oc);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=fc(this,e,sc,s,n,r);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=fc(this,e,sc,s,i,a);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=fc(this,e,sc,s,i,i+1);n&&t.push(n)}if(this.isLineLoop){let i=fc(this,e,sc,s,r-1,n);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function fc(e,t,n,r,i,a){let o=e.geometry.attributes.position;if(ic.fromBufferAttribute(o,i),ac.fromBufferAttribute(o,a),n.distanceSqToSegment(ic,ac,lc,uc)>r)return;lc.applyMatrix4(e.matrixWorld);let s=t.ray.origin.distanceTo(lc);if(!(s<t.near||s>t.far))return{distance:s,point:uc.clone().applyMatrix4(e.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:e}}var pc=new P,mc=new P,hc=class extends dc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)pc.fromBufferAttribute(t,e),mc.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+pc.distanceTo(mc);e.setAttribute(`lineDistance`,new kr(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},gc=class extends dc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},_c=class extends Sr{static get type(){return`PointsMaterial`}constructor(e){super(),this.isPointsMaterial=!0,this.color=new F(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},vc=new On,yc=new Dn,bc=new yn,xc=new P,Sc=class extends tr{constructor(e=new Lr,t=new _c){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bc.copy(n.boundingSphere),bc.applyMatrix4(r),bc.radius+=i,e.ray.intersectsSphere(bc)===!1)return;vc.copy(r).invert(),yc.copy(e.ray).applyMatrix4(vc);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);xc.fromBufferAttribute(l,n),Cc(xc,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)xc.fromBufferAttribute(l,a),Cc(xc,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Cc(e,t,n,r,i,a,o){let s=yc.distanceSqToPoint(e);if(s<n){let n=new P;yc.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var wc=class extends Gt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Tc=class e extends Lr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new kr(u,3)),this.setAttribute(`normal`,new kr(d,3)),this.setAttribute(`uv`,new kr(f,2));function _(){let a=new P,_=new P,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new M,m=new P,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ec=class e extends Lr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new kr(i,3)),this.setAttribute(`normal`,new kr(i.slice(),3)),this.setAttribute(`uv`,new kr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new P,r=new P,i=new P;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new P;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new P;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new P,t=new P,n=new P,r=new P,o=new M,s=new M,c=new M;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.details)}},Dc={triangulate:function(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Oc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l,u,d,f,p;if(r&&(a=Fc(e,t,a,n)),e.length>80*n){s=l=e[0],c=u=e[1];for(let t=n;t<i;t+=n)d=e[t],f=e[t+1],d<s&&(s=d),f<c&&(c=f),d>l&&(l=d),f>u&&(u=f);p=Math.max(l-s,u-c),p=p===0?0:32767/p}return Ac(a,o,n,s,c,p,0),o}};function Oc(e,t,n,r,i){let a,o;if(i===il(e,t,n,r)>0)for(a=t;a<n;a+=r)o=tl(a,e[a],e[a+1],o);else for(a=n-r;a>=t;a-=r)o=tl(a,e[a],e[a+1],o);return o&&qc(o,o.next)&&(nl(o),o=o.next),o}function kc(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(qc(n,n.next)||Kc(n.prev,n,n.next)===0)){if(nl(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ac(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Bc(e,r,i,a);let s=e,c,l;for(;e.prev!==e.next;)if(c=e.prev,l=e.next,a?Mc(e,r,i,a):jc(e))t.push(c.i/n|0),t.push(e.i/n|0),t.push(l.i/n|0),nl(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=Nc(kc(e),t,n),Ac(e,t,n,r,i,a,2)):o===2&&Pc(e,t,n,r,i,a):Ac(kc(e),t,n,r,i,a,1);break}}function jc(e){let t=e.prev,n=e,r=e.next;if(Kc(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=i<a?i<o?i:o:a<o?a:o,d=s<c?s<l?s:l:c<l?c:l,f=i>a?i>o?i:o:a>o?a:o,p=s>c?s>l?s:l:c>l?c:l,m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Wc(i,s,a,c,o,l,m.x,m.y)&&Kc(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Mc(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Kc(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=s<c?s<l?s:l:c<l?c:l,m=u<d?u<f?u:f:d<f?d:f,h=s>c?s>l?s:l:c>l?c:l,g=u>d?u>f?u:f:d>f?d:f,_=Hc(p,m,t,n,r),v=Hc(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Wc(s,u,c,d,l,f,y.x,y.y)&&Kc(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Wc(s,u,c,d,l,f,b.x,b.y)&&Kc(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Wc(s,u,c,d,l,f,y.x,y.y)&&Kc(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Wc(s,u,c,d,l,f,b.x,b.y)&&Kc(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Nc(e,t,n){let r=e;do{let i=r.prev,a=r.next.next;!qc(i,a)&&Jc(i,r,r.next,a)&&Qc(i,a)&&Qc(a,i)&&(t.push(i.i/n|0),t.push(r.i/n|0),t.push(a.i/n|0),nl(r),nl(r.next),r=e=a),r=r.next}while(r!==e);return kc(r)}function Pc(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Gc(o,e)){let s=el(o,e);o=kc(o,o.next),s=kc(s,s.next),Ac(o,t,n,r,i,a,0),Ac(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Fc(e,t,n,r){let i=[],a,o,s,c,l;for(a=0,o=t.length;a<o;a++)s=t[a]*r,c=a<o-1?t[a+1]*r:e.length,l=Oc(e,s,c,r,!1),l===l.next&&(l.steiner=!0),i.push(Uc(l));for(i.sort(Ic),a=0;a<i.length;a++)n=Lc(i[a],n);return n}function Ic(e,t){return e.x-t.x}function Lc(e,t){let n=Rc(e,t);if(!n)return t;let r=el(n,e);return kc(r,r.next),kc(n,n.next)}function Rc(e,t){let n=t,r=-1/0,i,a=e.x,o=e.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let e=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=a&&e>r&&(r=e,i=n.x<n.next.x?n:n.next,e===a))return i}n=n.next}while(n!==t);if(!i)return null;let s=i,c=i.x,l=i.y,u=1/0,d;n=i;do a>=n.x&&n.x>=c&&a!==n.x&&Wc(o<l?a:r,o,c,l,o<l?r:a,o,n.x,n.y)&&(d=Math.abs(o-n.y)/(a-n.x),Qc(n,e)&&(d<u||d===u&&(n.x>i.x||n.x===i.x&&zc(i,n)))&&(i=n,u=d)),n=n.next;while(n!==s);return i}function zc(e,t){return Kc(e.prev,e,t.prev)<0&&Kc(t.next,e,e.next)<0}function Bc(e,t,n,r){let i=e;do i.z===0&&(i.z=Hc(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Vc(i)}function Vc(e){let t,n,r,i,a,o,s,c,l=1;do{for(n=e,e=null,a=null,o=0;n;){for(o++,r=n,s=0,t=0;t<l&&(s++,r=r.nextZ,r);t++);for(c=l;s>0||c>0&&r;)s!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;n=r}a.nextZ=null,l*=2}while(o>1);return e}function Hc(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Uc(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Wc(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Gc(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Zc(e,t)&&(Qc(e,t)&&Qc(t,e)&&$c(e,t)&&(Kc(e.prev,e,t.prev)||Kc(e,t.prev,t))||qc(e,t)&&Kc(e.prev,e,e.next)>0&&Kc(t.prev,t,t.next)>0)}function Kc(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function qc(e,t){return e.x===t.x&&e.y===t.y}function Jc(e,t,n,r){let i=Xc(Kc(e,t,n)),a=Xc(Kc(e,t,r)),o=Xc(Kc(n,r,e)),s=Xc(Kc(n,r,t));return!!(i!==a&&o!==s||i===0&&Yc(e,n,t)||a===0&&Yc(e,r,t)||o===0&&Yc(n,e,r)||s===0&&Yc(n,t,r))}function Yc(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Xc(e){return e>0?1:e<0?-1:0}function Zc(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Jc(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Qc(e,t){return Kc(e.prev,e,e.next)<0?Kc(e,t,e.next)>=0&&Kc(e,e.prev,t)>=0:Kc(e,t,e.prev)<0||Kc(e,e.next,t)<0}function $c(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function el(e,t){let n=new rl(e.i,e.x,e.y),r=new rl(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function tl(e,t,n,r){let i=new rl(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function nl(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function rl(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function il(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var al=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];ol(e),sl(n,e);let a=e.length;t.forEach(ol);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,sl(n,t[e]);let o=Dc.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function ol(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function sl(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var cl=class e extends Ec{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ll=class e extends Lr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new P,d=new P,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new kr(p,3)),this.setAttribute(`normal`,new kr(m,3)),this.setAttribute(`uv`,new kr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ul=class e extends Lr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],s=[],c=[],l=new P,u=new P,d=new P;for(let a=0;a<=n;a++)for(let f=0;f<=r;f++){let p=f/r*i,m=a/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(p),u.y=(e+t*Math.cos(m))*Math.sin(p),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),l.x=e*Math.cos(p),l.y=e*Math.sin(p),d.subVectors(u,l).normalize(),s.push(d.x,d.y,d.z),c.push(f/r),c.push(a/n)}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,o=(r+1)*(e-1)+t,s=(r+1)*e+t;a.push(n,i,s),a.push(i,o,s)}this.setIndex(a),this.setAttribute(`position`,new kr(o,3)),this.setAttribute(`normal`,new kr(s,3)),this.setAttribute(`uv`,new kr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},dl=class extends Lr{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,i=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),fl(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),fl(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new kr(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function fl(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}var pl=class extends rc{static get type(){return`LineDashedMaterial`}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ml(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function hl(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var gl=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},_l=class extends gl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ie,endingEnd:Ie}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Le:i=e,o=2*t-n;break;case Re:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Le:a=e,s=2*n-t;break;case Re:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},vl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},yl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bl=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ml(t,this.TimeBufferType),this.values=ml(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ml(e.times,Array),values:ml(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _l(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ne:t=this.InterpolantFactoryMethodDiscrete;break;case Pe:t=this.InterpolantFactoryMethodLinear;break;case Fe:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ne;case this.InterpolantFactoryMethodLinear:return Pe;case this.InterpolantFactoryMethodSmooth:return Fe}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&hl(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Fe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};bl.prototype.TimeBufferType=Float32Array,bl.prototype.ValueBufferType=Float32Array,bl.prototype.DefaultInterpolation=Pe;var xl=class extends bl{constructor(e,t,n){super(e,t,n)}};xl.prototype.ValueTypeName=`bool`,xl.prototype.ValueBufferType=Array,xl.prototype.DefaultInterpolation=Ne,xl.prototype.InterpolantFactoryMethodLinear=void 0,xl.prototype.InterpolantFactoryMethodSmooth=void 0;var Sl=class extends bl{};Sl.prototype.ValueTypeName=`color`;var Cl=class extends bl{};Cl.prototype.ValueTypeName=`number`;var wl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Zt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Tl=class extends bl{InterpolantFactoryMethodLinear(e){return new wl(this.times,this.values,this.getValueSize(),e)}};Tl.prototype.ValueTypeName=`quaternion`,Tl.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends bl{constructor(e,t,n){super(e,t,n)}};El.prototype.ValueTypeName=`string`,El.prototype.ValueBufferType=Array,El.prototype.DefaultInterpolation=Ne,El.prototype.InterpolantFactoryMethodLinear=void 0,El.prototype.InterpolantFactoryMethodSmooth=void 0;var Dl=class extends bl{};Dl.prototype.ValueTypeName=`vector`;var Ol=class extends Lr{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},kl=`\\[\\]\\.:\\/`,Al=RegExp(`[\\[\\]\\.:\\/]`,`g`),jl=`[^\\[\\]\\.:\\/]`,Ml=`[^`+kl.replace(`\\.`,``)+`]`,Nl=`((?:WC+[\\/:])*)`.replace(`WC`,jl),Pl=`(WCOD+)?`.replace(`WCOD`,Ml),Fl=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,jl),Il=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,jl),Ll=RegExp(`^`+Nl+Pl+Fl+Il+`$`),Rl=[`material`,`materials`,`bones`,`map`],zl=class{constructor(e,t,n){let r=n||Bl.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bl=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Al,``)}static parseTrackName(e){let t=Ll.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Rl.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bl.Composite=zl,Bl.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Bl.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Bl.prototype.GetterByBindingType=[Bl.prototype._getValue_direct,Bl.prototype._getValue_array,Bl.prototype._getValue_arrayElement,Bl.prototype._getValue_toArray],Bl.prototype.SetterByBindingTypeAndVersioning=[[Bl.prototype._setValue_direct,Bl.prototype._setValue_direct_setNeedsUpdate,Bl.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bl.prototype._setValue_array,Bl.prototype._setValue_array_setNeedsUpdate,Bl.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bl.prototype._setValue_arrayElement,Bl.prototype._setValue_arrayElement_setNeedsUpdate,Bl.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bl.prototype._setValue_fromArray,Bl.prototype._setValue_fromArray_setNeedsUpdate,Bl.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vl=class extends Ls{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},Hl=new On,Ul=class{constructor(e,t,n=0,r=1/0){this.ray=new Dn(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new zn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error(`THREE.Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Hl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hl),this}intersectObject(e,t=!0,n=[]){return Gl(e,this,n,t),n.sort(Wl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Gl(e[r],this,n,t);return n.sort(Wl),n}};function Wl(e,t){return e.distance-t.distance}function Gl(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Gl(r[e],t,n,!0)}}var Kl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=Math.max(e,Math.min(Math.PI-e,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},ql=new P,Jl=new P,Yl=class{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){ql.subVectors(e,this.start),Jl.subVectors(this.end,this.start);let n=Jl.dot(Jl),r=Jl.dot(ql)/n;return t&&(r=et(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Xl=class extends Je{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`170`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`170`);var Zl=new Ul,Ql=new P,$l=new P,eu=new Zt,tu={X:new P(1,0,0),Y:new P(0,1,0),Z:new P(0,0,1)},nu={type:`change`},ru={type:`mouseDown`,mode:null},iu={type:`mouseUp`,mode:null},au={type:`objectChange`},ou=class extends Xl{constructor(e,t=null){super(void 0,t);let n=new Du(this);this._root=n;let r=new Ou;this._gizmo=r,n.add(r);let i=new ku;this._plane=i,n.add(i);let a=this;function o(e,t){let n=t;Object.defineProperty(a,e,{get:function(){return n===void 0?t:n},set:function(t){n!==t&&(n=t,i[e]=t,r[e]=t,a.dispatchEvent({type:e+`-changed`,value:t}),a.dispatchEvent(nu))}}),a[e]=t,i[e]=t,r[e]=t}o(`camera`,e),o(`object`,void 0),o(`enabled`,!0),o(`axis`,null),o(`mode`,`translate`),o(`translationSnap`,null),o(`rotationSnap`,null),o(`scaleSnap`,null),o(`space`,`world`),o(`size`,1),o(`dragging`,!1),o(`showX`,!0),o(`showY`,!0),o(`showZ`,!0),o(`minX`,-1/0),o(`maxX`,1/0),o(`minY`,-1/0),o(`maxY`,1/0),o(`minZ`,-1/0),o(`maxZ`,1/0);let s=new P,c=new P,l=new Zt,u=new Zt,d=new P,f=new Zt,p=new P,m=new P,h=new P,g=new P;o(`worldPosition`,s),o(`worldPositionStart`,c),o(`worldQuaternion`,l),o(`worldQuaternionStart`,u),o(`cameraPosition`,d),o(`cameraQuaternion`,f),o(`pointStart`,p),o(`pointEnd`,m),o(`rotationAxis`,h),o(`rotationAngle`,0),o(`eye`,g),this._offset=new P,this._startNorm=new P,this._endNorm=new P,this._cameraScale=new P,this._parentPosition=new P,this._parentQuaternion=new Zt,this._parentQuaternionInv=new Zt,this._parentScale=new P,this._worldScaleStart=new P,this._worldQuaternionInv=new Zt,this._worldScale=new P,this._positionStart=new P,this._quaternionStart=new Zt,this._scaleStart=new P,this._getPointer=su.bind(this),this._onPointerDown=lu.bind(this),this._onPointerHover=cu.bind(this),this._onPointerMove=uu.bind(this),this._onPointerUp=du.bind(this),t!==null&&this.connect()}connect(){this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointermove`,this._onPointerHover),this.domElement.addEventListener(`pointerup`,this._onPointerUp),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.removeEventListener(`pointermove`,this._onPointerHover),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.style.touchAction=`auto`}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&Zl.setFromCamera(e,this.camera);let t=fu(this._gizmo.picker[this.mode],Zl);this.axis=t?t.object.name:null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&Zl.setFromCamera(e,this.camera);let t=fu(this._plane,Zl,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,ru.mode=this.mode,this.dispatchEvent(ru)}}pointerMove(e){let t=this.axis,n=this.mode,r=this.object,i=this.space;if(n===`scale`?i=`local`:(t===`E`||t===`XYZE`||t===`XYZ`)&&(i=`world`),r===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&Zl.setFromCamera(e,this.camera);let a=fu(this._plane,Zl,!0);if(a){if(this.pointEnd.copy(a.point).sub(this.worldPositionStart),n===`translate`)this._offset.copy(this.pointEnd).sub(this.pointStart),i===`local`&&t!==`XYZ`&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf(`X`)===-1&&(this._offset.x=0),t.indexOf(`Y`)===-1&&(this._offset.y=0),t.indexOf(`Z`)===-1&&(this._offset.z=0),i===`local`&&t!==`XYZ`?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(i===`local`&&(r.position.applyQuaternion(eu.copy(this._quaternionStart).invert()),t.search(`X`)!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search(`Y`)!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search(`Z`)!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),i===`world`&&(r.parent&&r.position.add(Ql.setFromMatrixPosition(r.parent.matrixWorld)),t.search(`X`)!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search(`Y`)!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search(`Z`)!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Ql.setFromMatrixPosition(r.parent.matrixWorld)))),r.position.x=Math.max(this.minX,Math.min(this.maxX,r.position.x)),r.position.y=Math.max(this.minY,Math.min(this.maxY,r.position.y)),r.position.z=Math.max(this.minZ,Math.min(this.maxZ,r.position.z));else if(n===`scale`){if(t.search(`XYZ`)!==-1){let e=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(e*=-1),$l.set(e,e,e)}else Ql.copy(this.pointStart),$l.copy(this.pointEnd),Ql.applyQuaternion(this._worldQuaternionInv),$l.applyQuaternion(this._worldQuaternionInv),$l.divide(Ql),t.search(`X`)===-1&&($l.x=1),t.search(`Y`)===-1&&($l.y=1),t.search(`Z`)===-1&&($l.z=1);r.scale.copy(this._scaleStart).multiply($l),this.scaleSnap&&(t.search(`X`)!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search(`Y`)!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search(`Z`)!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n===`rotate`){this._offset.copy(this.pointEnd).sub(this.pointStart);let e=20/this.worldPosition.distanceTo(Ql.setFromMatrixPosition(this.camera.matrixWorld)),n=!1;t===`XYZE`?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Ql.copy(this.rotationAxis).cross(this.eye))*e):(t===`X`||t===`Y`||t===`Z`)&&(this.rotationAxis.copy(tu[t]),Ql.copy(tu[t]),i===`local`&&Ql.applyQuaternion(this.worldQuaternion),Ql.cross(this.eye),Ql.length()===0?n=!0:this.rotationAngle=this._offset.dot(Ql.normalize())*e),(t===`E`||n)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),i===`local`&&t!==`E`&&t!==`XYZE`?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(eu.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(eu.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(nu),this.dispatchEvent(au)}}pointerUp(e){(e===null||e.button===0)&&(this.dragging&&this.axis!==null&&(iu.mode=this.mode,this.dispatchEvent(iu)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(nu),this.dispatchEvent(au),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Zl}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}};function su(e){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:e.button};{let t=this.domElement.getBoundingClientRect();return{x:(e.clientX-t.left)/t.width*2-1,y:-(e.clientY-t.top)/t.height*2+1,button:e.button}}}function cu(e){if(this.enabled)switch(e.pointerType){case`mouse`:case`pen`:this.pointerHover(this._getPointer(e))}}function lu(e){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener(`pointermove`,this._onPointerMove),this.pointerHover(this._getPointer(e)),this.pointerDown(this._getPointer(e)))}function uu(e){this.enabled&&this.pointerMove(this._getPointer(e))}function du(e){this.enabled&&(this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.pointerUp(this._getPointer(e)))}function fu(e,t,n){let r=t.intersectObject(e,!0);for(let e=0;e<r.length;e++)if(r[e].object.visible||n)return r[e];return!1}var pu=new Rn,mu=new P(0,1,0),hu=new P(0,0,0),gu=new On,_u=new Zt,vu=new Zt,yu=new P,bu=new On,xu=new P(1,0,0),Su=new P(0,1,0),Cu=new P(0,0,1),wu=new P,Tu=new P,Eu=new P,Du=class extends tr{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){let t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error(`TransformControls: The attached 3D object must be a part of the scene graph.`):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}},Ou=class extends tr{constructor(){super(),this.isTransformControlsGizmo=!0,this.type=`TransformControlsGizmo`;let e=new Cr({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new rc({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;let r=t.clone();r.opacity=.5;let i=e.clone();i.color.setHex(16711680);let a=e.clone();a.color.setHex(65280);let o=e.clone();o.color.setHex(255);let s=e.clone();s.color.setHex(16711680),s.opacity=.5;let c=e.clone();c.color.setHex(65280),c.opacity=.5;let l=e.clone();l.color.setHex(255),l.opacity=.5;let u=e.clone();u.opacity=.25;let d=e.clone();d.color.setHex(16776960),d.opacity=.25,e.clone().color.setHex(16776960);let f=e.clone();f.color.setHex(7895160);let p=new Tc(0,.04,.1,12);p.translate(0,.05,0);let m=new Zr(.08,.08,.08);m.translate(0,.04,0);let h=new Lr;h.setAttribute(`position`,new kr([0,0,0,1,0,0],3));let g=new Tc(.0075,.0075,.5,3);g.translate(0,.25,0);function _(e,t){let n=new ul(e,.0075,3,64,t*Math.PI*2);return n.rotateY(Math.PI/2),n.rotateX(Math.PI/2),n}function v(){let e=new Lr;return e.setAttribute(`position`,new kr([0,0,0,1,1,1],3)),e}let y={X:[[new I(p,i),[.5,0,0],[0,0,-Math.PI/2]],[new I(p,i),[-.5,0,0],[0,0,Math.PI/2]],[new I(g,i),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new I(p,a),[0,.5,0]],[new I(p,a),[0,-.5,0],[Math.PI,0,0]],[new I(g,a)]],Z:[[new I(p,o),[0,0,.5],[Math.PI/2,0,0]],[new I(p,o),[0,0,-.5],[-Math.PI/2,0,0]],[new I(g,o),null,[Math.PI/2,0,0]]],XYZ:[[new I(new cl(.1,0),u.clone()),[0,0,0]]],XY:[[new I(new Zr(.15,.15,.01),l.clone()),[.15,.15,0]]],YZ:[[new I(new Zr(.15,.15,.01),s.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new I(new Zr(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},b={X:[[new I(new Tc(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new I(new Tc(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new I(new Tc(.2,0,.6,4),n),[0,.3,0]],[new I(new Tc(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new I(new Tc(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new I(new Tc(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new I(new cl(.2,0),n)]],XY:[[new I(new Zr(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new I(new Zr(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new I(new Zr(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},x={START:[[new I(new cl(.01,2),r),null,null,null,`helper`]],END:[[new I(new cl(.01,2),r),null,null,null,`helper`]],DELTA:[[new dc(v(),r),null,null,null,`helper`]],X:[[new dc(h,r.clone()),[-1e3,0,0],null,[1e6,1,1],`helper`]],Y:[[new dc(h,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],`helper`]],Z:[[new dc(h,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],`helper`]]},S={XYZE:[[new I(_(.5,1),f),null,[0,Math.PI/2,0]]],X:[[new I(_(.5,.5),i)]],Y:[[new I(_(.5,.5),a),null,[0,0,-Math.PI/2]]],Z:[[new I(_(.5,.5),o),null,[0,Math.PI/2,0]]],E:[[new I(_(.75,1),d),null,[0,Math.PI/2,0]]]},C={AXIS:[[new dc(h,r.clone()),[-1e3,0,0],null,[1e6,1,1],`helper`]]},w={XYZE:[[new I(new ll(.25,10,8),n)]],X:[[new I(new ul(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new I(new ul(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new I(new ul(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new I(new ul(.75,.1,2,24),n)]]},ee={X:[[new I(m,i),[.5,0,0],[0,0,-Math.PI/2]],[new I(g,i),[0,0,0],[0,0,-Math.PI/2]],[new I(m,i),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new I(m,a),[0,.5,0]],[new I(g,a)],[new I(m,a),[0,-.5,0],[0,0,Math.PI]]],Z:[[new I(m,o),[0,0,.5],[Math.PI/2,0,0]],[new I(g,o),[0,0,0],[Math.PI/2,0,0]],[new I(m,o),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new I(new Zr(.15,.15,.01),l),[.15,.15,0]]],YZ:[[new I(new Zr(.15,.15,.01),s),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new I(new Zr(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new I(new Zr(.1,.1,.1),u.clone())]]},T={X:[[new I(new Tc(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new I(new Tc(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new I(new Tc(.2,0,.6,4),n),[0,.3,0]],[new I(new Tc(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new I(new Tc(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new I(new Tc(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new I(new Zr(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new I(new Zr(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new I(new Zr(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new I(new Zr(.2,.2,.2),n),[0,0,0]]]},te={X:[[new dc(h,r.clone()),[-1e3,0,0],null,[1e6,1,1],`helper`]],Y:[[new dc(h,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],`helper`]],Z:[[new dc(h,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],`helper`]]};function ne(e){let t=new tr;for(let n in e)for(let r=e[n].length;r--;){let i=e[n][r][0].clone(),a=e[n][r][1],o=e[n][r][2],s=e[n][r][3],c=e[n][r][4];i.name=n,i.tag=c,a&&i.position.set(a[0],a[1],a[2]),o&&i.rotation.set(o[0],o[1],o[2]),s&&i.scale.set(s[0],s[1],s[2]),i.updateMatrix();let l=i.geometry.clone();l.applyMatrix4(i.matrix),i.geometry=l,i.renderOrder=1/0,i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),t.add(i)}return t}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=ne(y)),this.add(this.gizmo.rotate=ne(S)),this.add(this.gizmo.scale=ne(ee)),this.add(this.picker.translate=ne(b)),this.add(this.picker.rotate=ne(w)),this.add(this.picker.scale=ne(T)),this.add(this.helper.translate=ne(x)),this.add(this.helper.rotate=ne(C)),this.add(this.helper.scale=ne(te)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){let t=(this.mode===`scale`?`local`:this.space)===`local`?this.worldQuaternion:vu;this.gizmo.translate.visible=this.mode===`translate`,this.gizmo.rotate.visible=this.mode===`rotate`,this.gizmo.scale.visible=this.mode===`scale`,this.helper.translate.visible=this.mode===`translate`,this.helper.rotate.visible=this.mode===`rotate`,this.helper.scale.visible=this.mode===`scale`;let n=[];n=n.concat(this.picker[this.mode].children),n=n.concat(this.gizmo[this.mode].children),n=n.concat(this.helper[this.mode].children);for(let e=0;e<n.length;e++){let r=n[e];r.visible=!0,r.rotation.set(0,0,0),r.position.copy(this.worldPosition);let i;if(i=this.camera.isOrthographicCamera?(this.camera.top-this.camera.bottom)/this.camera.zoom:this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),r.scale.set(1,1,1).multiplyScalar(i*this.size/4),r.tag===`helper`)r.visible=!1,r.name===`AXIS`?(r.visible=!!this.axis,this.axis===`X`&&(eu.setFromEuler(pu.set(0,0,0)),r.quaternion.copy(t).multiply(eu),Math.abs(mu.copy(xu).applyQuaternion(t).dot(this.eye))>.9&&(r.visible=!1)),this.axis===`Y`&&(eu.setFromEuler(pu.set(0,0,Math.PI/2)),r.quaternion.copy(t).multiply(eu),Math.abs(mu.copy(Su).applyQuaternion(t).dot(this.eye))>.9&&(r.visible=!1)),this.axis===`Z`&&(eu.setFromEuler(pu.set(0,Math.PI/2,0)),r.quaternion.copy(t).multiply(eu),Math.abs(mu.copy(Cu).applyQuaternion(t).dot(this.eye))>.9&&(r.visible=!1)),this.axis===`XYZE`&&(eu.setFromEuler(pu.set(0,Math.PI/2,0)),mu.copy(this.rotationAxis),r.quaternion.setFromRotationMatrix(gu.lookAt(hu,mu,Su)),r.quaternion.multiply(eu),r.visible=this.dragging),this.axis===`E`&&(r.visible=!1)):r.name===`START`?(r.position.copy(this.worldPositionStart),r.visible=this.dragging):r.name===`END`?(r.position.copy(this.worldPosition),r.visible=this.dragging):r.name===`DELTA`?(r.position.copy(this.worldPositionStart),r.quaternion.copy(this.worldQuaternionStart),Ql.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Ql.applyQuaternion(this.worldQuaternionStart.clone().invert()),r.scale.copy(Ql),r.visible=this.dragging):(r.quaternion.copy(t),this.dragging?r.position.copy(this.worldPositionStart):r.position.copy(this.worldPosition),this.axis&&(r.visible=this.axis.search(r.name)!==-1));else{if(r.quaternion.copy(t),this.mode===`translate`||this.mode===`scale`){let e=.99,n=.2;r.name===`X`&&Math.abs(mu.copy(xu).applyQuaternion(t).dot(this.eye))>e&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name===`Y`&&Math.abs(mu.copy(Su).applyQuaternion(t).dot(this.eye))>e&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name===`Z`&&Math.abs(mu.copy(Cu).applyQuaternion(t).dot(this.eye))>e&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name===`XY`&&Math.abs(mu.copy(Cu).applyQuaternion(t).dot(this.eye))<n&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name===`YZ`&&Math.abs(mu.copy(xu).applyQuaternion(t).dot(this.eye))<n&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name===`XZ`&&Math.abs(mu.copy(Su).applyQuaternion(t).dot(this.eye))<n&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1)}else this.mode===`rotate`&&(_u.copy(t),mu.copy(this.eye).applyQuaternion(eu.copy(t).invert()),r.name.search(`E`)!==-1&&r.quaternion.setFromRotationMatrix(gu.lookAt(this.eye,hu,Su)),r.name===`X`&&(eu.setFromAxisAngle(xu,Math.atan2(-mu.y,mu.z)),eu.multiplyQuaternions(_u,eu),r.quaternion.copy(eu)),r.name===`Y`&&(eu.setFromAxisAngle(Su,Math.atan2(mu.x,mu.z)),eu.multiplyQuaternions(_u,eu),r.quaternion.copy(eu)),r.name===`Z`&&(eu.setFromAxisAngle(Cu,Math.atan2(mu.y,mu.x)),eu.multiplyQuaternions(_u,eu),r.quaternion.copy(eu)));r.visible=r.visible&&(r.name.indexOf(`X`)===-1||this.showX),r.visible=r.visible&&(r.name.indexOf(`Y`)===-1||this.showY),r.visible=r.visible&&(r.name.indexOf(`Z`)===-1||this.showZ),r.visible=r.visible&&(r.name.indexOf(`E`)===-1||this.showX&&this.showY&&this.showZ),r.material._color=r.material._color||r.material.color.clone(),r.material._opacity=r.material._opacity||r.material.opacity,r.material.color.copy(r.material._color),r.material.opacity=r.material._opacity,this.enabled&&this.axis&&(r.name===this.axis||this.axis.split(``).some(function(e){return r.name===e}))&&(r.material.color.setHex(16776960),r.material.opacity=1)}}super.updateMatrixWorld(e)}},ku=class extends I{constructor(){super(new Ti(1e5,1e5,2,2),new Cr({visible:!1,wireframe:!0,side:2,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type=`TransformControlsPlane`}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode===`scale`&&(t=`local`),wu.copy(xu).applyQuaternion(t===`local`?this.worldQuaternion:vu),Tu.copy(Su).applyQuaternion(t===`local`?this.worldQuaternion:vu),Eu.copy(Cu).applyQuaternion(t===`local`?this.worldQuaternion:vu),mu.copy(Tu),this.mode){case`translate`:case`scale`:switch(this.axis){case`X`:mu.copy(this.eye).cross(wu),yu.copy(wu).cross(mu);break;case`Y`:mu.copy(this.eye).cross(Tu),yu.copy(Tu).cross(mu);break;case`Z`:mu.copy(this.eye).cross(Eu),yu.copy(Eu).cross(mu);break;case`XY`:yu.copy(Eu);break;case`YZ`:yu.copy(wu);break;case`XZ`:mu.copy(Eu),yu.copy(Tu);break;case`XYZ`:case`E`:yu.set(0,0,0)}break;default:yu.set(0,0,0)}yu.length()===0?this.quaternion.copy(this.cameraQuaternion):(bu.lookAt(Ql.set(0,0,0),yu,mu),this.quaternion.setFromRotationMatrix(bu)),super.updateMatrixWorld(e)}},Au=new en,ju=new P,Mu=class extends Ol{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new kr([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new kr([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Vl(t,6,1);return this.setAttribute(`instanceStart`,new zs(n,3,0)),this.setAttribute(`instanceEnd`,new zs(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Vl(t,6,1);return this.setAttribute(`instanceColorStart`,new zs(n,3,0)),this.setAttribute(`instanceColorEnd`,new zs(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new dl(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Au.setFromBufferAttribute(t),this.boundingBox.union(Au))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)ju.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(ju)),ju.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(ju));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};R.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new M(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},Ei.line={uniforms:ni.merge([R.common,R.fog,R.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Nu=class extends ai{static get type(){return`LineMaterial`}constructor(e){super({uniforms:ni.clone(Ei.line.uniforms),vertexShader:Ei.line.vertexShader,fragmentShader:Ei.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},Pu=new Kt,Fu=new P,Iu=new P,Lu=new Kt,Ru=new Kt,zu=new Kt,Bu=new P,Vu=new On,Hu=new Yl,Uu=new P,Wu=new en,Gu=new yn,Ku=new Kt,qu,Ju;function Yu(e,t,n){return Ku.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Ku.multiplyScalar(1/Ku.w),Ku.x=Ju/n.width,Ku.y=Ju/n.height,Ku.applyMatrix4(e.projectionMatrixInverse),Ku.multiplyScalar(1/Ku.w),Math.abs(Math.max(Ku.x,Ku.y))}function Xu(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){Hu.start.fromBufferAttribute(i,r),Hu.end.fromBufferAttribute(a,r),Hu.applyMatrix4(n);let o=new P,s=new P;qu.distanceSqToSegment(Hu.start,Hu.end,s,o),s.distanceTo(o)<Ju*.5&&t.push({point:s,pointOnLine:o,distance:qu.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Zu(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;qu.at(1,zu),zu.w=1,zu.applyMatrix4(t.matrixWorldInverse),zu.applyMatrix4(r),zu.multiplyScalar(1/zu.w),zu.x*=i.x/2,zu.y*=i.y/2,zu.z=0,Bu.copy(zu),Vu.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(Lu.fromBufferAttribute(s,t),Ru.fromBufferAttribute(c,t),Lu.w=1,Ru.w=1,Lu.applyMatrix4(Vu),Ru.applyMatrix4(Vu),Lu.z>u&&Ru.z>u)continue;if(Lu.z>u){let e=Lu.z-Ru.z,t=(Lu.z-u)/e;Lu.lerp(Ru,t)}else if(Ru.z>u){let e=Ru.z-Lu.z,t=(Ru.z-u)/e;Ru.lerp(Lu,t)}Lu.applyMatrix4(r),Ru.applyMatrix4(r),Lu.multiplyScalar(1/Lu.w),Ru.multiplyScalar(1/Ru.w),Lu.x*=i.x/2,Lu.y*=i.y/2,Ru.x*=i.x/2,Ru.y*=i.y/2,Hu.start.copy(Lu),Hu.start.z=0,Hu.end.copy(Ru),Hu.end.z=0;let o=Hu.closestPointToPointParameter(Bu,!0);Hu.at(o,Uu);let l=xt.lerp(Lu.z,Ru.z,o),d=l>=-1&&l<=1,f=Bu.distanceTo(Uu)<Ju*.5;if(d&&f){Hu.start.fromBufferAttribute(s,t),Hu.end.fromBufferAttribute(c,t),Hu.start.applyMatrix4(a),Hu.end.applyMatrix4(a);let r=new P,i=new P;qu.distanceSqToSegment(Hu.start,Hu.end,i,r),n.push({point:i,pointOnLine:r,distance:qu.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var Qu=class extends I{constructor(e=new Mu,t=new Nu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Fu.fromBufferAttribute(t,e),Iu.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Fu.distanceTo(Iu);let i=new Vl(r,2,1);return e.setAttribute(`instanceDistanceStart`,new zs(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new zs(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;qu=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Ju=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),Gu.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Ju*.5:Yu(r,Math.max(r.near,Gu.distanceToPoint(qu.origin)),s.resolution),Gu.radius+=c,qu.intersectsSphere(Gu)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Wu.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Ju*.5:Yu(r,Math.max(r.near,Wu.distanceToPoint(qu.origin)),s.resolution),Wu.expandByScalar(l),qu.intersectsBox(Wu)!==!1&&(n?Xu(this,t):Zu(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Pu),this.material.uniforms.resolution.value.set(Pu.z,Pu.w))}},$u=class extends Mu{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},ed=class extends Qu{constructor(e=new $u,t=new Nu({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},td={};function nd(e){return Math.cbrt(Math.max(0,Math.min(.65,e)))}function rd(e,t){let n=nd(t),r=[];for(let t=1;t<=30;t++){let i=e*n**(t-1);if(i<.008)break;r.push({index:t,gain:i})}return r}var id=`sound-form/preset-v1`,ad=[{id:`pitch`,label:`Pitch`,group:`source`,min:55,max:1760,value:220,unit:`Hz`,scale:`log`,description:`Fundamental frequency. Lower pitch makes the line thicker by default.`},{id:`volume`,label:`Level`,group:`source`,min:0,max:.8,value:.35,unit:`%`,description:`Output level before the master limiter.`},{id:`harmonics`,label:`Harmonics`,group:`source`,min:0,max:1,value:0,unit:`%`,description:`Adds up to 96 harmonics to the fundamental.`},{id:`detune`,label:`Detune`,group:`source`,min:0,max:40,value:0,unit:`ct`,description:`Separates a pair of voices in pitch.`},{id:`noise`,label:`Noise`,group:`source`,min:0,max:1,value:0,unit:`%`,description:`Blends filtered noise into the tone.`},{id:`cutoff`,label:`High cutoff`,group:`source`,min:20,max:18e3,value:18e3,unit:`Hz`,scale:`log`,description:`Upper edge of the pass band. Frequencies above it fade out.`},{id:`cutoffLow`,label:`Low cutoff`,group:`source`,min:20,max:18e3,value:20,unit:`Hz`,scale:`log`,description:`Lower edge of the pass band. Frequencies below it fade out.`},{id:`resonance`,label:`Resonance`,group:`source`,min:.1,max:16,value:.1,unit:`dB`,scale:`log`,description:`Boosts frequency bands near the low and high cutoffs.`},{id:`drive`,label:`Drive`,group:`source`,min:0,max:1,value:0,unit:`%`,description:`Soft saturation before the filter.`},{id:`width`,label:`Stereo width`,group:`source`,min:0,max:1,value:0,unit:`%`,description:`Spreads the paired voices across the stereo field.`},{id:`attack`,label:`Attack`,group:`contour`,min:.005,max:1.6,value:.01,unit:`s`,scale:`log`,description:`Time to rise from silence to full level.`},{id:`decay`,label:`Decay`,group:`contour`,min:.02,max:2,value:.12,unit:`s`,scale:`log`,description:`Time to settle from full level to sustain.`},{id:`sustain`,label:`Sustain`,group:`contour`,min:0,max:1,value:1,unit:`%`,description:`Level held after the decay.`},{id:`hold`,label:`Hold`,group:`contour`,min:.1,max:2,value:.65,unit:`s`,description:`Time at the sustain level before release.`},{id:`release`,label:`Release`,group:`contour`,min:.02,max:3,value:.08,unit:`s`,scale:`log`,description:`Time to return from sustain to silence.`},{id:`motion`,label:`Tremolo`,group:`contour`,min:0,max:.8,value:0,unit:`%`,description:`Periodic movement in amplitude.`},{id:`rate`,label:`Motion rate`,group:`contour`,min:.2,max:100,value:3,unit:`Hz`,scale:`log`,description:`Speed of the amplitude movement.`},{id:`delayMix`,label:`Delay`,group:`space`,min:0,max:.55,value:0,unit:`%`,description:`Level of the first delayed impression.`},{id:`delayTime`,label:`Delay time`,group:`space`,min:.08,max:.85,value:.28,unit:`s`,description:`Time between repeats.`},{id:`feedback`,label:`Feedback`,group:`space`,min:0,max:.65,value:.3,unit:`%`,description:`Repeat persistence, with an expanded decay range.`},{id:`reverbMix`,label:`Reverb`,group:`space`,min:0,max:.65,value:0,unit:`%`,description:`Level of a diffuse reverberant space.`},{id:`reverbDecay`,label:`Reverb tail`,group:`space`,min:.2,max:4,value:1.8,unit:`s`,description:`Duration of the reverberant decay.`}],od=Object.fromEntries(ad.map(e=>[e.id,e])),sd=Object.freeze(Object.fromEntries(ad.map(e=>[e.id,e.value]))),cd=[{id:`spectralLow`,label:`Low-frequency fade`,description:`Attenuates inner frequency bands below a cutoff.`},{id:`spectralHigh`,label:`High-frequency fade`,default:1,description:`Attenuates outer frequency bands above a cutoff.`},{id:`spectralPeak`,label:`Cutoff resonance`,description:`Crinkles frequency-band lines near each cutoff.`},{id:`thickness`,label:`Line thickness`,description:`Width of the primary white line.`},{id:`body`,label:`Body / expansion`,description:`Radial size of the filament structure.`},{id:`grain`,label:`Grain`,description:`Fine displacement and particles.`},{id:`twist`,label:`Twist`,description:`Turns of the filaments along the sound.`},{id:`detail`,label:`Filament detail`,description:`Visible high-frequency structure.`},{id:`edge`,label:`Ridges`,description:`Concentrated edges around the body.`},{id:`brightness`,label:`Luminance`,description:`Intensity of the sculpture.`},{id:`spread`,label:`Stereo spread`,description:`Separation of the two voice structures.`},{id:`onset`,label:`Leading taper`,description:`Extent of the attack region.`},{id:`decayShape`,label:`Body slope`,description:`Extent of the decay region.`},{id:`plateau`,label:`Body fullness`,description:`Fullness after the initial peak.`},{id:`length`,label:`Held length`,description:`Extent of the sustain region.`},{id:`tail`,label:`Trailing taper`,description:`Extent of the release region.`},{id:`motion`,label:`Ripple depth`,description:`Periodic variation along the form.`},{id:`rate`,label:`Ripple frequency`,description:`Number of periodic variations.`},{id:`echoes`,label:`Echo impressions`,description:`Strength of repeated whole sculptures.`},{id:`echoSpacing`,label:`Echo spacing`,description:`Separation between impressions.`},{id:`persistence`,label:`Echo persistence`,description:`How long successive impressions remain.`},{id:`halo`,label:`Diffuse halo`,description:`A fine cloud around the form.`},{id:`haloTail`,label:`Halo extent`,description:`Extent of the reverberant cloud.`}],ld=[[`pitch`,`thickness`],[`harmonics`,`body`],[`noise`,`grain`],[`detune`,`twist`],[`cutoff`,`spectralHigh`],[`resonance`,`spectralPeak`],[`volume`,`brightness`],[`width`,`spread`],[`attack`,`onset`],[`decay`,`decayShape`],[`sustain`,`plateau`],[`hold`,`length`],[`release`,`tail`],[`motion`,`motion`],[`rate`,`rate`],[`delayMix`,`echoes`],[`delayTime`,`echoSpacing`],[`feedback`,`persistence`],[`reverbMix`,`halo`],[`reverbDecay`,`haloTail`]].map(([e,t],n)=>({id:`route-${n}`,source:e,target:t,amount:1,invert:e===`pitch`&&t===`thickness`,curve:1,smoothing:.08}));ld.push({id:`route-drive`,source:`drive`,target:`edge`,amount:.45,invert:!1,curve:1,smoothing:.08}),ld.push({id:`route-cutoff-low`,source:`cutoffLow`,target:`spectralLow`,amount:1,invert:!1,curve:1,smoothing:.08});var ud=(e,t=0,n=1)=>Math.max(t,Math.min(n,e)),dd=e=>e.attack+e.decay+e.hold+e.release;function fd(e,t){return t<0?0:t<e.attack?t/e.attack:(t-=e.attack,t<e.decay?1-(1-e.sustain)*t/e.decay:(t-=e.decay,t<e.hold?e.sustain:(t-=e.hold,t<e.release?e.sustain*(1-t/e.release):0)))}function pd(e){let t=e.delayTime*rd(e.delayMix,e.feedback).length;return dd(e)+Math.max(t,e.reverbMix>0?e.reverbDecay:0)}function md(e){if(e?.schema===`sound-sculpt/visual-preset-v2`&&(e={...e,schema:id,params:e.params?{...e.params,pitch:sd.pitch}:e.params,routes:Array.isArray(e.routes)?e.routes.map(e=>e?.source===`notePitch`?{...e,source:`pitch`}:e):e.routes}),!e||e.schema!==`sound-form/preset-v1`)throw Error(`This file is not a Sound/Sculpt v1 preset.`);if(!e.params||!Array.isArray(e.routes)||e.routes.length>100)throw Error(`Missing sound parameters or valid connections.`);let t=!Object.hasOwn(e.params,`cutoffLow`),n={};for(let r of ad){let i=r.id===`cutoffLow`&&t?20:e.params[r.id];if(typeof i!=`number`||!Number.isFinite(i)||i<r.min||i>r.max)throw Error(`Invalid ${r.label.toLowerCase()} value.`);n[r.id]=i}if(n.cutoffLow>n.cutoff)throw Error(`Low cutoff must not exceed high cutoff.`);let r=e.routes.map((e,n)=>{if(!e||!Object.hasOwn(od,e.source)||!cd.some(t=>t.id===e.target))throw Error(`Unknown endpoint in connection ${n+1}.`);if(!Number.isFinite(e.amount)||Math.abs(e.amount)>2||!Number.isFinite(e.curve)||e.curve<.2||e.curve>4||!Number.isFinite(e.smoothing)||e.smoothing<0||e.smoothing>2||typeof e.invert!=`boolean`)throw Error(`Invalid settings in connection ${n+1}.`);return{id:`import-${n}`,source:e.source,target:t&&e.amount===1&&!e.invert&&e.curve===1&&e.smoothing===.08?e.source===`cutoff`&&e.target===`detail`?`spectralHigh`:e.source===`resonance`&&e.target===`edge`?`spectralPeak`:e.target:e.target,amount:e.amount,curve:e.curve,smoothing:e.smoothing,invert:e.invert}});return t&&r.some(e=>e.target===`spectralHigh`&&e.source===`cutoff`)&&!r.some(e=>e.source===`cutoffLow`)&&r.push({...ld.find(e=>e.source===`cutoffLow`)}),{schema:id,name:typeof e.name==`string`?e.name.slice(0,60):`Untitled`,params:n,routes:r}}({...sd});var hd=`sound-form:session:v1`,gd=e=>`sculpt:${e}`;function _d(e=[]){return Array.isArray(e)?e.flatMap(e=>{if(typeof e?.libraryId!=`string`||!e.libraryId)return[];try{return[{...md(e),libraryId:e.libraryId}]}catch{return[]}}):[]}function vd(e){try{return _d(JSON.parse(e.getItem(hd))?.saved)}catch{return[]}}function yd(e,t){let n=new Map(_d(e).map(e=>[e.libraryId,e]));for(let e of _d(t))n.set(e.libraryId,e);return[...n.values()]}function bd(e){return{label:e.name,db:0,oct:0,root:69+12*Math.log2(e.params.pitch/440),sculpt:structuredClone(e)}}function xd(e,t){let n=48+t;return n+12*Math.round((e-n)/12)}var Sd=`vertex.session.v1`,Cd=`vertex.intro.seen.v1`,wd=Number.isFinite,Td=(e,t)=>Array.isArray(e)&&e.length===t&&e.every(wd);function Ed(e){return e&&Number.isInteger(e.id)&&e.id>0&&typeof e.name==`string`&&typeof e.sound==`string`&&Array.isArray(e.bottom)&&e.bottom.length>=2&&e.bottom.length<=256&&e.bottom.every(e=>Td(e,3))&&Array.isArray(e.top)&&e.top.length===e.bottom.length&&e.top.every(e=>Td(e,3))&&Td(e.quat,4)&&Td(e.scale,3)&&e.scale.every(e=>e!==0)&&Array.isArray(e.notes)&&e.notes.length<=4096&&e.notes.every(e=>wd(e.f)&&wd(e.y))&&wd(e.dy)&&(e.anchor===null||Td(e.anchor,2))}function Dd(e){return e?.revision===1&&Array.isArray(e.shapes)&&e.shapes.length<=1e3&&e.shapes.every(Ed)&&new Set(e.shapes.map(e=>e.id)).size===e.shapes.length&&e.settings&&wd(e.settings.bpm)&&e.settings.bpm>=60&&e.settings.bpm<=180&&Number.isInteger(e.settings.key)&&e.settings.key>=0&&e.settings.key<=11&&Number.isInteger(e.settings.mode)&&e.settings.mode>=0&&e.settings.mode<=6&&e.view&&Td(e.view.target,3)&&[e.view.radius,e.view.theta,e.view.phi].every(wd)&&e.view.radius>0&&[`3d`,`top`].includes(e.view.mode)&&e.view.top&&[e.view.top.cx,e.view.top.cz,e.view.top.h].every(wd)&&e.view.top.h>0&&Number.isInteger(e.plane)&&e.plane>=-3&&e.plane<=5&&wd(e.bars)}function Od(e){let t;try{if(t=e.getItem(Sd),!t)return null;let n=JSON.parse(t);if(Dd(n))return n}catch{}if(t)try{e.setItem(`${Sd}:recovery`,t)}catch{}return null}function kd(e,t){if(!Dd(t))return!1;try{return e.setItem(Sd,JSON.stringify(t)),!0}catch{return!1}}function Ad(e){try{return e.getItem(Cd)===`1`}catch{return!1}}function jd(e){try{e.setItem(Cd,`1`)}catch{}}var Md=(e,t,n)=>Math.round((e-n/2)/t);function Nd(e,t,n){let r=Math.floor(e/7),i=e-r*7;return t+12*r+n[i]}function Pd(e,t,n=!0){let r=0;for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length];t[i]=n||i<e.length-1?Math.hypot(o.x-a.x,o.z-a.z):0,r+=t[i]}return r}var Fd=e=>(e-=Math.floor(e),e<.5?e*2:2-e*2);function Id(e,t){let n=e.length,r=[];if(t){for(let t=0;t<n;t++)r.push({t:e[t],k:t,seg:(t-1+n)%n});return r}for(let t=0;t<n;t++)r.push({t:e[t]/2,k:t,seg:t?t-1:0});for(let t=n-2;t>=1;t--)r.push({t:1-e[t]/2,k:t,seg:t});return r}function Ld(e,t,n,r){let i=e.length,a=!1;for(let o=0;o<i;o++){let s=e[o],c=t[o];Math.abs(c.y-s.y-n)<1e-6||(r&&r.has(o+i)&&!r.has(o)?s.y=c.y-n:c.y=s.y+n,a=!0)}return a}function Rd(e,t,n){let r=Math.max(1,Math.round(n*16)),i=(-t*e/(2*Math.PI)%1+1)%1;return Math.round(i*r)%r/r}function zd(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r.x*i.z-i.x*r.z}return t>=0?1:-1}function Bd(e,t){let n=[];return e.forEach((e,r)=>{t?n.push({t:(e%1+1)%1,k:r}):(n.push({t:e/2,k:r}),e>1e-6&&e<1-1e-6&&n.push({t:1-e/2,k:r}))}),n}function Vd(e,t,n,r){if(!(t>0))return 0;let i=Math.round(e*t/n)*n;return i=r?(i%t+t)%t:Math.min(t,Math.max(0,i)),i/t}function Hd(e,t,n){let r=t.length;if(r===1)return t[0].y;for(let n=0;n<r-1;n++){let r=t[n],i=t[n+1];if(e>=r.f&&e<=i.f)return i.f-r.f>1e-9?r.y+(i.y-r.y)*(e-r.f)/(i.f-r.f):r.y}let i=t[0],a=t[r-1];if(!n)return e<i.f?i.y:a.y;let o=i.f+1-a.f,s=e>=a.f?e-a.f:e+1-a.f;return o>1e-9?a.y+(i.y-a.y)*s/o:a.y}jt.enabled=!1;var z=e=>document.getElementById(e),Ud=(e,t,n)=>Math.min(n,Math.max(t,e)),B=(e=0,t=0,n=0)=>new P(e,t,n),Wd=e=>e*e*(3-2*e),Gd=.25,Kd=.1,qd=[[`LYDIAN`,`DUR`,[0,2,4,6,7,9,11]],[`IONIAN`,`DUR`,[0,2,4,5,7,9,11]],[`MIXOLYDIAN`,`DUR`,[0,2,4,5,7,9,10]],[`DORIAN`,`MOLL`,[0,2,3,5,7,9,10]],[`AEOLIAN`,`MOLL`,[0,2,3,5,7,8,10]],[`PHRYGIAN`,`MOLL`,[0,1,3,5,7,8,10]],[`LOCRIAN`,`MOLL`,[0,1,3,5,6,8,10]]],Jd=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`],Yd={stem_kick:{label:`KICK`,stem:`kick`,db:-.7,oct:0},stem_clap:{label:`CLAP`,stem:`clap`,db:4.1,oct:0},stem_cymbal:{label:`CYMBAL`,stem:`cymbal`,db:4.1,oct:0},stem_synth:{label:`SYNTH`,stem:`synth`,db:1.7,oct:-12,root:53},stem_bass:{label:`BASS`,stem:`bass`,db:-3.6,oct:-24,root:34}},Xd=[{key:`ink`,hex:`#17121C`,label:`KICK`,sounds:[`stem_kick`]},{key:`coral`,hex:`#EE7A6B`,label:`CLAP`,sounds:[`stem_clap`]},{key:`sand`,hex:`#A8915F`,label:`CYMBAL`,sounds:[`stem_cymbal`]},{key:`lime`,hex:`#D4E30A`,label:`SYNTH`,sounds:[`stem_synth`]},{key:`cobalt`,hex:`#3D5BD9`,label:`BASS`,sounds:[`stem_bass`]}],Zd={};Xd.forEach(e=>e.sounds.forEach(t=>Zd[t]=e));var Qd=e=>Yd[e]?.sculpt?{key:`sculpt`,hex:`#7355bc`,label:Yd[e].label,sounds:[e]}:Zd[e]??Xd[3],$d=Od(localStorage),ef=vd(localStorage),tf=yd($d?.instruments,ef);for(let e of tf)Yd[gd(e.libraryId)]=bd(e);var nf={};for(let e of new Set(Object.values(Yd).map(e=>e.stem).filter(Boolean)))nf[e]=td[e]?Promise.resolve(Uint8Array.from(atob(td[e]),e=>e.charCodeAt(0)).buffer):fetch(`./stems/${e}.wav`).then(e=>{if(!e.ok)throw Error(`${e.status} ${e.url}`);return e.arrayBuffer()});var V={key:0,mode:1,bpm:120,mirror:!0,trackpad:!1,snap:!0},rf=()=>240/V.bpm,af={haloStr:2.5,haloSize:.68,pathW:1,pathA:.18,beadSize:7,connW:.4,satRest:.54,satFull:1.5,field:.44,bg:.86,milkDen:.56,milkMax:.25,warm:.15,milkBlur:.4,rim:3.9,shadow:.23,shadowOff:0,organA:.48,drift:.64,organBlur:.25,veil:.37,organFlare:1,restCol:1,starSize:.95,starInner:.28,starArm:.32,starThick:.8,layers:3,layerGap:.22,starEdge:2.2,litFade:.23,floor:0,dotSize:9.5,lit:1.05,trail:1,trailW:11,inkBlur:2.2,bleed:1.25,core:4.1,pool:1,focusBlur:.1},H={...af};function of(){try{localStorage.setItem(`vertex.fx.v1`,JSON.stringify(H))}catch{}}var sf={};function cf(e,t){return e.getHSL(sf),e.setHSL(sf.h,Ud(sf.s*t,0,1),sf.l),e}var lf=e=>e>.004?Ud(20*2**(e*8),20,8e3):10,uf={step:2*Gd,thick:.5,light:.12},df={start:4,span:8},ff=()=>uf.step*7,pf={plane:0,y:0},mf={lo:-3,hi:5},hf=e=>Math.floor(e/ff()+1e-4),gf=e=>Md(e,uf.step,uf.thick),_f=e=>Yd[e].root??48+V.key+Yd[e].oct,vf=e=>Yd[e].sculpt?xd(Yd[e].root,V.key):48+V.key+Yd[e].oct;function yf(e,t=0){return Nd(gf(e.noteWorldY(t)),vf(e.sound),qd[V.mode][2])}var bf=e=>Jd[(e%12+12)%12]+(Math.floor(e/12)-1);function xf(e,t){if(t!==void 0)return yf(e,t)-vf(e.sound);let n=e.notes.map((e,t)=>t).filter(t=>!e.notes[t].mute);if(!n.length)return yf(e)-vf(e.sound);let r=0;for(let t of n)r+=yf(e,t);return r/n.length-vf(e.sound)}var Sf={};function Cf(e,t,n=new F){return n.set(e),n.getHSL(Sf),n.setHSL(Sf.h,Sf.s,Ud(Sf.l+Ud(t,-12,24)/12*uf.light,.04,.94)),n}var wf=new F(`#cccccb`),Tf={ivory:new F(`#f1f2ea`),warm:new F(`#b59c7c`),rim:new F(`#6d6878`),lav:new F(`#7e7a9e`)},Ef=z(`c`),U=new Fs({canvas:Ef,antialias:!0,preserveDrawingBuffer:!1});U.setPixelRatio(Math.min(devicePixelRatio,2)),U.setSize(innerWidth,innerHeight),U.outputColorSpace=He,U.toneMapping=0;var Df=new Is,Of=new Is,kf=new ui(38,innerWidth/innerHeight,.03,300),Af=new Ii(-1,1,1,-1,.1,400),jf=kf;function Mf(e){jf=e}var Nf=new Set;function Pf(e){let t=new Nu({worldUnits:!1,...e});return t.resolution.set(innerWidth,innerHeight),Nf.add(t),t}function Ff(e){Nf.delete(e),e.dispose()}var If=(()=>{let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.35,`rgba(255,255,255,.55)`),n.addColorStop(.7,`rgba(255,255,255,.12)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new wc(e)})(),Lf={type:g,depthBuffer:!0,colorSpace:``},Rf,zf,Bf,Vf,Hf,Uf,Wf,Gf,Kf,qf,Jf,Yf,Xf,Zf,Qf,$f,ep,tp,np,rp;function ip(){let e=U.getDrawingBufferSize(new M),t=e.x,n=e.y,r=(e=0)=>new Jt(t,n,{...Lf,depthBuffer:!1,samples:e}),i=()=>new Jt(Math.max(2,t>>1),Math.max(2,n>>1),{...Lf,depthBuffer:!1});[Rf,zf,Bf,Vf,Hf,Uf,Wf,Gf,Kf,qf,Jf,Yf,Xf,Zf,Qf,$f,ep,tp,np,rp].forEach(e=>e&&e.dispose()),rp=r(4),Zf=new Jt(t,n,{...Lf,samples:4}),Qf=i(),$f=i(),ep=i(),tp=i(),np=i(),Rf=new Jt(t,n,Lf),zf=new Jt(Math.max(2,t>>1),Math.max(2,n>>1),{...Lf,depthBuffer:!1}),Bf=new Jt(Math.max(2,t>>1),Math.max(2,n>>1),{...Lf,depthBuffer:!1}),Vf=r(),Hf=r(4),Uf=r(),Wf=r(),Gf=r(4),Kf=r(),qf=r(),Jf=r(4),Yf=new Jt(Math.max(2,t>>1),Math.max(2,n>>1),{...Lf,depthBuffer:!1}),Xf=new Jt(Math.max(2,t>>1),Math.max(2,n>>1),{...Lf,depthBuffer:!1})}ip();var ap=new nc(new Uint8Array(4),1,1);ap.needsUpdate=!0;var op=new ai({uniforms:{uRef:{value:0}},vertexShader:`uniform float uRef; varying float vZ; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vZ = -mv.z - uRef; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying float vZ; void main(){ gl_FragColor = vec4(gl_FrontFacing ? -vZ : vZ, 0.0, 0.0, 1.0); }`,side:2,depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendEquation:100,blendSrc:201,blendDst:201,blendSrcAlpha:201,blendDstAlpha:201}),sp=new Ii(-1,1,1,-1,0,1),cp=new I(new Ti(2,2)),lp=new Is;lp.add(cp);var up=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,dp=new ai({uniforms:{tex:{value:null},dir:{value:new M},texel:{value:new M},radius:{value:1}},vertexShader:up,depthTest:!1,depthWrite:!1,fragmentShader:`
    uniform sampler2D tex; uniform vec2 dir; uniform vec2 texel; uniform float radius; varying vec2 vUv;
    void main(){
      vec2 o1 = dir * texel * 1.3846153846 * radius, o2 = dir * texel * 3.2307692308 * radius;
      vec4 c = texture2D(tex, vUv) * 0.2270270270;
      c += (texture2D(tex, vUv + o1) + texture2D(tex, vUv - o1)) * 0.3162162162;
      c += (texture2D(tex, vUv + o2) + texture2D(tex, vUv - o2)) * 0.0702702703;
      gl_FragColor = c;
    }`}),fp=new ai({uniforms:{uGrey:{value:.8}},vertexShader:up,depthTest:!1,depthWrite:!1,fragmentShader:`uniform float uGrey; void main(){ gl_FragColor = vec4(uGrey, uGrey, uGrey * 0.985, 1.0); }`}),pp=new ai({uniforms:{tBase:{value:null},tT:{value:null},tTb:{value:null},tO:{value:ap},tIb:{value:ap},texel:{value:new M},uIvory:{value:Tf.ivory},uWarmC:{value:Tf.warm},uRimC:{value:Tf.rim},uLav:{value:Tf.lav},milkDen:{value:1},milkMax:{value:1},warm:{value:1},rim:{value:1},shadow:{value:1},shadowOff:{value:0},veil:{value:0},bleed:{value:0}},vertexShader:up,depthTest:!1,depthWrite:!1,fragmentShader:`
    uniform sampler2D tBase, tT, tTb, tO, tIb; uniform vec2 texel; uniform vec3 uIvory, uWarmC, uRimC, uLav;
    uniform float milkDen, milkMax, warm, rim, shadow, shadowOff, veil, bleed; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tBase, vUv).rgb;
      float Tb = max(texture2D(tTb, vUv).r, 0.0), m = 1.0 - exp(-Tb * milkDen);
      float Ts = max(texture2D(tTb, vUv + vec2(-1.0, 1.0) * shadowOff * texel).r, 0.0);
      c = mix(c, uLav, (1.0 - exp(-Ts * milkDen * 2.0)) * shadow * (1.0 - m));     // lavender shadow, outside the milk
      vec3 milk = mix(uIvory, uWarmC, 1.0 - exp(-Tb * warm));                       // warmer where thick / where forms overlap
      c = mix(c, milk, m * milkMax);
      vec4 o = texture2D(tO, vUv);
      if (o.a > 1e-4) { vec3 oc = o.rgb / o.a; oc = mix(oc, milk, veil * m); c = mix(c, oc, clamp(o.a, 0.0, 1.0)); }
      float e = abs(texture2D(tT, vUv + vec2(texel.x, 0.0)).r - texture2D(tT, vUv - vec2(texel.x, 0.0)).r)
              + abs(texture2D(tT, vUv + vec2(0.0, texel.y)).r - texture2D(tT, vUv - vec2(0.0, texel.y)).r);
      c = mix(c, uRimC, clamp(e * rim, 0.0, 1.0) * 0.55);                            // rim: every silhouette, also those behind
      vec4 ib = texture2D(tIb, vUv) * bleed; c = c * (1.0 - clamp(ib.a, 0.0, 1.0)) + ib.rgb;
      gl_FragColor = vec4(c, 1.0);
    }`}),mp=new ai({uniforms:{tSharp:{value:null},tBlur:{value:null},uSoft:{value:.8}},vertexShader:up,depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205,fragmentShader:`
    uniform sampler2D tSharp, tBlur; uniform float uSoft; varying vec2 vUv;
    void main(){
      vec4 s = texture2D(tSharp, vUv), b = texture2D(tBlur, vUv);
      vec4 c = mix(s, b, uSoft);
      c += b * 0.18 * (1.0 - c.a);          // a little extra bloom-bleed beyond the silhouette
      gl_FragColor = c;
    }`}),hp=new Cr({color:16777215,side:2,depthTest:!1,depthWrite:!1}),gp=new ai({uniforms:{tSharp:{value:null},tBlur:{value:null},tMask:{value:null},uAmt:{value:0}},vertexShader:up,depthTest:!1,depthWrite:!1,fragmentShader:`
    uniform sampler2D tSharp, tBlur, tMask; uniform float uAmt; varying vec2 vUv;
    void main(){
      float k = max(smoothstep(0.0, 0.5, texture2D(tMask, vUv).r), 1.0 - uAmt);
      gl_FragColor = vec4(mix(texture2D(tBlur, vUv).rgb, texture2D(tSharp, vUv).rgb, k), 1.0);
    }`}),_p={col:new F(`#e8641c`),act:new F(`#ffa64d`),w:1.6},vp=new Cr({color:16711680,side:2,depthTest:!1,depthWrite:!1}),yp=new ai({uniforms:{tMask:{value:null},texel:{value:new M},uW:{value:1},uCol:{value:_p.col},uAct:{value:_p.act}},vertexShader:up,depthTest:!1,depthWrite:!1,transparent:!0,fragmentShader:`
    uniform sampler2D tMask; uniform vec2 texel; uniform float uW; uniform vec3 uCol, uAct; varying vec2 vUv;
    void main(){
      vec2 c = texture2D(tMask, vUv).rg, m = vec2(0.0);
      for (int i = 0; i < 12; i++) {                 // the nearest silhouette within uW pixels, in 12 directions
        float a = float(i) * 0.5235988;
        m = max(m, texture2D(tMask, vUv + vec2(cos(a), sin(a)) * uW * texel).rg);
        m = max(m, texture2D(tMask, vUv + vec2(cos(a), sin(a)) * uW * 0.5 * texel).rg);
      }
      float a = m.r * (1.0 - c.r);                   // outside the form, next to it
      if (a < 0.01) discard;
      gl_FragColor = vec4(mix(uCol, uAct, step(0.5, m.g)), a);
    }`});function bp(e){cp.material=e,U.render(lp,sp)}function xp(e,t,n,r,i){dp.uniforms.tex.value=e.texture,dp.uniforms.dir.value.set(n,r),dp.uniforms.texel.value.set(1/t.width,1/t.height),dp.uniforms.radius.value=i,U.setRenderTarget(t),bp(dp)}function Sp(e,t,n,r){return r<.05?e:(xp(e,t,1,0,r),xp(t,n,0,1,r),xp(n,t,1,0,r*1.8),xp(t,n,0,1,r*1.8),n)}function Cp(e,t){jf.layers.set(t),U.setRenderTarget(e),U.setClearColor(0,0),U.clear(!0,!0,!0),U.render(Df,jf)}var wp=new ai({uniforms:{uCam:{value:B()},uFar:{value:40},uCol:{value:new F(`#77757f`)},uField:{value:.22}},transparent:!0,depthWrite:!1,extensions:{derivatives:!0},vertexShader:`varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
    uniform vec3 uCam; uniform float uFar; uniform vec3 uCol; uniform float uField; varying vec3 vW;
    float fwX, fwZ;
    float lineA(float c, float sp, float fw){ float d = abs(fract(c / sp + 0.5) - 0.5) * sp; return 1.0 - smoothstep(0.5 * fw, 1.4 * fw, d); }
    // dotted lines: dots at a fixed on-screen spacing, so they stay dotted at any distance
    float dash(float a, float sp, float fw){ float f = fract(a / (fw * 7.0)); return 1.0 - smoothstep(0.22, 0.42, abs(f - 0.5) * 2.0 * 0.5 + 0.0) ; }
    float dens(float sp, float fw){ return smoothstep(5.0, 14.0, sp / fw); }
    void main(){
      fwX = fwidth(vW.x); fwZ = fwidth(vW.z); float fw = max(fwX, fwZ);
      float a = 0.0;
      a = max(a, max(lineA(vW.x, 1.0, fwX) * dash(vW.z, 0.125, fwZ), lineA(vW.z, 1.0, fwZ) * dash(vW.x, 0.125, fwX)) * 0.16 * dens(1.0, fw));
      // field: a dot on every 1/16 inside every cell
      vec2 g = abs(fract(vW.xz / 0.25 + 0.5) - 0.5) * 0.25;
      a = max(a, (1.0 - smoothstep(0.8 * fw, 1.6 * fw, length(g))) * uField * smoothstep(3.0, 8.0, 0.25 / fw));
      // the common origin
      float o = (1.0 - smoothstep(fw, 2.0 * fw, abs(vW.x))) * step(abs(vW.z), 0.35) + (1.0 - smoothstep(fw, 2.0 * fw, abs(vW.z))) * step(abs(vW.x), 0.35);
      a = max(a, min(o, 1.0) * 0.7);
      a *= 1.0 - smoothstep(uFar * 0.45, uFar, length(vW.xz - uCam.xz));
      if (a < 0.003) discard;
      gl_FragColor = vec4(uCol, a);
    }`}),Tp=new I(new Ti(600,600).rotateX(-Math.PI/2),wp);Tp.position.y=-.002,Tp.layers.set(2),Tp.frustumCulled=!1,Df.add(Tp);var Ep=new ai({uniforms:{uCol:{value:new F(`#77757f`)},uAlpha:{value:0},uR:{value:8}},transparent:!0,depthWrite:!1,side:2,extensions:{derivatives:!0},vertexShader:`varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
    uniform vec3 uCol; uniform float uAlpha, uR; varying vec3 vW;
    void main(){
      float fw = max(fwidth(vW.x), fwidth(vW.z)), d = length(vW.xz);
      if (d > uR + 2.0 * fw) discard;
      float rim = 1.0 - smoothstep(0.6 * fw, 1.6 * fw, abs(d - uR));       // a crisp outline: where the octave level is
      float a = max(0.035, rim) * uAlpha;               // on a barely-there film
      if (a < 0.003) discard;
      gl_FragColor = vec4(uCol, a);
    }`}),Dp=Array.from({length:9},()=>{let e=new I(new Ti(1,1).rotateX(-Math.PI/2),Ep);return e.layers.set(2),e.frustumCulled=!1,e.visible=!1,Df.add(e),e}),Op=(()=>{let e=[];for(let t=0;t<=128;t++){let n=t/128*Math.PI*2;e.push(B(Math.cos(n)*df.start,.003,Math.sin(n)*df.start))}let t=new dc(new Lr().setFromPoints(e),new pl({color:7828863,dashSize:.18,gapSize:.14,transparent:!0,depthWrite:!1}));return t.computeLineDistances(),t.layers.set(2),t.frustumCulled=!1,Df.add(t),t})();function kp(e){Op.material.opacity=e,Op.visible=e>.01}function Ap(e,t,n,r,i,a,o){let s=0;for(let i=t;i<=n&&s<Dp.length;i++){if(i===r)continue;let t=Dp[s++];t.position.y=i*e,t.scale.set(2*a,1,2*a),t.visible=o>.01}for(;s<Dp.length;s++)Dp[s].visible=!1;Ep.uniforms.uR.value=a,Ep.uniforms.uAlpha.value=o,Tp.position.y=i-.002,Op.position.y=i}function jp(e,t,n=[]){Cp(Rf,1),xp(Rf,zf,1,0,2.6),xp(zf,Bf,0,1,2.6),xp(Bf,zf,1,0,4.8),xp(zf,Bf,0,1,4.8),op.uniforms.uRef.value=jf.position.length(),Cp(Hf,4);let r=Sp(Hf,Uf,Wf,H.milkBlur);Cp(Gf,5);let i=Sp(Gf,Kf,qf,H.organBlur);Cp(Jf,6);let a=Sp(Jf,Yf,Xf,H.inkBlur);U.setRenderTarget(Vf),U.setClearColor(wf,1),U.clear(!0,!0,!0),U.autoClear=!1,fp.uniforms.uGrey.value=H.bg,wp.uniforms.uField.value=H.field,bp(fp),wp.uniforms.uCam.value.copy(jf===Af?B(Af.position.x,0,Af.position.z):kf.position),wp.uniforms.uFar.value=jf===Af?400:16+kf.position.length()*.9,jf.layers.set(2),U.render(Df,jf),mp.uniforms.tSharp.value=Rf.texture,mp.uniforms.tBlur.value=Bf.texture,mp.uniforms.uSoft.value=e,bp(mp);let o=pp.uniforms;o.tBase.value=Vf.texture,o.tT.value=Hf.texture,o.tTb.value=r.texture,o.tO.value=i.texture,o.tIb.value=a.texture,o.texel.value.set(1/Hf.width,1/Hf.height);for(let e of[`milkDen`,`milkMax`,`warm`,`rim`,`shadow`,`veil`,`bleed`])o[e].value=H[e];o.shadowOff.value=H.shadowOff*U.getPixelRatio()*(jf===Af?1:1.6);let s=t&&t.amt>.01&&H.focusBlur>.01;if(U.setRenderTarget(s?Zf:null),U.clear(!0,!0,!0),bp(pp),U.clearDepth(),jf.layers.set(3),U.render(Df,jf),s){let e=t.obj,n=e.layers.mask;e.layers.set(7),Df.overrideMaterial=hp,Cp(ep,7),Df.overrideMaterial=null,e.layers.mask=n,xp(ep,tp,1,0,5),xp(tp,np,0,1,5),xp(np,tp,1,0,9),xp(tp,np,0,1,9);let r=1.5*H.focusBlur;xp(Zf,Qf,1,0,r),xp(Qf,$f,0,1,r),xp($f,Qf,1,0,2*r),xp(Qf,$f,0,1,2*r),xp($f,Qf,1,0,3*r),xp(Qf,$f,0,1,3*r);let i=gp.uniforms;i.tSharp.value=Zf.texture,i.tBlur.value=$f.texture,i.tMask.value=np.texture,i.uAmt.value=t.amt,U.setRenderTarget(null),bp(gp)}if(n.length){U.setRenderTarget(rp),U.setClearColor(0,0),U.clear(!0,!0,!0),jf.layers.set(8),Df.overrideMaterial=vp,[...n.filter(e=>!e.act),...n.filter(e=>e.act)].forEach(({obj:e,act:t})=>{let n=e.visible,r=e.layers.mask;e.visible=!0,e.layers.set(8),vp.color.setRGB(1,+!!t,0),U.render(Df,jf),e.visible=n,e.layers.mask=r}),Df.overrideMaterial=null;let e=yp.uniforms;e.tMask.value=rp.texture,e.texel.value.set(1/rp.width,1/rp.height),e.uW.value=_p.w*U.getPixelRatio(),U.setRenderTarget(null),bp(yp)}U.clearDepth(),jf.layers.set(0),U.render(Of,jf),U.autoClear=!0}var Mp=new F(`#ffffff`),Np=.35,Pp=new Rn,Fp={rust:new F(`#8a3b33`),lit:new F(`#e8714a`),pool:new F(`#6b2a2c`)},Ip=320,Lp=64,Rp={transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205},zp=()=>new ai({...Rp,uniforms:{uPR:{value:U.getPixelRatio()},uK:{value:1}},vertexShader:`attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC; uniform float uPR, uK;
    void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = max(1.5, aS * uK) * uPR; vA = aA; vC = aC; }`,fragmentShader:`varying float vA; varying vec3 vC;
    void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard; float a = vA * (1.0 - smoothstep(0.35, 1.0, r)); gl_FragColor = vec4(vC * a, a); }`}),Bp=new F(`#4b3b4b`),Vp=.125;function Hp(e,t,n,r){let i=.3+.12*e.distanceTo(t),a=1-n;return r.set(a*a*e.x+2*a*n*(e.x+t.x)/2+n*n*t.x,a*a*e.y+2*a*n*((e.y+t.y)/2+i)+n*n*t.y,a*a*e.z+2*a*n*(e.z+t.z)/2+n*n*t.z),r}var Up=(e,t=B())=>e.posAt(-e.phaseOff,t).applyMatrix4(e.group.matrixWorld),Wp=new ai({...Rp,uniforms:{uPR:{value:U.getPixelRatio()},uSize:{value:7},uRust:{value:Fp.rust},uPath:{value:Bp}},vertexShader:`attribute float aRest; varying float vRest; uniform float uPR, uSize;
    void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = uSize * uPR; vRest = aRest; }`,fragmentShader:`varying float vRest; uniform vec3 uRust, uPath;
    void main(){
      float r = length(gl_PointCoord - 0.5) * 2.0, a; vec3 c;
      if (vRest > 0.5) { a = (1.0 - smoothstep(0.86, 1.0, r)) * smoothstep(0.5, 0.64, r); c = uPath; }
      else { a = 1.0 - smoothstep(0.42, 0.58, r); c = uRust; }
      a *= 0.85; gl_FragColor = vec4(c * a, a);
    }`}),Gp=()=>new ai({...Rp,uniforms:{uPR:{value:U.getPixelRatio()},uSize:{value:8},uCol:{value:new F}},vertexShader:`uniform float uPR, uSize; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = uSize * uPR; }`,fragmentShader:`uniform vec3 uCol; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = 1.0 - smoothstep(0.8, 1.0, r); gl_FragColor = vec4(uCol * a, a); }`}),W=[],Kp=0,qp={};function Jp(e){return qp[e]=(qp[e]??-1)+1,qp[e]===0?e:`${e}.${String(qp[e]).padStart(3,`0`)}`}var Yp=class{constructor(e){this.id=e.id??++Kp,Kp=Math.max(Kp,this.id),this.name=e.name,this.bottom=e.bottom.map(e=>B(...e)),this.top=e.top.map(e=>B(...e)),this.n=this.bottom.length,this.sound=Yd[e.sound]?e.sound:`stem_synth`,this.mute=!!e.mute,this.open=new Set(e.open??[]),this.closed=e.closed??!0,this.tracks=e.tracks?{...e.tracks}:{},delete this.tracks.height,this.below=e.below??null,this.anchor=e.anchor?[...e.anchor]:null,this.dy=e.dy??0,this.fx={...Om(),...e.fx??{}},this.fxRate={...km(),...e.fxRate??{}},this.feat=null,this.stack=[this],this.stackIdx=0,this.stackActive=!0,this.localPh=0,this.phaseOff=0,this.stS=0,this.stL=1,this.base=B(),this.rootAnchor=[0,0],this.editSel=new Set([...Array(this.n*2).keys()]),this.noteSel=new Set,this.flare=0,this.flareTau=.1,this.flareCol=new F,this.cur=new F,this.focus=1,this.L=new Float32Array(this.n),this.perim=1,this.ringL=Array.from({length:this.n},()=>B()),this.ringW=Array.from({length:this.n},()=>B()),this.ringKey=``;let t=this.group=new ws;e.quat&&t.quaternion.fromArray(e.quat),e.scale&&t.scale.fromArray(e.scale),t.userData.shape=this,Xp(this),this.mesh=new I(new Lr,new Cr({side:2})),this.mesh.visible=!1,this.mesh.userData.shape=this,t.add(this.mesh),this.milk=new I(this.mesh.geometry,op),this.milk.layers.set(4),this.milk.frustumCulled=!1,t.add(this.milk),this.halo=new ec(new Bs({map:If,transparent:!0,depthWrite:!1,opacity:.5})),this.halo.renderOrder=1,this.halo.layers.set(1),t.add(this.halo),this.floor=new I(new Ti(1,1).rotateX(-Math.PI/2),new Cr({map:If,transparent:!0,depthWrite:!1,opacity:.4})),this.floor.renderOrder=0,this.floor.layers.set(1),Df.add(this.floor);let n=()=>{let e=new $u;return e.setPositions([0,0,0,1,0,0]),e};this.soft=new ed(n(),Pf({linewidth:12,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!1})),this.soft.renderOrder=4,this.soft.layers.set(1),this.soft.frustumCulled=!1,t.add(this.soft),this.path=new Qu(new Mu,Pf({color:Bp,linewidth:1,transparent:!0,opacity:.2,depthWrite:!1})),this.path.layers.set(3),this.path.frustumCulled=!1,t.add(this.path),this.beads=new Sc(new Lr,Wp),this.beads.layers.set(3),this.beads.renderOrder=7,this.beads.frustumCulled=!1,t.add(this.beads);let r=new Lr;r.setAttribute(`position`,new kr([0,0,0],3)),this.dot=new Sc(r,Gp());let i=new Lr;i.setAttribute(`position`,new Er(new Float32Array(1155),3)),i.setAttribute(`aA`,new Er(new Float32Array(385),1)),i.setAttribute(`aS`,new Er(new Float32Array(385),1)),i.setAttribute(`aC`,new Er(new Float32Array(1155),3)),this.ink=new Sc(i,zp()),this.ink.layers.set(6),this.ink.frustumCulled=!1,t.add(this.ink),this.inkCore=new Sc(i,zp()),this.inkCore.layers.set(3),this.inkCore.renderOrder=8,this.inkCore.frustumCulled=!1,t.add(this.inkCore),this.lit=0,this.pool=new Float32Array(Lp),this.dot.renderOrder=9,this.dot.layers.set(3),this.dot.frustumCulled=!1,t.add(this.dot),zm(this),this.chain=null,Df.add(t),this.rebuild(),t.updateMatrixWorld(!0),this.measure(),this.notes=e.notes?e.notes.map(e=>({f:e.f,y:e.y,mute:!!e.mute})):this.cornerNotes(this.open),this.buildMotionLines()}cornerNotes(e){let t=this.cum();return[...new Set(Id(t,this.closed).filter(t=>!e.has(t.seg)).map(e=>e.k))].sort((e,t)=>e-t).map(e=>({f:t[e],y:this.ringL[e].y,mute:!1}))}vert(e){return e<this.n?this.bottom[e]:this.top[e-this.n]}rebuild(){let e=this.n,t=this.bottom,n=this.top,r=0;for(let n=0;n<e;n++){let i=(n+1)%e;r+=t[n].x*t[i].z-t[i].x*t[n].z}let i=r>=0?1:-1,a=[],o=[],s=B(),c=B(),l=B(),u=(e,t,n,r,i)=>{s.subVectors(t,e),c.subVectors(n,e),l.crossVectors(s,c),l.dot(i)<0&&([t,n]=[n,t]);for(let r of[e,t,n])a.push(r.x,r.y,r.z);o.push(r)};if(this.closed){let e=al.triangulateShape(t.map(e=>new M(e.x,e.z)),[]),r=B(0,1,0),i=B(0,-1,0);for(let[a,o,s]of e)u(t[a],t[o],t[s],0,i),u(n[a],n[o],n[s],1,r)}for(let r=0;r<this.segs();r++){let a=(r+1)%e,o=B((t[a].z-t[r].z)*i,0,-(t[a].x-t[r].x)*i);u(t[r],t[a],n[a],2+r,o),u(t[r],n[a],n[r],2+r,o)}let d=new Lr;d.setAttribute(`position`,new kr(a,3)),d.computeBoundingSphere(),d.computeBoundingBox(),this.mesh.geometry.dispose(),this.mesh.geometry=d,this.milk.geometry=d,this.triFace=o,this.minB=Math.min(...t.map(e=>e.y)),this.maxT=Math.max(...n.map(e=>e.y))}measure(){let e=this.n,t=this.group.matrixWorld,n=this.bottom,r=this.top;for(let i=0;i<e;i++)this.ringL[i].lerpVectors(n[i],r[i],.5),this.ringW[i].copy(this.ringL[i]).applyMatrix4(t);this.perim=Pd(this.ringW,this.L,this.closed),this.phaseOff=Rd(Pp.setFromQuaternion(this.group.quaternion,`YXZ`).y,zd(n),this.loopBars());let i=this.group.getWorldScale(B()),a=(Math.abs(i.x)+Math.abs(i.z))/2,o=Math.abs(i.y),s=B(),c=B();n.forEach(e=>s.add(e)),r.forEach(e=>c.add(e)),s.divideScalar(e),c.divideScalar(e);let l=new Float32Array(e),u=0,d=0;for(let t=0;t<e;t++)u+=Math.hypot(n[t].x-s.x,n[t].z-s.z),l[t]=(r[t].y-n[t].y)*o,d+=l[t];u=Math.max(.02,u/e*a);let f=d/e,p=this.rootAnchor,m=Math.hypot(p[0],p[1]),h=s.clone().lerp(c,.5).applyMatrix4(t);this.feat={r:u,dist:m,Hm:f,centre:B(p[0]*Np,h.y,p[1]*Np),room:Ud((m-df.start)/df.span,0,1)}}segs(){return this.closed?this.n:this.n-1}loopBars(){return(this.closed?this.perim:2*this.perim)/4}cum(){let e=new Float32Array(this.n),t=0;for(let n=0;n<this.n;n++)e[n]=this.perim>1e-9?t/this.perim:n/Math.max(1,this.segs()),t+=this.L[n];return e}hits(){return Bd(this.notes.map(e=>e.f),this.closed)}ringAt(e,t){let n=Ud(e,0,1)*this.perim;for(let e=0;e<this.n;e++){let r=this.L[e];if(n<=r||e===this.n-1)return t.lerpVectors(this.ringL[e],this.ringL[(e+1)%this.n],r>1e-9?Ud(n/r,0,1):0);n-=r}return t.copy(this.ringL[0])}notePos(e,t){return this.ringAt(this.notes[e].f,t),t.y=this.notes[e].y,t}noteWorldY(e){return this.notes[e]?this.notePos(e,B()).applyMatrix4(this.group.matrixWorld).y:this.ringW[0].y}posAt(e,t){return e-=Math.floor(e),this.pathAt(this.closed?e:Fd(e),t)}pathAt(e,t){this.pathF||this.updateLines();let n=this.pathF,r=this.pathP;for(let i=0;i<n.length-1;i++)if(e<=n[i+1]||i===n.length-2)return t.lerpVectors(r[i],r[i+1],n[i+1]-n[i]>1e-9?Ud((e-n[i])/(n[i+1]-n[i]),0,1):0);return t.copy(r[0])}lightUp(e){Vm(this,e),this.lit=1,e<Lp&&(this.pool[e]=1)}lightClear(){Hm(this),this.lit=0,this.pool.fill(0)}hit(e,t){let n=!this.mute&&nh.ctx?nh.note(this,t,e):0;eh.push({t,s:this,i:e,semis:xf(this,e),dur:n})}updateLines(){let e=this.ringL,t=this.notes??[],n=e.map(e=>e.x.toFixed(4)+e.y.toFixed(4)+e.z.toFixed(4)).join()+`|`+t.map(e=>`${e.f.toFixed(5)},${e.y.toFixed(4)},${+e.mute}`).join(`;`)+`|`+this.closed;if(n===this.ringKey&&this.pathF)return;this.ringKey=n;let r=this.cum(),i=t.map(e=>({f:e.f,y:e.y})).sort((e,t)=>e.f-t.f),a=[];e.forEach((e,t)=>a.push({f:r[t],p:e.clone().setY(i.length?Hd(r[t],i,this.closed):e.y)})),t.forEach((e,t)=>a.push({f:e.f,p:this.notePos(t,B())})),a.sort((e,t)=>e.f-t.f),this.closed&&a.push({f:1,p:a[0].p.clone()}),this.pathF=Float32Array.from(a.map(e=>e.f)),this.pathP=a.map(e=>e.p);let o=[];this.pathP.forEach(e=>o.push(e.x,e.y,e.z)),this.soft.geometry.dispose(),this.soft.geometry=new $u,this.soft.geometry.setPositions(o);let s=[];for(let e=0;e<this.pathP.length-1;e++){let t=this.pathP[e],n=this.pathP[e+1];s.push(t.x,t.y,t.z,n.x,n.y,n.z)}this.path.geometry.dispose(),this.path.geometry=new Mu,this.path.visible=s.length>0,s.length&&this.path.geometry.setPositions(s);let c=new Lr().setFromPoints(t.map((e,t)=>this.notePos(t,B())));c.setAttribute(`aRest`,new kr(t.map(e=>+!!e.mute),1)),this.beads.geometry.dispose(),this.beads.geometry=c}update(e,t,n,r,i){this.updateLines();let a=Cf(Qd(this.sound).hex,xf(this),this._vivid??=new F),o=(this._pale??=new F).copy(a).lerp(Mp,1-H.satRest);this.flare*=Math.exp(-e/Math.max(.01,this.flareTau));let s=this.flare;this.cur.copy(o).lerp(this.flareCol,s);let c=+(J===`edit`?this===q:hf(this.dy)===pf.plane);this.focus=e>0?this.focus+(c-this.focus)*(1-Math.exp(-e/.06)):c,cf(this.cur,this.focus);let l=this.mute?.9:this.stackActive?0:.38;this.idle=l>0,Um(this,e,l>0,r);let u=this.feat,d=this.group.scale,f=B();this.bottom.forEach(e=>f.add(e)),this.top.forEach(e=>f.add(e)),f.divideScalar(this.n*2),this.halo.position.copy(f);let p=(u.r*3.4+u.Hm*.8)*(.7+.8*u.room)*H.haloSize;this.halo.scale.set(p/Math.abs(d.x||1),p/Math.abs(d.y||1),1),this.halo.material.color.copy(this.cur),this.halo.material.opacity=Math.min(1,(.15+.6*u.room)*(1-l*.7)*H.haloStr)*i,this.halo.visible=i>.01&&u.room>.005;let m=this.stackIdx===0;if(this.floor.visible=m&&i>.01&&H.floor>.005,this.floor.visible){this.floor.position.set(this.group.position.x,.004,this.group.position.z);let e=u.r*3.6*H.haloSize;this.floor.scale.set(e,1,e),this.floor.material.color.copy(this.cur),this.floor.material.opacity=Math.min(1,.42*H.haloStr)*H.floor*i*(this.stack.some(e=>!e.idle)?1:.5)}if(this.milk.visible=this.closed,this.soft.visible=!this.closed,this.soft.material.color.copy(this.cur),this.soft.material.opacity=l?.22:.95,this.soft.material.linewidth=12+s*6,this.path.material.opacity=(t?n?.9:.6:H.pathA)*(l?.5:1),this.path.material.linewidth=H.pathW*(t?n?1.85:1.45:1),Wp.uniforms.uSize.value=H.beadSize,this.dot.visible=this.stackActive&&!this.mute,this.dot.visible&&this.posAt(this.localPh-this.phaseOff,this.dot.position),this.updateInk(e),this.chain&&nh.ctx){let e=this.chain,t=u.centre,n=nh.ctx.currentTime;e.p.positionX?(e.p.positionX.value=t.x,e.p.positionY.value=t.y,e.p.positionZ.value=t.z):e.p.setPosition(t.x,t.y,t.z);let r=om(this);for(let t of[`dry`,`rev`,`dly`])e[t].gain.setTargetAtTime(r[t],n,.08);e.hp.frequency.setTargetAtTime(r.hp,n,.05),nh.fxSync(this)}}updateInk(e){this.lit*=Math.exp(-e/Math.max(.01,H.litFade));let t=H.pool*rf()/4;for(let n=0;n<Lp;n++)this.pool[n]*=t>.01?Math.exp(-e/t):0;let n=Math.min(1,this.lit*H.lit),r=this.dot.visible,i=this.dot.material.uniforms;i.uSize.value=H.dotSize*(1+.45*n),i.uCol.value.copy(Fp.rust).lerp(Fp.lit,n);let a=this.ink.geometry.attributes,o=B(),s=this._inkCol??=new F,c=this.localPh-this.phaseOff,l=H.trail/4/Math.max(.001,this.loopBars()),u=this.stack.length>1?this.stack[(this.stackIdx-1+this.stack.length)%this.stack.length]:null,d=u&&(this._inv??=new On).copy(this.group.matrixWorld).invert();for(let e=0;e<Ip;e++){let t=e/Ip,i=t*l-this.localPh;if(u&&i>0){let e=i*this.loopBars()*4;e<Vp?Hp(Up(u,this._a??=B()),Up(this,this._b??=B()),1-e/Vp,o):u.posAt(1-(e-Vp)/4/Math.max(.001,u.loopBars())-u.phaseOff,o).applyMatrix4(u.group.matrixWorld),o.applyMatrix4(d)}else this.posAt(c-t*l,o);a.position.setXYZ(e,o.x,o.y,o.z),a.aA.setX(e,r&&H.trail>0?(1-t)**1.3:0),a.aS.setX(e,H.trailW*(1-.55*t)),s.copy(Fp.rust).lerp(Fp.lit,n*Math.max(0,1-t*4)),a.aC.setXYZ(e,s.r,s.g,s.b)}for(let e=0;e<Lp;e++){let t=Ip+e,n=e<this.notes.length,r=n?this.notePos(e,o):o;a.position.setXYZ(t,r.x,r.y,r.z),a.aA.setX(t,n?this.pool[e]*.9:0),a.aS.setX(t,H.trailW*2.4),a.aC.setXYZ(t,Fp.pool.r,Fp.pool.g,Fp.pool.b)}let f=this.dot.position;s.copy(Fp.rust).lerp(Fp.lit,n),a.position.setXYZ(384,f.x,f.y,f.z),a.aA.setX(384,r?.55+.4*n:0),a.aS.setX(384,H.dotSize*2.4*(1+.8*n)),a.aC.setXYZ(384,s.r,s.g,s.b);for(let e in a)a[e].needsUpdate=!0;this.inkCore.material.uniforms.uK.value=H.core/Math.max(.1,H.trailW)}applyTracks(e){let t=this.tracks.verts;if(t&&!x_(this,`verts`)){let n=Zp(t,e);t.idx.forEach((e,t)=>this.vert(e).set(n(t*3),n(t*3+1),n(t*3+2))),this.rebuild()}let n=this.tracks.notes;if(n&&!x_(this,`notes`)){let t=Zp(n,e);n.idx.forEach((e,n)=>{let r=this.notes[e];if(!r)return;let i=t(n*2);r.f=this.closed?i-Math.floor(i):Ud(i,0,1),r.y=t(n*2+1)})}}buildMotionLines(){for(let e of[this.mlVerts,this.mlObj])e&&(e.parent?.remove(e),e.geometry.dispose(),e.material.dispose());this.mlVerts=this.mlObj=null;let e=()=>new rc({color:1511964,transparent:!0,opacity:.35,depthWrite:!1}),t=this.tracks.verts;if(t){let n=[];t.idx.forEach((e,r)=>t.frames.forEach((e,i)=>{let a=t.frames[(i+1)%t.frames.length];n.push(e[r*3],e[r*3+1],e[r*3+2],a[r*3],a[r*3+1],a[r*3+2])}));let r=new Lr;r.setAttribute(`position`,new kr(n,3)),this.mlVerts=new hc(r,e()),this.mlVerts.layers.set(3),this.group.add(this.mlVerts)}let n=this.tracks.obj;if(n){let t=n.frames.map(e=>B(e[0],e[1]+.003,e[2]));this.mlObj=new gc(new Lr().setFromPoints(t),e()),this.mlObj.layers.set(3),Df.add(this.mlObj)}}serialize(){return{id:this.id,name:this.name,bottom:this.bottom.map(e=>e.toArray()),top:this.top.map(e=>e.toArray()),quat:this.group.quaternion.toArray(),scale:this.group.scale.toArray(),sound:this.sound,mute:this.mute,closed:this.closed,open:[...this.open],notes:this.notes.map(e=>({...e})),tracks:{...this.tracks},fx:{...this.fx},fxRate:{...this.fxRate},below:this.below,anchor:this.anchor?[...this.anchor]:null,dy:this.dy}}applyData(e){e.bottom.forEach((e,t)=>this.bottom[t].fromArray(e)),e.top.forEach((e,t)=>this.top[t].fromArray(e)),this.group.quaternion.fromArray(e.quat),this.group.scale.fromArray(e.scale),this.sound=e.sound,this.mute=e.mute,this.closed=e.closed??!0,this.open=new Set(e.open??[]),this.notes=(e.notes??[]).map(e=>({f:e.f,y:e.y,mute:!!e.mute})),this.tracks=e.tracks?{...e.tracks}:{},this.below=e.below??null,this.anchor=e.anchor?[...e.anchor]:null,this.dy=e.dy??0,this.fx={...Om(),...e.fx??{}},this.fxRate={...km(),...e.fxRate??{}},Xp(this),this.rebuild(),this.buildMotionLines(),this.ringKey=``}dispose(){Df.remove(this.group),Df.remove(this.floor),this.mlObj&&(Df.remove(this.mlObj),this.mlObj.geometry.dispose(),this.mlObj.material.dispose()),[this.path,this.soft].forEach(e=>Ff(e.material)),this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&!(e.material instanceof Nu)&&e.material!==op&&e.material!==Wp&&e.material.dispose()}),this.floor.geometry.dispose(),this.floor.material.dispose(),this.chain&&Object.values(this.chain).forEach(e=>{try{e.disconnect()}catch{}})}};function Xp(e,t){return Ld(e.bottom,e.top,uf.thick/Math.max(1e-6,Math.abs(e.group.scale.y)),t)}function Zp(e,t){let n=e.frames.length,r=(t/e.len%1+1)%1*n,i=Math.floor(r)%n,a=(i+1)%n,o=r-Math.floor(r),s=e.frames[i],c=e.frames[a];return e=>s[e]+(c[e]-s[e])*o}function Qp(e,t,n){let r=t/(2*Math.sin(Math.PI/e)),i=[],a=[];for(let t=0;t<e;t++){let o=Math.PI/2+Math.PI/e+2*Math.PI*t/e;i.push([Math.cos(o)*r,0,Math.sin(o)*r]),a.push([Math.cos(o)*r,n,Math.sin(o)*r])}return{bottom:i,top:a}}var $p=e=>e.map(e=>({f:e,y:uf.thick/2,mute:!1})),em=(e,t,n)=>Qp(e,t*4/e,n);function tm(e,t,n){let r=[[-e/2,0,-t/2],[e/2,0,-t/2],[e/2,0,t/2],[-e/2,0,t/2]];return{bottom:r,top:r.map(e=>[e[0],n,e[2]])}}var nm={3:`Triangle`,4:`Square`,5:`Pentagon`,6:`Hexagon`,7:`Heptagon`,8:`Octagon`,9:`Nonagon`,10:`Decagon`,12:`Dodecagon`,16:`Sixteen`},rm=e=>nm[e]??`${e}-Gon`;function im(e,t){if(t=Ud(Math.round(t),3,16),t===e.n||!e.closed)return e;let n=e.bottom,r=0;for(let t=0;t<e.n;t++){let i=(t+1)%e.n;r+=Math.hypot(n[i].x-n[t].x,n[i].z-n[t].z)}let i=B();n.forEach(e=>i.add(e)),i.divideScalar(e.n);let a=e.serialize();Object.assign(a,Qp(t,r/t,uf.thick),{open:[]}),a.tracks&&(a.tracks={...a.tracks},delete a.tracks.verts),a.bottom.forEach(e=>{e[0]+=i.x,e[2]+=i.z}),a.top.forEach(e=>{e[0]+=i.x,e[2]+=i.z});let o=e.name.replace(/\.\d{3}$/,``);return(Object.values(nm).includes(o)||/^\d+-Gon$/.test(o)||o===`Cube`)&&(a.name=Jp(rm(t))),am(e,a)}function am(e,t){let n=W.indexOf(e),r=K.has(e),i=q===e;e.dispose(),K.delete(e);let a=new Yp(t);return n>=0?W.splice(n,1,a):W.push(a),r&&K.add(a),i&&Ph(a),fm(),a}function om(e){let t=e.feat;return{dry:1-.4*t.room,rev:.85*t.room,dly:.75*e.fx.echo,hp:lf(e.fx.lowcut)}}function sm(e){let t=new Yp(e);return W.push(t),fm(),t}function cm(e){let t=um.get(e.id);t&&(t.below=e.below,e.below??(t.anchor=e.anchor));let n=W.indexOf(e);n>=0&&W.splice(n,1),K.delete(e),q===e&&Ph(null),e.dispose(),fm()}var lm=new Map,um=new Map,dm=[];function fm(){lm=new Map(W.map(e=>[e.id,e])),um=new Map,W.forEach(e=>{e.below!=null&&!lm.has(e.below)&&(e.below=null)}),W.forEach(e=>{e.below!=null&&(um.has(e.below)?e.below=null:um.set(e.below,e))}),W.forEach(e=>{let t=new Set([e]),n=e;for(;n.below!=null;){let e=lm.get(n.below);if(!e||t.has(e)){um.delete(n.below),n.below=null;break}t.add(e),n=e}}),dm=W.filter(e=>e.below==null).map(e=>{let t=[e],n=e;for(let e=0;e<999;e++){let e=um.get(n.id);if(!e)break;t.push(e),n=e}return t}),dm.forEach(e=>e.forEach((t,n)=>{t.stack=e,t.stackIdx=n,n&&(t.anchor=null)})),dm.forEach(e=>{e[0].anchor||(e[0].anchor=bm(e,0,0))})}var pm=e=>e.stack[0],mm=Gd;function hm(e){let t=B(),n=[1/0,-1/0,1/0,-1/0];return e.bottom.forEach(r=>{t.copy(r).multiply(e.group.scale).applyQuaternion(e.group.quaternion),n[0]=Math.min(n[0],t.x),n[1]=Math.max(n[1],t.x),n[2]=Math.min(n[2],t.z),n[3]=Math.max(n[3],t.z)}),n}function gm(e,t,n){let r=wm(e);return e.map((e,i)=>{let a=hm(e);return{p:hf(e.dy),b:[a[0]+t+r[i],a[1]+t+r[i],a[2]+n,a[3]+n]}})}var _m=(e,t,n=0,r=0)=>e.p===t.p&&e.b[0]+n<t.b[1]+mm&&t.b[0]<e.b[1]+n+mm&&e.b[2]+r<t.b[3]+mm&&t.b[2]<e.b[3]+r+mm,vm=null;function ym(){if(!vm){vm=[];for(let e=-64;e<=64;e++)for(let t=-64;t<=64;t++)vm.push([e*Gd,t*Gd]);vm.sort((e,t)=>Math.hypot(...e)-Math.hypot(...t))}return vm}function bm(e,t,n){let r=[];dm.forEach(t=>{t[0].anchor&&!t.includes(e[0])&&r.push(...gm(t,...t[0].anchor))}),t=Math.round(t/Gd)*Gd,n=Math.round(n/Gd)*Gd;let i=gm(e,t,n);for(let[e,a]of ym())if(i.every(t=>r.every(n=>!_m(t,n,e,a))))return[t+e,n+a];return[t,n]}var xm=e=>{let t=e.stack[0].anchor??[0,0];return[t[0]+wm(e.stack)[e.stackIdx],t[1]]};function Sm(e){let t=gm(e,...e[0].anchor);dm.forEach(n=>{!n.includes(e[0])&&n[0].anchor&&gm(n,...n[0].anchor).some(e=>t.some(t=>_m(e,t)))&&(n[0].anchor=bm(n,...n[0].anchor))})}var Cm=.5;function wm(e){let t=0,n=0;return e.map((e,r)=>{let i=e.mesh.geometry.boundingBox,a=Math.abs(e.group.scale.x);return r&&i&&(t=n+Cm-i.min.x*a),i&&(n=t+i.max.x*a),t})}function Tm(e){dm.forEach(t=>{let n=t[0],r=n.anchor[0],i=n.anchor[1],a=wm(t);t.forEach((t,o)=>{let s=t.group.scale.y,c=a[o];if(t.rootAnchor=n.anchor,t.base.set((r+c)*e,t.dy-t.minB*s,i*e),!x_(t,`obj`)){t.group.position.copy(t.base);let e=t.tracks.obj;if(e){let n=Zp(e,Hv-Kd/rf());t.group.position.add(B(n(0),n(1),n(2))),t.group.quaternion.set(n(3),n(4),n(5),n(6)).normalize(),t.group.scale.set(n(7),n(8),n(9))}}t.group.updateMatrixWorld(!0)})})}var Em=[[`comp`,`COMPRESSOR`,!1],[`dist`,`DISTORTION`,!1],[`crush`,`BITCRUSHER`,!1],[`chorus`,`CHORUS`,!0],[`flanger`,`FLANGER`,!0],[`phaser`,`PHASER`,!0],[`echo`,`ECHO`,!1],[`lowcut`,`LOW CUT`,!1]],Dm=[.25,.5,1,2,4],Om=()=>({comp:0,dist:0,crush:0,chorus:0,flanger:0,phaser:0,echo:0,lowcut:0}),km=()=>({chorus:1,flanger:2,phaser:4}),Am=32,jm=3,Mm={transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205},Nm=new F(`#efefea`),Pm=new F(`#ffffff`),Fm=`
  uniform float uTime, uDrift, uSeed, uComp, uPha, uPhaPh, uFlg, uFlgPh, uCho, uChoPh, uDist, uCrush, uLift, uHalfH;
  uniform vec3 uC; uniform float uArmA[${Am}]; uniform float uArmF[${Am}]; uniform int uArms; uniform float uArmW;
  varying vec3 vN; varying vec3 vV; varying float vFl; varying float vY;
  float h1(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  void main(){
    // the arm this vertex belongs to: it flares when its corner plays
    float th = atan(position.z, position.x), fl = 0.0;
    for (int i = 0; i < ${Am}; i++) {
      if (i >= uArms) break;
      float d = abs(mod(th - uArmA[i] + 3.14159265, 6.2831853) - 3.14159265);
      fl = max(fl, uArmF[i] * exp(-d * d / (2.0 * uArmW * uArmW)));
    }
    vFl = fl; vY = position.y / uHalfH;                                                             // -1 bottom … 1 top
    vec4 w = modelMatrix * vec4(position, 1.0);
    w.y += uLift;                                                                                          // echo copies
    vec3 q = w.xyz - uC;
    float t = uTime;
    q += vec3(sin(t * 1.1 + w.y * 9.0 + uSeed), sin(t * 0.8 + w.z * 7.0 + uSeed * 1.7), sin(t * 0.9 + w.x * 8.0 + uSeed * 2.3)) * 0.018 * uDrift;
    float k = clamp(uComp, 0.0, 0.9); q.xz *= 1.0 - k * 0.35; q.y *= 1.0 - k * 0.3;                         // compressor: squeeze
    q.xz *= 1.0 + uFlg * 0.3 * sin(6.2832 * (length(q.xz) * 2.0 - uFlgPh));                                 // flanger: travelling bands
    float ang = uPha * 1.2 * sin(6.2832 * (length(q.xz) * 1.25 + uPhaPh));                                   // phaser: twist
    float ca = cos(ang), sa = sin(ang); q.xz = vec2(ca * q.x - sa * q.z, sa * q.x + ca * q.z);
    q.xz += uCho * 0.05 * vec2(cos(6.2832 * uChoPh + uSeed), sin(6.2832 * uChoPh + uSeed));                  // chorus: sway
    float st = floor(uTime * 20.0);
    q += (vec3(h1(position + st), h1(position.yzx + st * 1.3), h1(position.zxy + st * 1.7)) - 0.5) * uDist * 0.06;   // distortion
    w.xyz = uC + q;
    float cell = uCrush * 0.1; if (cell > 0.003) w.xyz = floor(w.xyz / cell + 0.5) * cell;                  // bitcrusher
    vec4 mv = viewMatrix * w; gl_Position = projectionMatrix * mv;
    vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal);
    vV = isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(-mv.xyz);
  }`,Im=`
  uniform vec3 uCol, uFlareCol, uPale; uniform float uA, uRest, uEdge, uLow;
  varying vec3 vN; varying vec3 vV; varying float vFl; varying float vY;
  void main(){
    if (vY < uLow * 2.0 - 1.0) discard;                                                // low cut: the bottom is cut away
    float ndv = abs(dot(normalize(vN), normalize(vV)));
    float a = uA * (0.1 + 0.9 * pow(1.0 - ndv, uEdge)) * smoothstep(0.0, 0.05, ndv) * (0.85 + 0.15 * vFl);
    vec3 c = mix(mix(uPale, uCol, uRest), uFlareCol, vFl);
    gl_FragColor = vec4(c * a, a);
  }`;function Lm(e){return new ai({vertexShader:Fm,fragmentShader:Im,...Mm,uniforms:{uTime:{value:0},uDrift:{value:0},uSeed:{value:e},uC:{value:new P},uLift:{value:0},uComp:{value:0},uPha:{value:0},uPhaPh:{value:0},uFlg:{value:0},uFlgPh:{value:0},uCho:{value:0},uChoPh:{value:0},uDist:{value:0},uCrush:{value:0},uLow:{value:0},uHalfH:{value:1},uArmA:{value:new Float32Array(Am)},uArmF:{value:new Float32Array(Am)},uArms:{value:0},uArmW:{value:.3},uCol:{value:new F},uFlareCol:{value:new F},uPale:{value:Nm},uA:{value:1},uRest:{value:1},uEdge:{value:2}}})}function Rm(e,t,n,r){let i=new ll(1,192,48),a=i.attributes.position;for(let i=0;i<a.count;i++){let o=a.getX(i),s=a.getY(i),c=a.getZ(i),l=Math.atan2(c,o),u=t,d=0,f=0;for(let r of e){let e=Math.abs(((l-r.ang+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI),i=Math.exp(-(e*e)/(2*n*n)),a=t+(r.len-t)*i;a>u&&(u=a),i>f&&(f=i,d=r.dy*i)}a.setXYZ(i,o*u,s*r+d,c*u)}return i.computeVertexNormals(),i}function zm(e){let t=new ws;t.layers.set(5),e.group.add(t),e.star={group:t,key:``,layers:[],echoes:[],arms:[],armFl:new Float32Array(Am)}}function Bm(e){let t=e.star,n=e.ringL,r=e.n,i=e.ringKey+`|`+[H.starInner,H.starArm,Math.round(H.layers),H.starThick,e.closed].join();if(i===t.key||(t.key=i,[...t.layers,...t.echoes].forEach(e=>{t.group.remove(e),e.material.dispose()}),t.geo&&t.geo.dispose(),t.layers=[],t.echoes=[],t.geo=null,!e.closed))return;let a=new P;n.forEach(e=>a.add(e)),a.divideScalar(r),t.arms=e.notes.map((t,n)=>({nt:t,k:n,p:e.notePos(n,new P)})).filter(e=>!e.nt.mute).map(({k:e,p:t})=>({k:e,ang:Math.atan2(t.z-a.z,t.x-a.x),len:Math.hypot(t.x-a.x,t.z-a.z),dy:t.y-a.y})).slice(0,Am);let o=n.reduce((e,t)=>e+Math.hypot(t.x-a.x,t.z-a.z),0)/r,s=(e.maxT-e.minB)/2*H.starThick;t.geo=Rm(t.arms,H.starInner*o,H.starArm,Math.max(s,.001)),t.centre=a,t.halfH=s;let c=Math.max(1,Math.round(H.layers));for(let n=0;n<c+jm;n++){let r=new I(t.geo,Lm(e.id*1.7+n*.7));r.layers.set(5),r.frustumCulled=!1,r.position.copy(a);let i=r.material.uniforms;i.uArms.value=t.arms.length,t.arms.forEach((e,t)=>i.uArmA.value[t]=e.ang),t.group.add(r),(n<c?t.layers:t.echoes).push(r)}}function Vm(e,t){let n=e.star.arms.findIndex(e=>e.k===t);n>=0&&(e.star.armFl[n]=1)}function Hm(e){e.star.armFl.fill(0)}function Um(e,t,n,r){Bm(e);let i=e.star,a=e.fx,o=e.fxRate;if(!i.layers.length)return;let s=cf(Cf(Qd(e.sound).hex,xf(e),i.col??=new F),e.focus),c=(i.flareCol??=new F).copy(s).lerp(Pm,.35),l=Math.max(.01,H.litFade*1.6);for(let e=0;e<i.arms.length;e++)i.armFl[e]*=Math.exp(-t/l);let u=e.chain?.fx?-e.chain.fx.comp.reduction:0;e.compEnv=Math.max(Ud(u/10,0,1),(e.compEnv??0)*.86);let d=e=>(r/o[e]%1+1)%1,f=H.drift*nh.level(e),p=i.centre.clone().applyMatrix4(e.group.matrixWorld),m=i.layers.length,h=e.group.getWorldScale(new P),g=a.echo>.005;[...i.layers,...i.echoes].forEach((t,r)=>{let o=r>=m,l=r-m+1;if(t.visible=!o||g,!t.visible)return;let u=o?1:Math.max(.05,1-r*H.layerGap);t.scale.set(H.starSize*u,u,H.starSize*u);let _=t.material.uniforms;_.uTime.value=Wv,_.uHalfH.value=Math.max(i.halfH,.001),_.uDrift.value=f,_.uC.value.copy(p),_.uLift.value=o?a.echo*.45*(i.halfH*2+.3)*Math.abs(h.y)*l:0,_.uA.value=H.organA*(o?.5**l*Math.min(1,a.echo*4):m>1?.6+.4*r/(m-1):1)*(n?.4:1),_.uRest.value=H.restCol,_.uEdge.value=H.starEdge,_.uArmW.value=H.starArm,_.uCol.value.copy(s),_.uFlareCol.value.copy(c);for(let e=0;e<i.arms.length;e++)_.uArmF.value[e]=i.armFl[e]*H.organFlare;_.uComp.value=a.comp*(.3+.7*e.compEnv),_.uCho.value=a.chorus,_.uChoPh.value=d(`chorus`),_.uFlg.value=a.flanger,_.uFlgPh.value=d(`flanger`),_.uPha.value=a.phaser,_.uPhaPh.value=d(`phaser`),_.uDist.value=a.dist,_.uCrush.value=a.crush,_.uLow.value=a.lowcut*.9})}var Wm=18e3;function Gm(e,t=48e3){let n=Math.min(Wm,t*.499),r=Math.max(20,Math.min(n,e.cutoff??18e3));return{low:Math.max(20,Math.min(r,e.cutoffLow??20)),high:r,resonance:Math.max(.1,Math.min(16,e.resonance??.1)),sampleRate:t}}var Km=(e,t)=>e===1?1:t/e**(1.1+(1-t)*1.5),qm=[1,2,3,4,5,6,7,8,9,10,11,12,14,16,19,23,28,34,41,50,61,74,88,96];qm.map((e,t)=>({center:e,partials:Array.from({length:96},(e,t)=>t+1).filter(e=>{let n=0;for(let t=1;t<qm.length;t++)Math.abs(e-qm[t])<Math.abs(e-qm[n])&&(n=t);return n===t})}));function Jm(e,t,{held:n=!1,releaseAt:r=null,releaseLevel:i=0}={}){return t<0?0:r===null?n&&t>=e.attack+e.decay?e.sustain:fd(e,t):i*ud(1-(t-r)/e.release)}function Ym(e,t,{held:n=!1,releaseAt:r=null,releaseLevel:i=0}={}){if(r!==null)return[{time:r+e.release,value:0}].filter(e=>e.time>t);let a=[{time:e.attack,value:1},{time:e.attack+e.decay,value:e.sustain}];return n||a.push({time:e.attack+e.decay+e.hold,value:e.sustain},{time:dd(e),value:0}),a.filter(e=>e.time>t)}var Xm=.02;function Zm(e,t=.72){let n=e.createGain(),r=e.createDynamicsCompressor();return n.gain.value=t,r.threshold.value=-12,r.knee.value=8,r.ratio.value=12,r.attack.value=.003,r.release.value=.15,n.connect(r).connect(e.destination),n}function Qm(e){let t=new Float32Array(2048),n=1+e*18;for(let r=0;r<t.length;r++){let i=r/(t.length-1)*2-1;t[r]=e<.001?i:Math.tanh(i*n)/Math.tanh(n)}return t}var $m=class e{constructor(){this.context=null,this.voices=new Set,this.impulses=new Map,this.waves=new Map,this.muted=!1}async init(){if(!this.context){let e=window.AudioContext||window.webkitAudioContext;if(!e)throw Error(`This browser does not support Web Audio.`);this.context=new e,this.master=Zm(this.context,this.muted?0:.72)}await this.context.resume()}now(){return this.context?.currentTime??0}setMuted(e){this.muted=e,this.master&&this.master.gain.setTargetAtTime(e?0:.72,this.now(),Xm)}impulse(e){let t=this.context,n=e.toFixed(1);if(this.impulses.has(n))return this.impulses.get(n);let r=Math.ceil(t.sampleRate*Number(n)),i=t.createBuffer(2,r,t.sampleRate),a=43;for(let e=0;e<2;e++){let t=i.getChannelData(e);for(let e=0;e<r;e++)a=Math.imul(a,1664525)+1013904223>>>0,t[e]=(a/4294967296*2-1)*(1-e/r)**2.8*.7}return this.impulses.set(n,i),this.impulses.size>20&&this.impulses.delete(this.impulses.keys().next().value),i}wave(e){let t=e.toFixed(3);if(this.waves.has(t))return this.waves.get(t);let n=new Float32Array(97),r=new Float32Array(97);r[1]=1;for(let t=2;t<97;t++)r[t]=Km(t,e);let i=this.context.createPeriodicWave(n,r);return this.waves.set(t,i),this.waves.size>32&&this.waves.delete(this.waves.keys().next().value),i}defer(e,t,n){let r=setTimeout(()=>{e.tasks.delete(r),this.voices.has(e)&&!e.stopping&&t()},n);return e.tasks.add(r),r}async trigger(e,{held:t=!1}={}){await this.init();let n=this.context,r={...e},i=n.currentTime+.015,a={start:i,params:r,nodes:[],sources:[],pitchedSources:[],tones:[],tasks:new Set,held:t,released:!1,releaseAt:null,releaseLevel:0,stopping:!1};a.own=e=>(a.nodes.push(e),e);let o=a.own;a.input=o(n.createGain()),a.envelope=o(n.createGain()),a.level=o(n.createGain()),a.amp=o(n.createGain()),a.output=o(n.createGain()),a.filters={low:o(n.createBiquadFilter()),high:o(n.createBiquadFilter())},a.filters.low.type=`highpass`,a.filters.high.type=`lowpass`;let s=Gm(r,n.sampleRate);a.filters.low.frequency.value=s.low,a.filters.high.frequency.value=s.high;for(let e of Object.values(a.filters))e.Q.value=s.resonance;a.drive=this.makeDrive(a,r.drive),a.drive.gate.gain.value=1,a.filters.low.connect(a.filters.high).connect(a.envelope).connect(a.amp).connect(a.output).connect(a.level).connect(this.master),a.output.gain.value=.52,a.level.gain.value=r.volume,a.amp.gain.value=1-r.motion/2;let c=this.wave(r.harmonics);for(let e=0;e<2;e++){let t=e?1:-1,s=o(n.createOscillator()),l=o(n.createGain()),u=o(n.createStereoPanner());s.setPeriodicWave(c),s.frequency.value=r.pitch,s.detune.value=t*r.detune/2,l.gain.value=(1-r.noise)*.5,u.pan.value=t*r.width*.85,s.connect(l).connect(u).connect(a.input),s.start(i),a.sources.push(s),a.pitchedSources.push(s),a.tones.push({osc:s,gain:l,pan:u,sign:t})}r.noise>0&&this.ensureNoise(a,i),r.motion>0&&this.ensureMotion(a,i),r.delayMix>0&&this.ensureDelay(a,!0),r.reverbMix>0&&this.ensureReverb(a,!0);let l=a.envelope.gain;return l.setValueAtTime(0,i),l.linearRampToValueAtTime(1,i+r.attack),l.linearRampToValueAtTime(r.sustain,i+r.attack+r.decay),t||(l.setValueAtTime(r.sustain,i+r.attack+r.decay+r.hold),l.linearRampToValueAtTime(0,i+dd(r))),this.voices.add(a),this.refreshLifetime(a),a}makeDrive(e,t){let n=e.own(this.context.createWaveShaper()),r=e.own(this.context.createGain());return n.curve=Qm(t),n.oversample=`2x`,r.gain.value=0,e.input.connect(n).connect(r).connect(e.filters.low),{shaper:n,gate:r}}replaceDrive(e){let t=this.now(),n=e.drive,r=this.makeDrive(e,e.params.drive);e.drive=r,n.gate.gain.setTargetAtTime(0,t,Xm),r.gate.gain.setTargetAtTime(1,t,Xm),this.defer(e,()=>{try{e.input.disconnect(n.shaper)}catch{}for(let t of[n.shaper,n.gate]){t.disconnect();let n=e.nodes.indexOf(t);n>=0&&e.nodes.splice(n,1)}},120),e.lastDrive=t}queueDrive(e){e.driveTask&&(clearTimeout(e.driveTask),e.tasks.delete(e.driveTask));let t=Math.max(0,.04-(this.now()-(e.lastDrive??-1/0)));t?e.driveTask=this.defer(e,()=>{e.driveTask=null,this.replaceDrive(e)},t*1e3):this.replaceDrive(e)}ensureNoise(e,t=this.now()){if(e.noise)return;if(!this.noiseBuffer){let e=this.context,t=e.createBuffer(2,e.sampleRate*2,e.sampleRate);for(let e=0;e<2;e++){let n=t.getChannelData(e);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1}this.noiseBuffer=t}let n=e.own(this.context.createBufferSource()),r=e.own(this.context.createGain());n.buffer=this.noiseBuffer,n.loop=!0,r.gain.value=t===e.start?e.params.noise*.65:0,n.connect(r).connect(e.input),n.start(t),e.sources.push(n),e.noise={source:n,gain:r}}ensureMotion(e,t=this.now()){if(e.motion)return;let n=e.own(this.context.createOscillator()),r=e.own(this.context.createGain());n.frequency.value=e.params.rate,r.gain.value=t===e.start?e.params.motion/2:0,n.connect(r).connect(e.amp.gain),n.start(t),e.sources.push(n),e.motion={source:n,depth:r}}ensureDelay(e,t=!1){if(e.delay)return;let n=e.own(this.context.createDelay(1)),r=e.own(this.context.createGain()),i=e.own(this.context.createGain());n.delayTime.value=e.params.delayTime,r.gain.value=nd(e.params.feedback),i.gain.value=t?e.params.delayMix:0,e.output.connect(n),n.connect(r).connect(n),n.connect(i).connect(e.level),e.delay={node:n,feedback:r,wet:i}}ensureReverb(e,t=!1){if(e.reverb)return;let n=e.own(this.context.createGain()),r=[];n.gain.value=t?e.params.reverbMix:0,n.connect(e.level);for(let t=0;t<2;t++){let i=e.own(this.context.createConvolver()),a=e.own(this.context.createGain());i.buffer=this.impulse(e.params.reverbDecay),a.gain.value=+!t,e.output.connect(i).connect(a).connect(n),r.push({convolver:i,gain:a})}e.reverb={wet:n,banks:r,active:0,decay:e.params.reverbDecay.toFixed(1),lastChange:this.now()}}queueReverb(e){if(!e.reverb||e.reverb.decay===e.params.reverbDecay.toFixed(1))return;e.reverbTask&&(clearTimeout(e.reverbTask),e.tasks.delete(e.reverbTask));let t=()=>{let t=e.reverb,n=t.banks[t.active],r=t.banks[1-t.active],i=this.now();r.convolver.buffer=this.impulse(e.params.reverbDecay),n.gain.gain.setTargetAtTime(0,i,Xm),r.gain.gain.setTargetAtTime(1,i,Xm),t.active=1-t.active,t.decay=e.params.reverbDecay.toFixed(1),t.lastChange=i},n=Math.max(0,.12-(this.now()-e.reverb.lastChange));n?e.reverbTask=this.defer(e,()=>{e.reverbTask=null,t()},n*1e3):t()}update(e,t=null){if(!this.context)return;let n=this.now();for(let r of t?[t]:this.voices){if(r.stopping)continue;let t={...r.params},i=n=>t[n]!==e[n];if(!Object.keys(t).some(i))continue;let a=r.held||n<r.start+r.duration,o=[`attack`,`decay`,`sustain`,`hold`,`release`].some(i),s={...t},c={held:r.held,releaseAt:r.releaseAt,releaseLevel:r.releaseLevel};if(Object.assign(r.params,e),!a)for(let e of[`attack`,`decay`,`sustain`,`hold`,`release`])r.params[e]=t[e];if(i(`pitch`))for(let t of r.pitchedSources)t.frequency.setTargetAtTime(e.pitch,n,.03);if(i(`harmonics`)){let t=this.wave(e.harmonics);for(let e of r.pitchedSources)e.setPeriodicWave(t)}for(let t of r.tones)i(`detune`)&&t.osc.detune.setTargetAtTime(t.sign*e.detune/2,n,Xm),i(`width`)&&t.pan.pan.setTargetAtTime(t.sign*e.width*.85,n,Xm),i(`noise`)&&t.gain.gain.setTargetAtTime((1-e.noise)*.5,n,Xm);if(i(`volume`)&&r.level.gain.setTargetAtTime(e.volume,n,Xm),i(`drive`)&&this.queueDrive(r),[`cutoffLow`,`cutoff`,`resonance`].some(i)){let t=Gm(e,this.context.sampleRate);r.filters.low.frequency.setTargetAtTime(t.low,n,.025),r.filters.high.frequency.setTargetAtTime(t.high,n,.025);for(let e of Object.values(r.filters))e.Q.setTargetAtTime(t.resonance,n,.025)}i(`noise`)&&(e.noise>0&&this.ensureNoise(r),r.noise?.gain.gain.setTargetAtTime(e.noise*.65,n,Xm)),(i(`motion`)||i(`rate`))&&(e.motion>0&&this.ensureMotion(r),r.amp.gain.setTargetAtTime(1-e.motion/2,n,Xm),r.motion?.source.frequency.setTargetAtTime(e.rate,n,Xm),r.motion?.depth.gain.setTargetAtTime(e.motion/2,n,Xm)),[`delayMix`,`delayTime`,`feedback`].some(i)&&(e.delayMix>0&&this.ensureDelay(r),r.delay&&(r.delay.node.delayTime.setTargetAtTime(e.delayTime,n,.03),r.delay.wet.gain.setTargetAtTime(e.delayMix,n,Xm),r.delay.feedback.gain.setTargetAtTime(nd(e.feedback),n,Xm))),[`reverbMix`,`reverbDecay`].some(i)&&(e.reverbMix>0&&this.ensureReverb(r),r.reverb?.wet.gain.setTargetAtTime(e.reverbMix,n,Xm),this.queueReverb(r)),o&&a&&this.reshapeEnvelope(r,n,s,c),this.refreshLifetime(r,{bridge:o&&a})}}reshapeEnvelope(e,t,n=e.params,r=e){let i=Math.max(0,t-e.start),a=e.envelope.gain,o=Xm;a.cancelAndHoldAtTime?a.cancelAndHoldAtTime(t):(a.cancelScheduledValues(t),a.setValueAtTime(Jm(n,i,r),t)),a.linearRampToValueAtTime(Jm(e.params,i+o,e),t+o);for(let t of Ym(e.params,i+o,e))a.linearRampToValueAtTime(t.value,e.start+t.time)}refreshLifetime(e,{bridge:t=!1}={}){e.duration=e.held?1/0:e.releaseAt===null?dd(e.params):e.releaseAt+e.params.release,e.sourceEnd=t?Math.max(e.duration,this.now()-e.start+Xm):e.sourceEnd??e.duration;let n=e.sourceEnd;e.total=e.held?1/0:n+pd(e.params)-dd(e.params),clearTimeout(e.timer),e.held||(e.timer=setTimeout(()=>this.disposeVoice(e),Math.max(0,(e.start+e.total+.3-this.now())*1e3)))}setPitch(e){for(let t of this.voices)t.stopping||this.updateVoicePatch(t,{pitch:ud(e,55,1760)})}setFilter(e){for(let t of this.voices)t.stopping||this.updateVoicePatch(t,{cutoffLow:e.cutoffLow??20,cutoff:e.cutoff,resonance:e.resonance})}setRelease(e){for(let t of this.voices)t.held&&this.updateVoicePatch(t,{release:ud(e,.02,3)})}updateVoicePatch(e,t){this.update({...e.params,...t},e)}release(e){if(!e||!e.held||!this.voices.has(e))return;let t=this.now(),n=Math.max(0,t-e.start),r={held:!0,releaseAt:null};e.releaseLevel=Jm(e.params,n,r),e.releaseAt=n,e.held=!1,e.released=!0,this.reshapeEnvelope(e,t,e.params,r),this.refreshLifetime(e,{bridge:!0})}disposeVoice(e){clearTimeout(e.timer);for(let t of e.tasks)clearTimeout(t);e.tasks.clear();for(let t of e.sources)try{t.stop()}catch{}for(let t of e.nodes)try{t.disconnect()}catch{}this.voices.delete(e)}stop(){for(let e of this.voices)e.stopping=!0,e.level.gain.setTargetAtTime(0,this.now(),.008),clearTimeout(e.timer),e.timer=setTimeout(()=>this.disposeVoice(e),60)}async render(t){let n=new OfflineAudioContext(2,Math.ceil((pd(t)+.25)*44100),44100),r=new e;r.context=n,r.master=Zm(n),r.init=async()=>{},await r.trigger(t);let i=await n.startRendering();for(let e of[...r.voices])r.disposeVoice(e);return i}},eh=[],th={pos:B(0,4.78,9.98),up:B(0,1,0)};th.fwd=B(0,.5,.3).sub(th.pos).normalize();var nh={ctx:null,sculptBuffers:new Map,sculptJobs:new Map,ensure(){this.ctx||this.init(),this.ctx.resume().catch(e=>console.warn(`audio resume failed`,e))},prepareSculpt(e){if(!Yd[e]?.sculpt)return Promise.resolve(null);if(this.sculptBuffers.has(e))return Promise.resolve(this.sculptBuffers.get(e));if(!this.sculptJobs.has(e)){let t=new $m().render(Yd[e].sculpt.params).then(t=>(this.sculptBuffers.set(e,t),t)).catch(t=>{throw this.sculptJobs.delete(e),t});this.sculptJobs.set(e,t)}return this.sculptJobs.get(e)},init(){if(this.ctx)return;let e=this.ctx=new(window.AudioContext||window.webkitAudioContext)({latencyHint:`interactive`});this.out=e.createGain(),this.out.gain.value=.9;let t=e.createDynamicsCompressor();t.threshold.value=-16,t.ratio.value=4,t.attack.value=.004,t.release.value=.25,this.dry=e.createGain(),this.wet=e.createGain(),this.wet.gain.value=.45;let n=e.createConvolver();n.buffer=this.impulse(3),this.dry.connect(t),this.wet.connect(n),n.connect(t),t.connect(this.out),this.delayIn=e.createGain(),this.delay=e.createDelay(3),this.delay.delayTime.value=45/V.bpm;let r=e.createGain();r.gain.value=.45;let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=3200;let a=e.createGain();a.gain.value=.3,this.delayIn.connect(this.delay),this.delay.connect(i),i.connect(r),r.connect(this.delay),i.connect(t),i.connect(a),a.connect(this.wet),this.out.connect(e.destination),this.clean=e.createGain();let o=e.createDynamicsCompressor();o.threshold.value=-2,o.knee.value=0,o.ratio.value=20,o.attack.value=.001,o.release.value=.1;let s=e.createGain();s.gain.value=1/1.1402/.9,this.clean.connect(o),o.connect(s),s.connect(this.out),this.stems={},this.stemLen={};for(let[t,n]of Object.entries(nf))n.then(t=>e.decodeAudioData(t)).then(e=>{this.stems[t]=e,this.stemLen[t]=rh(e)}).catch(e=>console.warn(`stem decode failed`,t,e));this.streamDest=e.createMediaStreamDestination(),this.out.connect(this.streamDest)},impulse(e){let t=this.ctx,n=Math.floor(t.sampleRate*e),r=t.createBuffer(2,n,t.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e);for(let e=0;e<n;e++)t[e]=(Math.random()*2-1)*(1-e/n)**3.2}return r},chainFor(e){if(e.chain)return e.chain.fx.in;let t=this.ctx,n=t.createPanner(),r=t.createBiquadFilter();n.panningModel=`equalpower`,n.distanceModel=`inverse`,n.refDistance=10,n.rolloffFactor=.7,r.type=`highpass`,r.Q.value=Math.SQRT1_2,r.connect(n);let i=t.createAnalyser();i.fftSize=256,r.connect(i);let a=t.createGain(),o=t.createGain(),s=t.createGain();n.connect(a),a.connect(this.clean),n.connect(o),o.connect(this.wet),n.connect(s),s.connect(this.delayIn);let c=this.fxChain();c.out.connect(r),e.chain={hp:r,p:n,dry:a,rev:o,dly:s,fx:c,meter:i,buf:new Float32Array(i.fftSize)},this.fxSync(e,!0);let l=om(e);a.gain.value=l.dry,o.gain.value=l.rev,s.gain.value=l.dly,r.frequency.value=l.hp;let u=e.feat.centre;return n.positionX?(n.positionX.value=u.x,n.positionY.value=u.y,n.positionZ.value=u.z):n.setPosition(u.x,u.y,u.z),c.in},fxChain(){let e=this.ctx,t=t=>{let n=e.createGain();return n.gain.value=t,n},n=(e,n=e)=>{let r={in:t(1),dry:t(1),wet:t(0),out:t(1)};return r.in.connect(r.dry),r.dry.connect(r.out),r.in.connect(e),n.connect(r.wet),r.wet.connect(r.out),r},r=e.createDynamicsCompressor();r.threshold.value=0,r.ratio.value=1,r.knee.value=6,r.attack.value=.003,r.release.value=.12;let i=e.createWaveShaper();i.oversample=`2x`;let a=e.createWaveShaper(),o=e.createDelay(.1),s=e.createDelay(.1),c=t(.5);o.delayTime.value=.018,s.delayTime.value=.026,o.connect(c),s.connect(c);let l=t(1);l.connect(o),l.connect(s);let u=e.createDelay(.05),d=t(0);u.delayTime.value=.003,u.connect(d),d.connect(u);let f=[0,1,2,3].map(()=>{let t=e.createBiquadFilter();return t.type=`allpass`,t.frequency.value=800,t.Q.value=.7,t});f.reduce((e,t)=>(e.connect(t),t));let p={comp:r,distM:n(i),crushM:n(a),chM:n(l,c),flM:n(u),phM:n(f[0],f[3]),ch1:o,ch2:s,fl:u,flFb:d,aps:f,dist:i,crush:a,keyD:-1,keyC:-1};return p.in=t(1),p.in.connect(r),r.connect(p.distM.in),p.distM.out.connect(p.crushM.in),p.crushM.out.connect(p.chM.in),p.chM.out.connect(p.flM.in),p.flM.out.connect(p.phM.in),p.out=p.phM.out,p},crushCurve(e){let t=Math.round(e*20)/20;if(this._crush??={},this._crush[t])return this._crush[t];let n=2**(16-t*14)/2,r=4096,i=new Float32Array(r);for(let e=0;e<r;e++){let t=e/4095*2-1;i[e]=Math.round(t*n)/n}return this._crush[t]=i},fxSync(e,t){let n=e.chain?.fx;if(!n)return;let r=this.ctx.currentTime,i=r+Kd,a=e.fx,o=(e,n)=>t?e.value=n:e.setTargetAtTime(n,r,.05);o(n.comp.threshold,-36*a.comp),o(n.comp.ratio,1+11*a.comp);let s=Math.round(a.dist*10);s!==n.keyD&&(n.keyD=s,n.dist.curve=this.curve(Math.max(.1,a.dist))),o(n.distM.dry.gain,1-a.dist),o(n.distM.wet.gain,a.dist*(1-.35*a.dist));let c=Math.round(a.crush*20);c!==n.keyC&&(n.keyC=c,n.crush.curve=this.crushCurve(a.crush)),o(n.crushM.dry.gain,1-a.crush),o(n.crushM.wet.gain,a.crush),o(n.chM.dry.gain,1-.3*a.chorus),o(n.chM.wet.gain,.75*a.chorus),o(n.flM.dry.gain,1-.3*a.flanger),o(n.flM.wet.gain,.8*a.flanger),o(n.flFb.gain,.6*a.flanger),o(n.phM.dry.gain,1-.25*a.phaser),o(n.phM.wet.gain,.85*a.phaser);let l=t=>2*Math.PI*(Hv/e.fxRate[t]%1+1)%(2*Math.PI),u=(e,a)=>{t||!n.ramped?e.setValueAtTime(a,r):e.linearRampToValueAtTime(a,i)};if(a.chorus>0||t){let e=l(`chorus`);u(n.ch1.delayTime,.018+.004*Math.sin(e)),u(n.ch2.delayTime,.026+.005*Math.sin(e+2.1))}if((a.flanger>0||t)&&u(n.fl.delayTime,.0035+.0028*Math.sin(l(`flanger`))),a.phaser>0||t){let e=300*10**(.5+.5*Math.sin(l(`phaser`)));n.aps.forEach((t,n)=>u(t.frequency,e*(1+n*.6)))}n.ramped=!0},level(e){let t=e.chain;if(!t)return 0;t.meter.getFloatTimeDomainData(t.buf);let n=0;for(let e=0;e<t.buf.length;e++)n+=t.buf[e]*t.buf[e];let r=Ud((10*Math.log10(n/t.buf.length+1e-12)+48)/42,0,1);return e.lvl=Math.max(r,(e.lvl??0)*.88)},curve(e){let t=Math.round(e*10)/10;if(this._curves??={},this._curves[t])return this._curves[t];let n=1024,r=1+t*30,i=new Float32Array(n);for(let e=0;e<n;e++){let t=e/1023*2-1;i[e]=Math.tanh(r*t)/Math.tanh(r)}return this._curves[t]=i},listener(){if(!this.ctx)return;let e=this.ctx.listener,t=th.pos,n=th.fwd,r=th.up;e.positionX?(e.positionX.value=t.x,e.positionY.value=t.y,e.positionZ.value=t.z,e.forwardX.value=n.x,e.forwardY.value=n.y,e.forwardZ.value=n.z,e.upX.value=r.x,e.upY.value=r.y,e.upZ.value=r.z):(e.setPosition(t.x,t.y,t.z),e.setOrientation(n.x,n.y,n.z,r.x,r.y,r.z))},note(e,t,n){let r=yf(e,n);return this.play(e.sound,440*2**((r-69)/12),.6,Math.max(t,this.ctx.currentTime),this.chainFor(e))},preview(e){if(!this.ctx)return;let t=yf(e,0);this.play(e.sound,440*2**((t-69)/12),.6,this.ctx.currentTime+.01,this.dry)},play(e,t,n,r,i){let a=Yd[e];if(!a)return 0;let o=a.sculpt?this.sculptBuffers.get(e):this.stems?.[a.stem];if(!o)return a.sculpt&&this.prepareSculpt(e).catch(e=>console.warn(`sculpt sound render failed`,e)),0;let s=this.ctx,c=s.createBufferSource(),l=s.createGain();return c.buffer=o,c.playbackRate.value=t/(440*2**((_f(e)-69)/12)),l.gain.value=10**(a.db/20)*n/.6,c.connect(l),l.connect(i),c.start(r),c.onended=()=>{try{l.disconnect()}catch{}},(a.sculpt?o.duration:this.stemLen[a.stem])/c.playbackRate.value}};function rh(e){let t=e.getChannelData(0),n=0,r=0;for(let e=0;e<t.length;e++)n=Math.max(n,Math.abs(t[e]));for(let e=0;e<t.length;e++)Math.abs(t[e])>n*.01&&(r=e);return r/e.sampleRate}var G={on:!1,mr:null,chunks:[],wavL:[],wavR:[],node:null,sink:null,t0:0,video:null,wav:null,mime:``};async function ih(){if(!nh.ctx)return;Mh||W_(!0),G.chunks=[],G.wavL=[],G.wavR=[],G.video=null,G.wav=null;let e=Ef.captureStream(60),t=new MediaStream([...e.getVideoTracks(),...nh.streamDest.stream.getAudioTracks()]);G.mime=[`video/mp4;codecs=avc1.640028,mp4a.40.2`,`video/mp4`,`video/webm;codecs=vp9,opus`,`video/webm;codecs=vp8,opus`,`video/webm`].find(e=>window.MediaRecorder&&MediaRecorder.isTypeSupported(e))||``;try{G.mr=new MediaRecorder(t,G.mime?{mimeType:G.mime,videoBitsPerSecond:14e6}:void 0),G.mr.ondataavailable=e=>e.data.size&&G.chunks.push(e.data),G.mr.onstop=()=>{G.video=new Blob(G.chunks,{type:G.mr.mimeType||G.mime||`video/webm`}),oh()},G.mr.start(250)}catch(e){console.warn(`video recording unavailable`,e),G.mr=null}try{G.node=nh.ctx.createScriptProcessor(4096,2,2),G.node.onaudioprocess=e=>{if(!G.on)return;let t=e.inputBuffer;G.wavL.push(t.getChannelData(0).slice(0)),G.wavR.push((t.numberOfChannels>1?t.getChannelData(1):t.getChannelData(0)).slice(0))},G.sink=nh.ctx.createGain(),G.sink.gain.value=0,nh.out.connect(G.node),G.node.connect(G.sink),G.sink.connect(nh.ctx.destination)}catch(e){console.warn(`wav recording unavailable`,e),G.node=null}G.on=!0,G.t0=performance.now(),z(`recBtn`).classList.add(`on`),z(`recBtn`).textContent=`■ STOP REC`,z(`exports`).style.display=`none`}function ah(){if(G.on=!1,G.mr&&G.mr.state!==`inactive`&&G.mr.stop(),G.node){try{nh.out.disconnect(G.node),G.node.disconnect(),G.sink.disconnect()}catch{}G.wav=sh(G.wavL,G.wavR,nh.ctx.sampleRate),G.node=null}z(`recBtn`).classList.remove(`on`),z(`recBtn`).textContent=`● REC`,oh()}function oh(){z(`exports`).style.display=G.video||G.wav?`flex`:`none`,z(`expVid`).style.display=G.video?``:`none`,z(`expWav`).style.display=G.wav?``:`none`,z(`expVid`).textContent=`EXPORT `+((G.video?.type||``).includes(`mp4`)?`MP4`:`WEBM`)}function sh(e,t,n){let r=e.reduce((e,t)=>e+t.length,0);if(!r)return null;let i=new ArrayBuffer(44+r*4),a=new DataView(i),o=(e,t)=>{for(let n=0;n<t.length;n++)a.setUint8(e+n,t.charCodeAt(n))};o(0,`RIFF`),a.setUint32(4,36+r*4,!0),o(8,`WAVE`),o(12,`fmt `),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,2,!0),a.setUint32(24,n,!0),a.setUint32(28,n*4,!0),a.setUint16(32,4,!0),a.setUint16(34,16,!0),o(36,`data`),a.setUint32(40,r*4,!0);let s=44;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];for(let e=0;e<r.length;e++)a.setInt16(s,Ud(r[e],-1,1)*32767,!0),a.setInt16(s+2,Ud(i[e],-1,1)*32767,!0),s+=4}return new Blob([i],{type:`audio/wav`})}function ch(e,t){let n=document.createElement(`a`);n.href=URL.createObjectURL(e);let r=new Date,i=e=>String(e).padStart(2,`0`);n.download=`vertex-${r.getFullYear()}${i(r.getMonth()+1)}${i(r.getDate())}-${i(r.getHours())}${i(r.getMinutes())}${i(r.getSeconds())}.${t}`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),4e3)}var lh={target:B(0,1.4,0),radius:11,theta:.62,phi:1.18},uh={cx:0,cz:0,h:2.6},dh=`3d`,fh=1,ph=null,mh=null;function hh(e){ph=e}function gh(e,t){e.position.setFromSpherical(new Kl(t.radius,t.phi,t.theta)).add(t.target),e.up.set(0,1,0),e.lookAt(t.target),e.updateMatrixWorld()}function _h(){let e=innerWidth/innerHeight;Af.left=-uh.h*e,Af.right=uh.h*e,Af.top=uh.h,Af.bottom=-uh.h,Af.updateProjectionMatrix(),Af.position.set(uh.cx,80,uh.cz),Af.up.set(0,0,-1),Af.lookAt(uh.cx,0,uh.cz),Af.updateMatrixWorld()}var vh=()=>({target:B(uh.cx,0,uh.cz),radius:uh.h/Math.tan(xt.degToRad(kf.fov/2)),theta:0,phi:6e-4}),yh=e=>({target:e.target.clone(),radius:e.radius,theta:e.theta,phi:e.phi});function bh(){mh?(gh(kf,mh.cur),Mf(kf)):dh===`top`?(_h(),Mf(Af)):(gh(kf,lh),Mf(kf)),Lh.camera!==jf&&(Lh.camera=jf)}function xh(e){if(e===dh&&!mh)return;qg(),ph=null;let t=mh?yh(mh.cur):dh===`top`?vh():yh(lh),n=e===`top`?vh():yh(lh),r=(n.theta-t.theta)%(Math.PI*2);r>Math.PI&&(r-=Math.PI*2),r<-Math.PI&&(r+=Math.PI*2),mh={t:0,from:t,to:{...n,theta:t.theta+r},mode:e,ex0:fh,cur:yh(t)},dh=e,document.querySelectorAll(`[data-view]`).forEach(t=>t.classList.toggle(`on`,t.dataset.view===e)),Vh(),_v(),Q()}function Sh(e){if(mh){mh.t=Math.min(1,mh.t+e/.8);let t=Wd(Wd(mh.t)),n=mh.from,r=mh.to,i=mh.cur;i.target.lerpVectors(n.target,r.target,t),i.radius=Math.exp(Math.log(n.radius)+(Math.log(r.radius)-Math.log(n.radius))*t),i.theta=n.theta+(r.theta-n.theta)*t,i.phi=n.phi+(r.phi-n.phi)*t;let a=Wd(Ud(mh.mode===`top`?mh.t*1.25:mh.t*1.25-.25,0,1));fh=mh.mode===`top`?mh.ex0*(1-a):mh.ex0+(1-mh.ex0)*a,mh.t>=1&&(fh=mh.mode===`top`?0:1,mh=null,Vh())}else if(ph&&dh===`3d`){ph.t=Math.min(1,ph.t+e/.3);let t=1-(1-ph.t)**3,n=ph.from,r=ph.to;lh.target.lerpVectors(n.target,r.target,t),lh.radius=n.radius+(r.radius-n.radius)*t,lh.theta=n.theta+(r.theta-n.theta)*t,lh.phi=n.phi+(r.phi-n.phi)*t,ph.t>=1&&(ph=null)}else if(Ch&&dh===`top`){Ch.t=Math.min(1,Ch.t+e/.3);let t=1-(1-Ch.t)**3;uh.h=Ch.h0+(Ch.h1-Ch.h0)*t,uh.cx=Ch.x0*(1-t),uh.cz=Ch.z0*(1-t),Ch.t>=1&&(Ch=null)}bh()}var Ch=null;function wh(e){Ch=e}function Th(e){let t=yh(lh),n=((e.theta??t.theta)-t.theta)%(Math.PI*2);n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),ph={from:t,to:{target:e.target??t.target,radius:e.radius??t.radius,theta:t.theta+n,phi:e.phi??t.phi},t:0}}function Eh(e){if(!e.length)return;if(dh===`top`){let t=Math.max(...e.map(e=>Math.max(...e.ringW.map(t=>Math.hypot(t.x-e.group.position.x,t.z-e.group.position.z)))));Ch={t:0,h0:uh.h,h1:Ud(t*1.7,1,60),x0:uh.cx,z0:uh.cz};return}let t=new en;e.forEach(e=>{e.group.updateMatrixWorld(),t.expandByObject(e.mesh)});let n=t.getCenter(B()),r=t.getBoundingSphere(new yn).radius;Th({target:n,radius:Ud(r/Math.sin(xt.degToRad(kf.fov/2))*1.15,1.2,90)})}function Dh(){if(!q||!q.editSel.size||dh!==`3d`)return Eh(q?[q]:W);let e=new en;q.editSel.forEach(t=>e.expandByPoint(q.vert(t).clone().applyMatrix4(q.group.matrixWorld))),Th({target:e.getCenter(B()),radius:Ud(Math.max(.4,e.getBoundingSphere(new yn).radius)/Math.sin(xt.degToRad(kf.fov/2))*1.4,1,40)})}function Oh(e,t){if(dh===`top`){let n=2*uh.h/innerHeight;uh.cx-=e*n,uh.cz-=t*n;return}let n=2*lh.radius*Math.tan(xt.degToRad(kf.fov/2))/innerHeight,r=B(1,0,0).applyQuaternion(kf.quaternion),i=B(0,1,0).applyQuaternion(kf.quaternion);lh.target.addScaledVector(r,-e*n).addScaledVector(i,t*n)}function kh(e){dh===`top`?uh.h=Ud(uh.h*e,.4,80):lh.radius=Ud(lh.radius*e,.4,120)}var K=new Set,q=null,J=`object`,Ah=`p`,jh=`translate`,Mh=!0,Nh=!1;function Ph(e){q=e}function Fh(e){Nh=e}var Ih=new tr;Df.add(Ih);var Lh=new ou(jf,Ef);Lh.setSpace(`world`),Lh.setSize(.85),Of.add(Lh.getHelper());var Rh=()=>V.snap!==xv,zh=e=>Math.round(e/Gd)*Gd;function Bh(){let e=B(),t=0;return J===`object`?K.forEach(n=>{e.add(n.mesh.geometry.boundingSphere.center.clone().applyMatrix4(n.group.matrixWorld)),t++}):q&&Ah===`p`?q.noteSel.forEach(n=>{q.notes[n]&&(e.add(q.notePos(n,B()).applyMatrix4(q.group.matrixWorld)),t++)}):q&&q.editSel.forEach(n=>{e.add(q.vert(n).clone().applyMatrix4(q.group.matrixWorld)),t++}),t?e.divideScalar(t):null}function Vh(){if(Lh.dragging)return;let e=jh&&!Z&&!X&&!Yg&&!mh&&(dh!==`top`||J!==`object`||jh!==`translate`)&&!sv&&(J!==`edit`||Ah!==`p`)?Bh():null;e?(Ih.position.copy(e),Ih.rotation.set(0,0,0),Ih.scale.set(1,1,1),Ih.updateMatrixWorld(!0),Lh.object!==Ih&&Lh.attach(Ih),Lh.setMode(jh),Lh.setTranslationSnap(V.snap?Gd:null),Lh.setRotationSnap(V.snap?Math.PI/12:null),Lh.showY=dh!==`top`||jh!==`translate`):Lh.object&&Lh.detach()}function Hh(e){if(e=Ud(Math.round(e),mf.lo,mf.hi),e===pf.plane)return;pf.plane=e;let t=Math.abs(e);Wh(e?`PLANE ${e>0?`+`:`−`}${t} · ${t} OCTAVE${t>1?`S`:``} ${e>0?`UP`:`DOWN`}`:`PLANE 0 · THE FLOOR`,900)}function Uh(e){if(J!==`object`||!K.size||Y||Z)return;let t=ff(),n=[...K];if(n.some(n=>{let r=hf(n.dy+e*t);return r<mf.lo||r>mf.hi})){Wh(e>0?`THE HIGHEST PLANE`:`THE LOWEST PLANE`,900);return}n.forEach(n=>{n.dy=Jh(n.dy+e*t),n.group.position.y+=e*t,n.group.updateMatrixWorld(!0)});let r=q&&K.has(q)?q:n[0];Hh(hf(r.dy)),hg(),Q(),Wh(`${n.length>1?n.length+` FORMS`:r.name} · AN OCTAVE ${e>0?`UP`:`DOWN`} · PLANE ${pf.plane>0?`+`:``}${pf.plane}`,1100)}function Wh(e,t=1600){let n=z(`modalHdr`);n.textContent=e,n.style.display=`block`,clearTimeout(Wh.tm),Wh.tm=setTimeout(()=>{!Z&&!d_&&(n.style.display=`none`)},t)}var Y=null;function Gh(){if(Df.updateMatrixWorld(!0),J===`object`){let e=new Set;[...K].forEach(t=>t.stack.forEach(t=>e.add(t))),Y={kind:`object`,items:[...e].map(e=>({s:e,m:e.group.matrix.clone()}))}}else if(q&&Ah===`p`){let e=q,t=[...e.noteSel].filter(t=>e.notes[t]).map(t=>({k:t,f:e.notes[t].f,y:e.notes[t].y}));Y=t.length?{kind:`notes`,s:e,items:t}:null}else if(q){let e=q.group.matrixWorld.clone(),t=e.clone().invert(),n=[...q.editSel].map(t=>({i:t,w:q.vert(t).clone().applyMatrix4(e)})),r=[];if(V.mirror){let e=q.n,t=.001*Math.max(.2,q.mesh.geometry.boundingSphere.radius);q.editSel.forEach(n=>{let i=q.vert(n),a=n<e?0:e;for(let o=a;o<a+e;o++){if(o===n||q.editSel.has(o))continue;let e=q.vert(o);if(Math.abs(e.x+i.x)<t&&Math.abs(e.z-i.z)<t&&Math.abs(e.y-i.y)<t){r.push([n,o]);break}}})}Y={kind:`edit`,s:q,inv:t,items:n,pairs:r,orig:[...Array(q.n*2).keys()].map(e=>q.vert(e).clone())}}Y&&(Y.per0=q?q.perim:0)}function Kh(e,t){let n=Y.s;Y.items.forEach(({k:r,f:i,y:a})=>{let o=i+e;o=n.closed?o-Math.floor(o):Ud(o,0,1),Rh()&&e&&(o=Vd(o,n.perim,Gd,n.closed)),n.notes[r].f=o,n.notes[r].y=a+t}),n.ringKey=``,n.star.key=``}function qh(e){if(Y){if(Y.kind===`notes`)e.elements.every((e,t)=>e===(t%5?0:1))&&Kh(0,0);else if(Y.kind===`object`)Y.items.forEach(({s:t,m:n})=>{new On().multiplyMatrices(e,n).decompose(t.group.position,t.group.quaternion,t.group.scale),t.group.updateMatrixWorld(!0),Xp(t)&&t.rebuild()});else{let t=Y.s;Y.orig.forEach((e,n)=>t.vert(n).copy(e)),Y.items.forEach(({i:n,w:r})=>t.vert(n).copy(r).applyMatrix4(e).applyMatrix4(Y.inv)),Y.pairs.forEach(([e,n])=>{let r=t.vert(e);t.vert(n).set(-r.x,r.y,r.z)}),Xp(t,new Set([...Y.items.map(e=>e.i),...Y.pairs.map(e=>e[1])])),t.rebuild()}}}var Jh=e=>Math.abs(e)<.02?0:e;function Yh(e,t){e.group.updateMatrixWorld(!0),e.measure();let n=e.perim,r=Math.max(Gd,Math.round(n/Gd)*Gd);if(n<1e-4||Math.abs(r-n)<1e-4)return!1;let i=r/n,a=B();return e.bottom.forEach(e=>a.add(e)),a.divideScalar(e.n),[...e.bottom,...e.top].forEach(e=>{e.x=a.x+(e.x-a.x)*i,e.z=a.z+(e.z-a.z)*i}),e.rebuild(),e.group.updateMatrixWorld(!0),e.measure(),t||Wh(`FITTED TO ${Q_(e.loopBars())} · HOLD CTRL FOR A FREE LENGTH`),!0}function Xh(e){e.items.forEach(({s:e})=>{e.dy=Jh(e.group.position.y+e.minB*e.group.scale.y),e.stackIdx===0&&(e.anchor=[e.group.position.x,e.group.position.z])}),fm()}function Zh(e){if(Y){if(!e)qh(new On);else{if(Y.kind===`object`&&fh>.99&&Xh(Y),Y.kind===`object`&&Y.items.forEach(({s:e})=>{e.fresh&&(e.anchor=bm(e.stack,...e.anchor))}),Y.kind===`edit`&&Rh()){Yh(Y.s);let e=Y.s;e.updateLines(),e.notes.forEach(t=>{t.f=Vd(t.f,e.perim,Gd,e.closed)}),e.ringKey=``,e.star.key=``}S_(Y)}f_=!1,!e&&Y.kind===`object`&&Y.items.some(({s:e})=>e.fresh)&&(Y.items.forEach(({s:e})=>{e.fresh&&(e.anchor=bm(e.stack,...e.anchor))}),fg=mg()),Y.kind===`object`&&Y.items.forEach(({s:e})=>{delete e.fresh}),Y=null,e&&hg(),Df.updateMatrixWorld(!0),Vh(),Q()}}var Qh=new On,$h=0;Lh.addEventListener(`mouseDown`,()=>{Gh(),Ih.updateMatrixWorld(!0),Qh.copy(Ih.matrixWorld).invert(),$h=Ih.position.y}),Lh.addEventListener(`objectChange`,()=>{if(Y){if(Lh.mode===`translate`&&Rh()){let e=Y.kind===`object`?ff():uf.step;Ih.position.y=$h+Math.round((Ih.position.y-$h)/e)*e}Ih.updateMatrixWorld(!0),qh(new On().multiplyMatrices(Ih.matrixWorld,Qh))}}),Lh.addEventListener(`mouseUp`,()=>{y_(!0),Zh(!0)});function eg(e){(e!==`edit`||q)&&(qg(),J=e,z(`modeBtn`).textContent=e===`edit`?`EDIT MODE`:`OBJECT MODE`,z(`modeBtn`).classList.toggle(`on`,e===`edit`),z(`selModes`).style.display=e===`edit`?`flex`:`none`,z(`mirrorBtn`).style.display=e===`edit`?``:`none`,e===`edit`&&(K.clear(),K.add(q),tg(`p`)),Vh(),Q(),_v())}function tg(e){Ah=e,document.querySelectorAll(`#selModes button`).forEach(t=>t.classList.toggle(`on`,t.dataset.sm===e)),Vh(),_v()}function ng(e,t){let n=q;if(!n)return-1;let r=-1,i=12;return n.notes.forEach((a,o)=>{let s=Sg(n.notePos(o,B()).applyMatrix4(n.group.matrixWorld)),c=Math.hypot(s.x-e,s.y-t);s.z<1&&c<i&&(i=c,r=o)}),r}function rg(e,t,n){let r=q;if(!r)return;let i=ng(e,t);if(i>=0)n||r.noteSel.clear(),n&&r.noteSel.has(i)?r.noteSel.delete(i):r.noteSel.add(i);else{let i=Zg(r,e,t);i?(r.notes.push({f:i.f,y:r.pathAt(i.f,B()).y,mute:!1}),n||r.noteSel.clear(),r.noteSel.add(r.notes.length-1),r.ringKey=``,r.star.key=``,hg()):n||r.noteSel.clear()}Q()}function ig(e,t,n){let r=q,i=ng(e,t);return!r||i<0?!1:(n?r.noteSel.add(i):r.noteSel.has(i)||(r.noteSel.clear(),r.noteSel.add(i)),o_(`G`),Z&&(Z.drag=!0),!!Z)}function ag(){let e=q;if(!e||!e.noteSel.size)return;let t=[...e.noteSel].some(t=>e.notes[t]&&!e.notes[t].mute);e.noteSel.forEach(n=>{e.notes[n]&&(e.notes[n].mute=t)}),e.ringKey=``,e.star.key=``,hg(),Q()}function og(){let e=q;e&&e.noteSel.size&&(e.notes=e.notes.filter((t,n)=>!e.noteSel.has(n)),e.noteSel.clear(),delete e.tracks.notes,e.buildMotionLines(),e.ringKey=``,e.star.key=``,hg(),Q())}function sg(e){jh=e===`none`?null:e,document.querySelectorAll(`#tools [data-gum]`).forEach(e=>e.classList.toggle(`on`,e.dataset.gum===(jh??`none`))),Vh()}function cg(e,t){t||K.clear(),e?t&&K.has(e)&&q===e?(K.delete(e),q=[...K].pop()??null):(K.add(e),q=e):t||(q=null),Vh(),Q()}function lg(e){let t=e.n,n=e.segs(),r=[];for(let e=0;e<t;e++)r.push([e,t+e]);for(let e=0;e<n;e++)r.push([e,(e+1)%t]);for(let e=0;e<n;e++)r.push([t+e,t+(e+1)%t]);return r}var ug=[],dg=[],fg=null;function pg(e){fg=e}var mg=()=>W.map(e=>e.serialize());function hg(){fg&&ug.push(fg),ug.length>120&&ug.shift(),fg=mg(),dg.length=0}function gg(e){let t=new Map(W.map(e=>[e.id,e])),n=new Set;e.forEach(e=>{let r=t.get(e.id);if(r&&r.n===e.bottom.length)r.applyData(e),n.add(r);else{if(r){let e=W.indexOf(r);W.splice(e,1),r.dispose()}let t=new Yp(e);W.push(t),n.add(t)}}),[...W].forEach(e=>{if(!n.has(e)){let t=W.indexOf(e);W.splice(t,1),K.delete(e),e.dispose()}});let r=new Map(e.map((e,t)=>[e.id,t]));W.sort((e,t)=>r.get(e.id)-r.get(t.id)),fm(),q&&!W.includes(q)&&(q=null),[...K].forEach(e=>{W.includes(e)||K.delete(e)}),J===`edit`&&!q&&eg(`object`),Df.updateMatrixWorld(!0),Vh(),Q()}function _g(e){let t=q,n=t&&hf(t.dy);e(),t&&W.includes(t)&&hf(t.dy)!==n&&Hh(hf(t.dy))}function vg(){ug.length&&_g(()=>{dg.push(fg),fg=ug.pop(),gg(fg)})}function yg(){dg.length&&_g(()=>{ug.push(fg),fg=dg.pop(),gg(fg)})}var bg=new Ul;bg.layers.enableAll();var xg=(e,t)=>new M(e/innerWidth*2-1,-(t/innerHeight)*2+1);function Sg(e){let t=e.clone().project(jf);return{x:(t.x+1)/2*innerWidth,y:(1-t.y)/2*innerHeight,z:t.z}}function Cg(e,t,n){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a?Ud(((e.x-t.x)*r+(e.y-t.y)*i)/a,0,1):0;return Math.hypot(e.x-t.x-o*r,e.y-t.y-o*i)}var wg=null;function Tg(e){wg=e}function Eg(e,t){if(dh===`top`||mh){let n={x:e,y:t},r=[];if(W.forEach(i=>{let a=i.ringW.map(e=>Sg(e)),o=1/0,s=0,c=!1;for(let r=0,l=a.length-1;r<a.length;l=r++)(i.closed||r)&&(o=Math.min(o,Cg(n,a[l],a[r]))),s+=a[l].x*a[r].y-a[r].x*a[l].y,a[r].y>t!=a[l].y>t&&e<(a[l].x-a[r].x)*(t-a[r].y)/(a[l].y-a[r].y)+a[r].x&&(c=!c);o<9?r.push({s:i,k:o+(i.idle?6:0)}):c&&i.closed&&r.push({s:i,k:20+Math.abs(s)/2e3+(i.idle?6:0)})}),!r.length)return null;r.sort((e,t)=>e.k-t.k);let i=r[0].s;if(wg&&Math.hypot(wg.x-e,wg.y-t)<5){let e=r.findIndex(e=>e.s===wg.s);e>=0&&(i=r[(e+1)%r.length].s)}return wg={x:e,y:t,s:i},{shape:i,point:!1}}bg.setFromCamera(xg(e,t),jf);let n=bg.intersectObjects(W.map(e=>e.mesh),!1);return n.length?{shape:n[0].object.userData.shape,point:!1}:null}function Dg(e,t){return bg.setFromCamera(xg(e,t),jf),bg.ray.intersectPlane(new yi(B(0,1,0),-pf.plane*ff()),B())}function Og(e,t){let n=q;if(!n)return null;let r=n.group.matrixWorld,i=n.n,a=[...Array(i*2).keys()].map(e=>Sg(n.vert(e).clone().applyMatrix4(r))),o={x:e,y:t};if(Ah===`v`){let n=null,r=14;if(a.forEach((i,a)=>{if(i.z>1)return;let o=Math.hypot(i.x-e,i.y-t);o<r&&(r=o,n=a)}),n!==null&&dh===`top`){let e=n%i;return[e,e+i]}return n===null?null:[n]}if(Ah===`e`){let e=null,t=10;return lg(n).forEach(([n,r])=>{let i=Cg(o,a[n],a[r]);i<t&&(t=i,e=[n,r])}),e&&dh===`top`&&e[0]<i&&e[1]<i&&(e=[e[0],e[1],e[0]+i,e[1]+i]),e}return null}var kg=512,Ag=new Sc(new Lr,new _c({size:7,sizeAttenuation:!1,vertexColors:!0,depthTest:!1,transparent:!0}));Ag.geometry.setAttribute(`position`,new Er(new Float32Array(kg*3),3)),Ag.geometry.setAttribute(`color`,new Er(new Float32Array(kg*3),3));var jg=new hc(new Lr,new rc({vertexColors:!0,depthTest:!1,transparent:!0}));jg.geometry.setAttribute(`position`,new Er(new Float32Array(kg*6),3)),jg.geometry.setAttribute(`color`,new Er(new Float32Array(kg*6),3));var Mg=new I(new Lr,new Cr({color:7099064,transparent:!0,opacity:.2,depthTest:!1,side:2}));[Ag,jg,Mg].forEach(e=>{e.frustumCulled=!1,e.renderOrder=10,Of.add(e)});var Ng=new dc(new Lr,new rc({color:1511964,depthTest:!1}));Ng.geometry.setAttribute(`position`,new Er(new Float32Array(390),3));var Pg=new Sc(new Lr,new _c({size:7,sizeAttenuation:!1,color:1511964,depthTest:!1}));Pg.geometry.setAttribute(`position`,new Er(new Float32Array(390),3)),[Ng,Pg].forEach(e=>{e.frustumCulled=!1,e.visible=!1,Of.add(e)});function Fg(){let e=J===`edit`&&q;if(Ag.visible=jg.visible=!!e,Mg.visible=!1,!e)return;let t=q,n=t.n,r=t.group.matrixWorld,i=[...Array(n*2).keys()].map(e=>t.vert(e).clone().applyMatrix4(r)),a=t.editSel,o=[.42,.32,.72],s=[.36,.35,.4],c=[.55,.54,.6],l=Ag.geometry.attributes.position.array,u=Ag.geometry.attributes.color.array,d=0;Ah===`p`?t.notes.forEach((e,n)=>{if(d>=kg)return;let i=t.notePos(n,B()).applyMatrix4(r);l.set([i.x,i.y,i.z],d*3),u.set(t.noteSel.has(n)?o:s,d*3),d++}):i.forEach((e,t)=>{l.set([e.x,e.y,e.z],d*3),u.set(a.has(t)?o:Ah===`v`?s:c,d*3),d++}),Ag.geometry.setDrawRange(0,d),Ag.geometry.attributes.position.needsUpdate=Ag.geometry.attributes.color.needsUpdate=!0,Ag.material.size=Ah===`p`?9:7;let f=jg.geometry.attributes.position.array,p=jg.geometry.attributes.color.array,m=0;lg(t).forEach(([e,t])=>{let n=Ah!==`p`&&a.has(e)&&a.has(t)?o:c;f.set([i[e].x,i[e].y,i[e].z,i[t].x,i[t].y,i[t].z],m*6),p.set([...n,...n],m*6),m++}),jg.geometry.setDrawRange(0,m*2),jg.geometry.attributes.position.needsUpdate=jg.geometry.attributes.color.needsUpdate=!0}var X=null,Ig=`stem_synth`;function Lg(e){Ig=e}function Rg(){J===`edit`&&eg(`object`),qg(),X={pts:[],shape:null,origin:null},Ng.visible=Pg.visible=!0,z(`polyBtn`).classList.add(`on`),Ef.style.cursor=`crosshair`,Vh(),_v(),Ug()}function zg(e){return e&&Rh()&&(e.x=zh(e.x),e.z=zh(e.z)),e}function Bg(e,t){let n=0;for(let t=1;t<e.length;t++)n+=e[t].distanceTo(e[t-1]);return t&&e.length>2&&(n+=e[0].distanceTo(e.at(-1))),n}var Vg=(e,t)=>X.pts.length>=3&&(n=>Math.hypot(n.x-e,n.y-t)<12)(Sg(X.pts[0]));function Hg(e){if(X.pts.length<2){X.shape&&(cm(X.shape),X.shape=null);return}let t=X.origin,n=X.pts.map(e=>[e.x-t.x,0,e.z-t.z]),r=X.shape,i={id:r?.id,name:r?.name??Jp(`Polygon`),sound:r?.sound??Ig,closed:e,bottom:n,top:n.map(e=>[e[0],uf.thick,e[2]]),anchor:r?r.anchor:dh===`3d`?[t.x,t.z]:null,dy:r?r.dy:pf.plane*ff()};X.shape=r?am(r,i):sm(i)}function Ug(){if(!X)return;let e=[...X.pts],t=Vg(a_.x,a_.y),n=zg(Dg(a_.x,a_.y));t?e.push(X.pts[0]):n&&e.push(n);let r=Ng.geometry.attributes.position.array,i=Pg.geometry.attributes.position.array,a=pf.plane*ff()+uf.thick/2;e.forEach((e,t)=>{r.set([e.x,a,e.z],t*3),i.set([e.x,a,e.z],t*3)}),Ng.geometry.setDrawRange(0,e.length),Pg.geometry.setDrawRange(0,X.pts.length),Ng.geometry.attributes.position.needsUpdate=Pg.geometry.attributes.position.needsUpdate=!0;let o=X.pts.length>1?` · PLAYING ${Q_(2*Bg(X.pts,!1)/4)} THERE AND BACK`:``;t?Wh(`POLYGON · CLICK TO CLOSE · THEN IT LOOPS ${Q_(Bg(e,!1)/4)}`,6e4):X.pts.length&&Wh(`POLYGON${o} · CLICK THE FIRST POINT TO CLOSE · ENTER / RMB DONE`,6e4)}function Wg(e,t){if(!X)return;if(Vg(e,t)){Kg(!0);return}let n=zg(Dg(e,t));if(!n)return;let r=X.pts.at(-1);r&&r.distanceTo(n)<1e-6||(X.origin||(X.origin=dh===`3d`?n.clone():B()),X.pts.length<64&&(X.pts.push(n),Hg(!1)),Ug())}function Gg(){X&&(X.pts.pop(),Hg(!1),Ug())}function Kg(e){if(!X)return;if(X.pts.length<(e?3:2)){qg();return}Hg(e);let t=X.shape;X.shape=null,Rh()&&Yh(t,!0),cg(t,!1),Jg(),Qg(t)}function qg(){X&&(X.shape&&cm(X.shape),X=null,Ng.visible=Pg.visible=!1,z(`polyBtn`).classList.remove(`on`),Ef.style.cursor=``,z(`modalHdr`).style.display=`none`,Vh(),Q(),_v())}function Jg(){X=null,Ng.visible=Pg.visible=!1,z(`polyBtn`).classList.remove(`on`),Ef.style.cursor=``,z(`modalHdr`).style.display=`none`,hg(),Vh(),Q(),_v()}var Yg=null,Xg=new Sc(new Lr().setFromPoints([B()]),new _c({size:9,sizeAttenuation:!1,color:7099064,transparent:!0,opacity:.85,depthTest:!1}));Xg.frustumCulled=!1,Xg.visible=!1,Xg.renderOrder=11,Of.add(Xg);function Zg(e,t,n,r=22){e.pathF||e.updateLines();let i=e.group.matrixWorld,a=e.pathP.map(e=>Sg(e.clone().applyMatrix4(i))),o=e.pathF,s=null,c=r;for(let e=0;e<a.length-1;e++){let r=a[e],i=a[e+1],l=i.x-r.x,u=i.y-r.y,d=l*l+u*u,f=d?Ud(((t-r.x)*l+(n-r.y)*u)/d,0,1):0,p=Math.hypot(t-r.x-f*l,n-r.y-f*u);p<c&&(c=p,s=o[e]+(o[e+1]-o[e])*f)}if(s===null)return null;let l=Rh()?Vd(s,e.perim,Gd,e.closed):s;return{f:l,w:e.pathAt(l,B()).applyMatrix4(i)}}function Qg(e){J===`edit`&&eg(`object`),qg(),Yg={s:e,added:[]},cg(e,!1),Ef.style.cursor=`crosshair`,$g(),Vh(),_v()}var $g=()=>Wh(`${Yg.s.name} · ${Q_(Yg.s.loopBars())} · CLICK THE OUTLINE TO PLACE A NOTE · ${Yg.s.notes.length} PLACED · ENTER DONE`,6e5);function e_(){let e=Yg&&Zg(Yg.s,a_.x,a_.y);Xg.visible=!!e,e&&Xg.position.copy(e.w)}function t_(e,t){if(!Yg)return;let n=Yg.s,r=Zg(n,e,t);if(!r)return;let i=n.notes.findIndex(e=>Math.abs(e.f-r.f)<1e-4||n.closed&&Math.abs(Math.abs(e.f-r.f)-1)<1e-4);if(i>=0)n.notes.splice(i,1),Yg.added=Yg.added.filter(e=>n.notes.includes(e));else{let e={f:r.f,y:n.pathAt(r.f,B()).y,mute:!1};n.notes.push(e),Yg.added.push(e),n.lightUp(n.notes.length-1)}n.ringKey=``,n.star.key=``,$g(),Q(),e_()}function n_(){if(!Yg)return;let e=Yg.added.pop();if(!e)return;let t=Yg.s;t.notes.splice(t.notes.indexOf(e),1),t.ringKey=``,t.star.key=``,$g(),Q()}function r_(){if(!Yg)return;let e=Yg.s;Yg=null,Xg.visible=!1,Ef.style.cursor=``,z(`modalHdr`).style.display=`none`,hg(),Vh(),Q(),_v(),Wh(`${e.name} · ${e.notes.length} NOTE${e.notes.length===1?``:`S`} · ${Q_(e.loopBars())}`)}function i_(){if(!Yg)return;let e=Yg.s;Yg=null,Xg.visible=!1,Ef.style.cursor=``,z(`modalHdr`).style.display=`none`,cm(e),q=null,K.clear(),Vh(),Q(),_v()}var Z=null,a_={x:innerWidth/2,y:innerHeight/2};function o_(e){if(X||Yg||mh||J===`object`&&!K.size||J===`edit`&&(!q||!(Ah===`p`?q.noteSel.size:q.editSel.size))||J===`edit`&&Ah===`p`&&e!==`G`)return;if(e===`G`&&J===`object`&&dh===`top`){Wh(`TOP VIEW KEEPS EVERY FORM ON THE COMMON CENTRE · MOVE FORMS IN 3D`);return}Gh();let t=Bh();t?(Z={type:e,axis:null,exclude:!1,p:t,ps:Sg(t),m0:{x:a_.x,y:a_.y}},Lh.detach(),c_(),u_()):Y=null}var s_={x:B(1,0,0),y:B(0,1,0),z:B(0,0,1)};function c_(){if(!Z)return;let{p:e,ps:t,m0:n}=Z,r=new On,i=jf.getWorldDirection(B());if(Y&&Y.kind===`notes`){let t=Y.s;if(Z.axis===`z`){let r=B().crossVectors(B(0,1,0),B().crossVectors(i,B(0,1,0)));r.lengthSq()<1e-8&&r.copy(i);let a=new yi().setFromNormalAndCoplanarPoint(r.normalize(),e);bg.setFromCamera(xg(n.x,n.y),jf);let o=bg.ray.intersectPlane(a,B());bg.setFromCamera(xg(a_.x,a_.y),jf);let s=bg.ray.intersectPlane(a,B()),c=(o&&s?s.y-o.y:0)/Math.max(1e-6,Math.abs(t.group.scale.y));Rh()&&(c=Math.round(c/uf.step)*uf.step),Kh(0,c),Z.val={dy:c}}else{Z.f0??=Zg(t,n.x,n.y,1e9)?.f??0;let e=Zg(t,a_.x,a_.y,1e9),r=e?e.f-Z.f0:0;t.closed&&(r-=Math.round(r)),Kh(r,0),Z.val={df:r}}u_();return}let a=Z.axis?s_[Z.axis]:null;if(Z.type===`G`){let t;a?Z.exclude?t=a.clone():(t=B().crossVectors(a,B().crossVectors(i,a)),t.lengthSq()<1e-8&&(t=i.clone())):t=i.clone();let o=new yi().setFromNormalAndCoplanarPoint(t.normalize(),e);bg.setFromCamera(xg(n.x,n.y),jf);let s=bg.ray.intersectPlane(o,B());bg.setFromCamera(xg(a_.x,a_.y),jf);let c=bg.ray.intersectPlane(o,B()),l=s&&c?c.sub(s):B();if(a&&!Z.exclude){let e=l.dot(a);l.copy(a).multiplyScalar(e)}if(a&&Z.exclude&&l.addScaledVector(a,-l.dot(a)),Rh()){let e=Y.kind===`object`?ff():uf.step;l.x=zh(l.x),l.z=zh(l.z),l.y=Math.round(l.y/e)*e}r.makeTranslation(l.x,l.y,l.z),Z.val=l}else if(Z.type===`R`){let o=Math.atan2(a_.y-t.y,a_.x-t.x)-Math.atan2(n.y-t.y,n.x-t.x),s=i.clone();a&&(s=a.clone(),a.dot(i)<0&&(o=-o));let c=J===`object`&&q&&(Z.axis===`y`&&!Z.exclude||!a&&dh===`top`)?2*Math.PI/Math.max(1,Math.round(q.loopBars()*16)):Math.PI/12;Rh()&&(o=Math.round(o/c)*c),r.makeTranslation(e.x,e.y,e.z).multiply(new On().makeRotationAxis(s.normalize(),o)).multiply(new On().makeTranslation(-e.x,-e.y,-e.z)),Z.val=o}else{let i=Math.max(4,Math.hypot(n.x-t.x,n.y-t.y)),o=Math.hypot(a_.x-t.x,a_.y-t.y)/i,s=!a||Z.axis===`y`&&Z.exclude;Rh()&&s&&Y.per0>1e-4?o=Math.max(Gd,Math.round(Y.per0*o/Gd)*Gd)/Y.per0:Rh()&&(o=Math.round(o*10)/10);let c=B(o,o,o);if(a){let e=Z.axis;Z.exclude?c[e]=1:(c.set(1,1,1),c[e]=o)}r.makeTranslation(e.x,e.y,e.z).multiply(new On().makeScale(Math.max(c.x,.01),Math.max(c.y,.01),Math.max(c.z,.01))).multiply(new On().makeTranslation(-e.x,-e.y,-e.z)),Z.val=c}qh(r),u_()}function l_(e){Z&&(y_(e),Z=null,z(`modalHdr`).style.display=`none`,Zh(e))}function u_(){let e=z(`modalHdr`);if(e.style.display=`block`,d_){__();return}if(Y&&Y.kind===`notes`){let t=Y.s,n=Y.items[0].k;e.textContent=Z.axis===`z`?`NOTE ${bf(yf(t,n))}  ·  Z = BACK TO SLIDING · LMB / RELEASE CONFIRM · RMB / ESC CANCEL`:`SLIDE · ${Q_(t.notes[n].f*t.perim/4)} INTO THE LOOP  ·  Z = NOTE UP / DOWN · CTRL ${V.snap?`FREE`:`SNAP`} · LMB / RELEASE CONFIRM · RMB / ESC CANCEL`;return}let t={G:`MOVE`,R:`ROTATE`,S:`SCALE`}[Z.type],n=Z.axis?` · ${Z.exclude?`PLANE ⊥`:`AXIS`} ${Z.axis.toUpperCase()}`:``,r=``;Z.type===`G`&&Z.val&&(r=`${Z.val.x.toFixed(2)} ${Z.val.y.toFixed(2)} ${Z.val.z.toFixed(2)}`),Z.type===`R`&&Z.val!==void 0&&(r=`${xt.radToDeg(Z.val).toFixed(1)}°`),Z.type===`S`&&Z.val&&(r=`${Z.val.x.toFixed(2)} ${Z.val.y.toFixed(2)} ${Z.val.z.toFixed(2)}`);let i=q?` · ${Q_(q.loopBars())}`:``;e.textContent=`${t} ${r}${n}${i}  ·  X/Y/Z AXIS · ⇧+AXIS PLANE · CTRL ${V.snap?`FREE`:`SNAP`} · LMB CONFIRM · RMB/ESC CANCEL`}var d_=null,f_=!1,p_=[.25,.5,1,2,4,8];function m_(e,t){if(t===`obj`){let t=e.group.position,n=e.base;return[t.x-n.x,t.y-n.y,t.z-n.z,...e.group.quaternion.toArray(),...e.group.scale.toArray()]}if(t===`notes`)return e.notes.flatMap(e=>[e.f,e.y]);let n=Array(e.n*6);for(let t=0;t<e.n*2;t++){let r=e.vert(t);n[t*3]=r.x,n[t*3+1]=r.y,n[t*3+2]=r.z}return n}function h_(){if(d_)return;let e,t;J===`object`?(e=`obj`,t=[...K]):(e=Ah===`p`?`notes`:`verts`,t=q?[q]:[]),t.length&&(d_={kind:e,t0:performance.now(),items:t.map(e=>({s:e,samples:[]}))},g_(),__())}function g_(){if(!d_)return;let e=(performance.now()-d_.t0)/1e3;d_.items.forEach(t=>t.samples.push({t:e,v:m_(t.s,d_.kind)}))}function __(){if(!d_)return;let e=z(`modalHdr`);e.style.display=`block`;let t=(performance.now()-d_.t0)/1e3/rf();e.textContent=`● RECORDING ${{obj:`OBJECT`,verts:`VERTICES`,notes:`NOTES`}[d_.kind]} MOTION  ${t.toFixed(2)} BAR  ·  RELEASE TO LOOP · ESC CANCEL`,e.style.borderColor=`#c8473b`,e.style.color=`#c8473b`}function v_(){let e=z(`modalHdr`);e.style.borderColor=``,e.style.color=``,Z||(e.style.display=`none`)}function y_(e){let t=d_;if(d_=null,v_(),!t||!e)return;t.items.forEach(e=>e.samples.push({t:(performance.now()-t.t0)/1e3,v:m_(e.s,t.kind)}));let n=t.items[0].samples.at(-1).t;if(n<.2)return;let r=n/rf(),i=p_.reduce((e,t)=>Math.abs(Math.log2(t/r))<Math.abs(Math.log2(e/r))?t:e);t.items.forEach(({s:e,samples:r})=>{let a=Ud(Math.round(i*64),16,512),o=[],s=0;for(let e=0;e<a;e++){let t=e/a*n;for(;s<r.length-2&&r[s+1].t<t;)s++;let i=r[s],c=r[Math.min(s+1,r.length-1)],l=c.t>i.t?Ud((t-i.t)/(c.t-i.t),0,1):0;o.push(i.v.map((e,t)=>e+(c.v[t]-e)*l))}let c=Math.floor(a*.88);for(let e=c;e<a;e++){let t=(e-c)/(a-c),n=t*t*(3-2*t);o[e]=o[e].map((e,t)=>e+(o[0][t]-e)*n)}let l;if(t.kind===`notes`){if(l=e.notes.map((e,t)=>t).filter(e=>o.some(t=>Math.abs(t[e*2]-o[0][e*2])+Math.abs(t[e*2+1]-o[0][e*2+1])>1e-4)),!l.length)return;if(o=o.map(e=>l.flatMap(t=>[e[t*2],e[t*2+1]])),e.closed)for(let e=0;e<l.length;e++)for(let t=1;t<o.length;t++)o[t][e*2]-=Math.round(o[t][e*2]-o[t-1][e*2])}else if(t.kind===`verts`){l=[];for(let t=0;t<e.n*2;t++){let e=0;for(let n of o)e=Math.max(e,Math.abs(n[t*3]-o[0][t*3])+Math.abs(n[t*3+1]-o[0][t*3+1])+Math.abs(n[t*3+2]-o[0][t*3+2]));e>1e-4&&l.push(t)}if(!l.length)return;o=o.map(e=>l.flatMap(t=>[e[t*3],e[t*3+1],e[t*3+2]]))}e.tracks[t.kind]={len:i,frames:o,idx:l},f_=!0,e.buildMotionLines()}),Q()}function b_(){let e=J===`edit`&&q?[q]:[...K],t=!1;e.forEach(e=>{Object.keys(e.tracks).length&&(e.tracks={},e.buildMotionLines(),t=!0)}),t&&(hg(),Q())}function x_(e,t){return!!(d_&&d_.kind===t&&d_.items.some(t=>t.s===e)||Y&&t===`obj`&&Y.kind===`object`&&Y.items.some(t=>t.s===e)||Y&&t===`verts`&&Y.kind===`edit`&&Y.s===e||Y&&t===`notes`&&Y.kind===`notes`&&Y.s===e)}function S_(e){if(f_)f_=!1;else if(e.kind===`notes`){let t=e.s,n=t.tracks.notes;if(!n)return;let r=new Map(e.items.map(({k:e,f:n,y:r})=>[e,[t.notes[e].f-n,t.notes[e].y-r]]));n.frames=n.frames.map(e=>e.map((e,t)=>{let i=r.get(n.idx[Math.floor(t/2)]);return i?e+i[t%2]:e}))}else if(e.kind===`edit`){let t=e.s,n=t.tracks.verts;if(!n)return;n.frames=n.frames.map(r=>r.map((r,i)=>{let a=n.idx[Math.floor(i/3)],o=i%3;return r+(t.vert(a).getComponent(o)-e.orig[a].getComponent(o))})),t.buildMotionLines()}}var C_=()=>4*uf.step,w_=()=>uf.thick,T_=[0,.25,.5,.75],E_=[1,3,5,7].map(e=>e/8),D_={kick:{label:`KICK`,desc:`square · every beat`,make:()=>({name:`Kick`,...em(4,1,w_()),sound:`stem_kick`,notes:$p(T_)})},clap:{label:`CLAP`,desc:`square · beats 2 + 4`,make:()=>({name:`Clap`,...em(4,1,w_()),sound:`stem_clap`,notes:$p([.25,.75])})},cymbal:{label:`CYMBAL`,desc:`square · offbeats`,make:()=>({name:`Cymbal`,...em(4,1,w_()),sound:`stem_cymbal`,notes:$p(E_)})},cym16:{label:`CYMBAL`,desc:`square · sixteenths`,make:()=>({name:`Cymbal`,...em(4,1,w_()),sound:`stem_cymbal`,notes:$p([...Array(16).keys()].map(e=>e/16))})},synth:{label:`SYNTH`,desc:`square · offbeats · F3`,make:()=>({name:`Synth`,...em(4,1,w_()),sound:`stem_synth`,notes:$p(E_),dy:C_()})},bass:{label:`BASS`,desc:`square · every beat`,make:()=>({name:`Bass`,...em(4,1,w_()),sound:`stem_bass`,notes:$p(T_)})}},O_=null;function k_(e,t){O_=dh===`3d`?Dg(e,t):null}var A_=e=>e-hf(e)*ff()+pf.plane*ff();function j_(e,t){let n=t??lh.target;e.anchor=bm(e.stack,n.x,n.z)}function M_(e){J===`edit`&&eg(`object`);let t=sm({...e,name:Jp(e.name),anchor:[0,0],dy:A_(e.dy??0)});return j_(t,O_),cg(t,!1),t}function N_(e){Qg(M_({...e===`rect`?{name:`Rectangle`,...tm(1.5,.5,w_())}:{name:rm(+e),...em(+e,1,w_())},sound:Ig,notes:[]}))}function P_(e){let t=M_(D_[e].make());hg(),dh===`top`&&Wh(`${t.name} · ${Q_(t.loopBars())} · ADDED TO THE COMMON CENTRE`)}function F_(e=!0){if(J!==`object`||!K.size)return;let t=[...K],n=[];K.clear(),t.forEach(e=>{let t=e.serialize();delete t.id,t.name=Jp(e.name.replace(/\.\d{3}$/,``)),t.below=null,t.anchor=xm(e);let r=sm(t);n.push(r),K.add(r)}),q=n[n.length-1],fm();let r=e&&dh===`3d`;n.forEach(e=>{r?e.fresh=!0:e.anchor=bm(e.stack,...e.anchor)}),hg(),Q(),r&&(Df.updateMatrixWorld(!0),o_(`G`),Wh(`MOVE THE COPY · CLICK TO DROP`))}var I_=null;function L_(){J===`object`&&K.size&&(I_=[...K].map(e=>({...e.serialize(),anchor:[...pm(e).anchor]})))}function R_(){if(!I_||J!==`object`)return;K.clear();let e=dh===`3d`?Dg(a_.x,a_.y):null;I_.forEach(t=>{let n=structuredClone(t);delete n.id,n.name=Jp(n.name.replace(/\.\d{3}$/,``)),n.below=null,n.anchor=[0,0],n.dy=A_(n.dy??0);let r=sm(n);j_(r,e),K.add(r),q=r}),hg(),Vh(),Q()}function z_(){J===`object`&&K.size&&([...K].forEach(cm),K.clear(),q=null,hg(),Vh(),Q())}function B_(e){let t=um.get(e.id),n=e.below==null,r=xm(e);t&&(t.below=e.below,n&&(t.anchor=e.anchor)),e.below=null,fm(),(!n||t)&&(e.anchor=bm(e.stack,...r))}function V_(){let e=J===`object`?[...K]:[];if(e.length<2){Wh(`CTRL+CLICK OR ⇧+CLICK TWO OR MORE LOOPS IN PLAYING ORDER, THEN CTRL+L`);return}let t=e[0];for(let n of e.slice(1))t.stack.includes(n)||(B_(n),n.below=t.stack.at(-1).id,n.anchor=null,fm());Sm(t.stack),hg(),Q(),Wh(`LINKED · ${t.stack.length} LOOPS · ${Q_(t.stack.reduce((e,t)=>e+t.loopBars(),0))} · ALT+L TAKES ONE OUT`)}function H_(e=[...K]){let t=e.filter(e=>e&&e.stack.length>1);t.length&&(t.forEach(B_),hg(),Q())}var U_=e=>H_([e]);function W_(e){Mh=e??!Mh,z(`playBtn`).textContent=Mh?`■ STOP`:`▶ PLAY`,z(`playBtn`).classList.toggle(`on`,Mh),Mh&&(nh.ensure(),Kv(null))}function G_(){J===`edit`?eg(`object`):q&&eg(`edit`)}function K_(){if(J===`edit`&&q&&Ah===`p`)q.notes.forEach((e,t)=>q.noteSel.add(t));else if(J===`edit`&&q)for(let e=0;e<q.n*2;e++)q.editSel.add(e);else W.forEach(e=>K.add(e)),q||=W[0]??null;Vh(),Q()}function q_(){J===`edit`&&q?(Ah===`p`?q.noteSel:q.editSel).clear():(K.clear(),q=null),Vh(),Q()}function J_(){if(J===`edit`&&q&&Ah===`p`)q.notes.forEach((e,t)=>q.noteSel.has(t)?q.noteSel.delete(t):q.noteSel.add(t));else if(J===`edit`&&q)for(let e=0;e<q.n*2;e++)q.editSel.has(e)?q.editSel.delete(e):q.editSel.add(e);else W.forEach(e=>K.has(e)?K.delete(e):K.add(e)),q=[...K][0]??null;Vh(),Q()}function Y_(){qv(-5e-4),Kv(null)}z(`pSw`).innerHTML=Xd.map(e=>`<button class="sw" data-fam="${e.key}" title="${e.label}" style="--c:${e.hex}"></button>`).join(``),z(`keySel`).innerHTML=Jd.map((e,t)=>`<option value="${t}">${e}</option>`).join(``),z(`modeSel`).innerHTML=qd.map((e,t)=>`<option value="${t}">${e[0]} · ${e[1]}</option>`).join(``),z(`presetList`).innerHTML=Object.entries(D_).map(([e,t])=>`<button data-preset="${e}"><span style="color:var(--fg)"><i style="background:${Qd(t.make().sound).hex}"></i>${t.label}</span><span>${t.desc}</span></button>`).join(``);var X_=()=>K.size?[...K]:q?[q]:[],Z_=z(`pSculptSound`);for(let e of tf){let t=document.createElement(`option`);t.value=`sculpt:${e.libraryId}`,t.textContent=e.name+(ef.some(t=>t.libraryId===e.libraryId)?``:` (in this Beatbox)`),Z_.append(t)}tf.length||(z(`pSculptStatus`).textContent=`Save a sound on the Sculpt page to use it here.`),Z_.addEventListener(`change`,async()=>{let e=Z_.value;if(!Yd[e]?.sculpt)return;let t=X_();if(t.length){nh.ensure(),t.forEach(t=>{t.sound=e}),Lg(e),hg(),Q(),z(`pSculptStatus`).textContent=`Preparing sound…`;try{await nh.prepareSculpt(e),z(`pSculptStatus`).textContent=`Ready`,q&&q.sound===e&&nh.preview(q)}catch(e){z(`pSculptStatus`).textContent=`Could not prepare sound: ${e.message}`}}}),z(`pFx`).innerHTML=Em.map(([e,t,n])=>`<div class="fader"><div class="top"><span>${t}</span><span style="display:flex;gap:8px;align-items:center"><span id="pfxv_${e}">0%</span>${n?`<select id="pfxr_${e}" style="padding:1px 3px;font-size:9px">${Dm.map(e=>`<option value="${e}">${e<1?`1/`+1/e:e} BAR</option>`).join(``)}</select>`:``}</span></div><input type="range" id="pfx_${e}" min="0" max="1" step="0.01"></div>`).join(``),Em.forEach(([e,,t])=>{let n=z(`pfx_`+e);n.addEventListener(`input`,()=>{X_().forEach(t=>t.fx[e]=+n.value),Q()}),n.addEventListener(`change`,()=>{hg(),n.blur()}),n.addEventListener(`dblclick`,()=>{X_().forEach(t=>t.fx[e]=0),hg(),Q()}),t&&z(`pfxr_`+e).addEventListener(`change`,t=>{X_().forEach(n=>n.fxRate[e]=+t.target.value),hg(),Q(),t.target.blur()})});function Q_(e){let t=e*16,n=Math.round(t);if(Math.abs(t-n)>.03)return`${e.toFixed(3)} BAR · OFF GRID`;if(n===0)return`0`;let r=Math.floor(n/16),i=n%16,a=16;for(;i&&i%2==0&&a>1;)i/=2,a/=2;let o=i?`${i}/${a}`:``;return r?`${r}${o?` + `+o:``} BAR${r>1||o?`S`:``}`:`${o} BAR`}function Q(){let e=q;if(z(`pEmpty`).style.display=e?`none`:``,z(`pBody`).style.display=e?``:`none`,!e)return;let t=K.size>1;z(`pName`).textContent=e.name+(t?`  +${K.size-1}`:``);let n=Qd(e.sound);document.querySelectorAll(`#pSw .sw`).forEach(e=>e.classList.toggle(`on`,e.dataset.fam===n.key)),z(`pFam`).textContent=n.label,z(`pFam`).title=n.label,z(`pSculptSound`).value=Yd[e.sound]?.sculpt?e.sound:``,z(`pMute`).checked=e.mute,z(`pNotes`).textContent=$_(e);let r=Object.entries(e.tracks).map(([e,t])=>`${{obj:`OBJECT`,verts:`VERTS`,notes:`NOTES`}[e]} ${t.len<1?t.len*4+` BEAT`:t.len+` BAR`}`);z(`pMotion`).textContent=r.length?r.join(` · `):`NONE · R WHILE DRAGGING`,z(`pMotionClear`).style.display=r.length?``:`none`,Em.forEach(([t,,n])=>{document.activeElement!==z(`pfx_`+t)&&(z(`pfx_`+t).value=e.fx[t]),z(`pfxv_`+t).textContent=Math.round(e.fx[t]*100)+`%`,n&&document.activeElement!==z(`pfxr_`+t)&&(z(`pfxr_`+t).value=e.fxRate[t])}),z(`pCorners`).textContent=e.n,tv()}function $_(e){let t=Yd[e.sound].root!==void 0,n=[];for(let{k:r}of e.hits().sort((t,n)=>(t.t+e.phaseOff)%1-(n.t+e.phaseOff)%1)){if(e.notes[r].mute)continue;let i=xf(e,r),a=t?bf(yf(e,r)):i?`${i>0?`+`:``}${i} ST`:`ORIGINAL`,o=n.at(-1);o&&o.t===a?o.c++:n.push({t:a,c:1})}let r=n.map(e=>e.c>1?`${e.t} ×${e.c}`:e.t);return r.length?r.length>6?r.slice(0,6).join(` · `)+` …`:r.join(` · `):`—`}function ev(e){let t=e.feat;if(!t)return``;let n=[Yd[e.sound].label],r=e.notes.filter(e=>!e.mute).length,i=e.notes.length-r;n.push(r?`${r} STEPS`+(i?` · ${i} REST${i>1?`S`:``}`:``):`SILENT`),e.closed||n.push(`THERE AND BACK`),e.phaseOff&&n.push(`STARTS ${Q_(e.phaseOff*e.loopBars())} LATE`);let a=[...e.L].slice(0,e.segs()),o=a.reduce((e,t)=>e+t,0)/a.length;return o>0&&a.some(e=>Math.abs(e-o)/o>.08)&&n.push(`SWING`),new Set(e.notes.map((t,n)=>yf(e,n))).size>1&&n.push(`MELODY`),t.room>.05&&n.push(`ROOM`),Em.forEach(([t,r])=>{e.fx[t]>.005&&n.push(`${r} ${Math.round(e.fx[t]*100)}%`)}),n.join(` · `)}function tv(){let e=q;if(!e)return;let t=e.loopBars();z(`pLoop`).textContent=`${Q_(t)} · ${(t*rf()).toFixed(2)} S`;let n=e.stack,r=n.reduce((e,t)=>e+t.stL,0);z(`pStack`).textContent=n.length>1?`${e.stackIdx+1} / ${n.length} · ${Q_(r)}`:`SINGLE`,z(`pUnstack`).style.display=e.below==null?`none`:``,z(`pChar`).textContent=ev(e)}document.querySelectorAll(`#pSw .sw`).forEach(e=>e.addEventListener(`click`,()=>{let t=Xd.find(t=>t.key===e.dataset.fam);X_().forEach(e=>{e.sound=t.sounds[0]}),Lg(t.sounds[0]),hg(),Q(),q&&nh.preview(q)})),z(`pMute`).addEventListener(`change`,e=>{X_().forEach(t=>t.mute=e.target.checked),hg(),e.target.blur()});function nv(e){J===`edit`&&eg(`object`);let t=X_();t.length&&(t.forEach(t=>im(t,e)),Df.updateMatrixWorld(!0),Vh(),Q(),hg())}z(`pNminus`).addEventListener(`click`,()=>q&&nv(q.n-1)),z(`pNplus`).addEventListener(`click`,()=>q&&nv(q.n+1)),z(`pMotionClear`).addEventListener(`click`,b_),z(`pUnstack`).addEventListener(`click`,()=>U_(q));var rv=()=>{J===`edit`&&eg(`object`),z_()};z(`pDelete`).addEventListener(`click`,rv),z(`delBtn`).addEventListener(`click`,rv),z(`keySel`).addEventListener(`change`,e=>{V.key=+e.target.value,Q(),e.target.blur()}),z(`modeSel`).addEventListener(`change`,e=>{V.mode=+e.target.value,Q(),e.target.blur()}),z(`gBpm`).addEventListener(`input`,e=>{V.bpm=+e.target.value,z(`gBpmV`).textContent=V.bpm,nh.ctx&&nh.delay.delayTime.setTargetAtTime(45/V.bpm,nh.ctx.currentTime,.05)}),z(`gBpm`).addEventListener(`change`,e=>e.target.blur()),z(`playBtn`).addEventListener(`click`,()=>W_()),z(`recBtn`).addEventListener(`click`,()=>G.on?ah():ih()),z(`expVid`).addEventListener(`click`,()=>G.video&&ch(G.video,G.video.type.includes(`mp4`)?`mp4`:`webm`)),z(`expWav`).addEventListener(`click`,()=>G.wav&&ch(G.wav,`wav`)),z(`modeBtn`).addEventListener(`click`,G_),document.querySelectorAll(`#selModes button`).forEach(e=>e.addEventListener(`click`,()=>tg(e.dataset.sm))),z(`mirrorBtn`).addEventListener(`click`,()=>{V.mirror=!V.mirror,z(`mirrorBtn`).classList.toggle(`on`,V.mirror)}),document.querySelectorAll(`#tools [data-gum]`).forEach(e=>e.addEventListener(`click`,()=>sg(e.dataset.gum))),document.querySelectorAll(`[data-view]`).forEach(e=>e.addEventListener(`click`,()=>xh(e.dataset.view))),z(`snapBtn`).addEventListener(`click`,()=>{V.snap=!V.snap,z(`snapBtn`).classList.toggle(`on`,V.snap),Vh()}),z(`frameBtn`).addEventListener(`click`,()=>J===`edit`?Dh():Eh(K.size?[...K]:W)),z(`padBtn`).addEventListener(`click`,()=>{V.trackpad=!V.trackpad,z(`padBtn`).classList.toggle(`on`,V.trackpad),_v()}),z(`polyBtn`).addEventListener(`click`,()=>X?Kg(!1):Rg()),z(`addBtn`).addEventListener(`click`,e=>{let t=e.target.getBoundingClientRect();k_(innerWidth/2,innerHeight/2),iv(t.right+10,t.top)}),z(`helpBtn`).addEventListener(`click`,()=>gv()),z(`helpClose`).addEventListener(`click`,()=>gv(!1));function iv(e,t){let n=z(`addMenu`);n.style.display=`block`,n.style.left=Math.min(e,innerWidth-290)+`px`,n.style.top=Math.max(10,Math.min(t,innerHeight-n.offsetHeight-10))+`px`}function av(){z(`addMenu`).style.display=`none`}document.querySelectorAll(`[data-preset]`).forEach(e=>e.addEventListener(`click`,()=>{av(),P_(e.dataset.preset)})),document.querySelectorAll(`[data-add]`).forEach(e=>e.addEventListener(`click`,()=>{av();let t=e.dataset.add;t===`poly`?Rg():N_(t)})),document.addEventListener(`pointerdown`,e=>{!e.target.closest(`#addMenu`)&&!e.target.closest(`#addBtn`)&&av()});var ov=!1,sv=!1,cv=`rest`,lv=e=>Math.round(e*100)+`%`,uv=e=>t=>t.toFixed(e)+` PX`,dv=e=>`×`+e.toFixed(2),fv=[[`HALO = REVERB · FLOOR GLOW`,[[`haloStr`,`STRENGTH`,0,2.5,.01,dv],[`haloSize`,`SIZE`,.3,2.5,.01,dv],[`floor`,`FLOOR GLOW · WHERE A STACK STANDS`,0,1,.01,lv]]],[`LINE WEIGHTS`,[[`pathW`,`PATH CURVE`,.5,5,.1,uv(1)],[`pathA`,`PATH OPACITY`,0,1,.01,lv],[`beadSize`,`BEADS · STEP / REST`,2,16,.5,uv(1)],[`connW`,`STACK CONNECTORS`,.4,4,.1,uv(1)]]],[`VOID`,[[`bg`,`GREY`,.5,1,.005,lv]]],[`FOCUS · EDIT MODE`,[[`focusBlur`,`BLUR AROUND THE EDITED FORM`,0,4,.05,dv]]],[`MILK · THE VOLUME`,[[`milkDen`,`DENSITY`,0,4,.01,dv],[`milkMax`,`OPACITY`,0,1,.01,lv],[`warm`,`WARMER WITH THICKNESS`,0,2,.01,dv],[`milkBlur`,`SOFTNESS`,0,8,.1,uv(1)],[`rim`,`RIM`,0,6,.05,dv],[`shadow`,`SHADOW`,0,1,.01,lv],[`shadowOff`,`SHADOW OFFSET`,0,20,.5,uv(1)]]],[`SATURATION`,[[`satRest`,`DEFAULT`,0,1,.01,lv,`rest`],[`satFull`,`FULL · ON HIT`,.3,1.6,.01,lv,`hit`]]],[`STAR · INSTRUMENT COLOUR`,[[`organA`,`OPACITY`,0,1,.01,lv],[`starSize`,`SIZE`,.2,1.2,.01,dv],[`starInner`,`CORE`,.05,.8,.01,dv],[`starArm`,`ARM WIDTH`,.05,.8,.01,dv],[`starThick`,`THICKNESS`,.1,1,.01,dv],[`layers`,`LAYERS`,1,6,1,e=>String(e)],[`layerGap`,`LAYER STEP`,.05,.4,.01,dv],[`starEdge`,`EDGE CRISPNESS`,.5,6,.1,dv],[`drift`,`DRIFT · AT FULL LEVEL`,0,3,.01,dv],[`organBlur`,`SOFTNESS`,0,6,.05,uv(2)],[`veil`,`SEEN THROUGH MILK`,0,1,.01,lv],[`restCol`,`COLOUR AT REST`,0,1,.01,lv,`rest`],[`organFlare`,`ARM FLARE ON HIT`,0,1,.01,lv,`hit`]]],[`DOT · INK`,[[`dotSize`,`DOT`,3,20,.5,uv(1)],[`lit`,`LIGHT-UP ON A CORNER`,0,2,.01,dv,`hit`],[`litFade`,`LIGHT-UP FADE`,.02,1,.01,e=>Math.round(e*1e3)+` MS`,`pulse`],[`trail`,`TRAIL`,0,4,.05,e=>e.toFixed(2)+` BEAT`],[`trailW`,`TRAIL WIDTH`,1,24,.5,uv(1)],[`inkBlur`,`BLEED SOFTNESS`,0,8,.1,uv(1)],[`bleed`,`BLEED`,0,1.5,.01,dv],[`core`,`CRISP CORE`,0,6,.1,uv(1)],[`pool`,`INK POOL AT A CORNER`,0,4,.05,e=>e.toFixed(2)+` BEAT`,`pulse`]]],[`GRID · 1/16 DOTS`,[[`field`,`DOT FIELD IN EVERY CELL`,0,1,.01,lv]]]];z(`fxBody`).innerHTML=fv.map(([e,t])=>`<div class="sec">— ${e}</div>`+t.map(([e,t,n,r,i])=>`<div class="fader"><div class="top"><span>${t}</span><span id="fxv_${e}"></span></div><input type="range" id="fx_${e}" min="${n}" max="${r}" step="${i}"></div>`).join(``)).join(``);function pv(){fv.forEach(([,e])=>e.forEach(([e,,,,,t])=>{let n=z(`fx_`+e);document.activeElement!==n&&(n.value=H[e]),z(`fxv_`+e).textContent=t(H[e])})),document.querySelectorAll(`[data-pv]`).forEach(e=>e.classList.toggle(`on`,e.dataset.pv===cv))}function mv(e){cv=e,Jv(1e9),pv()}fv.forEach(([,e])=>e.forEach(([e,,,,,,t])=>{let n=z(`fx_`+e);n.addEventListener(`input`,()=>{H[e]=+n.value,t&&cv!==t&&mv(t),pv(),of()}),n.addEventListener(`change`,()=>n.blur())})),document.querySelectorAll(`[data-pv]`).forEach(e=>e.addEventListener(`click`,()=>mv(e.dataset.pv))),z(`fxReset`).addEventListener(`click`,()=>{Object.assign(H,af),of(),pv()}),z(`fxCopy`).addEventListener(`click`,()=>{let e=JSON.stringify(Object.fromEntries(Object.entries(H).map(([e,t])=>[e,+t.toFixed(3)]))),t=()=>Wh(`LOOK SETTINGS COPIED · PASTE THEM TO MAKE THEM THE DEFAULTS`),n=()=>{let n=document.createElement(`textarea`);n.value=e,document.body.appendChild(n),n.select();try{document.execCommand(`copy`),t()}catch{Wh(e,8e3)}n.remove()};navigator.clipboard?.writeText?navigator.clipboard.writeText(e).then(t,n):n()}),z(`fxClose`).addEventListener(`click`,()=>hv(!1));function hv(e){ov!==sv&&(sv=!1,W.forEach(e=>e.flare=0),of(),z(`fx`).style.display=`none`,z(`tools`).style.display=``,Vh(),_v())}function gv(e){let t=z(`help`),n=e??t.style.display!==`flex`;t.style.display=n?`flex`:`none`}var $=(e,t)=>`<span><b>${e}</b> ${t}</span>`;function _v(){let e;e=sv?[$(`N / ESC`,`CLOSE & RESUME`),$(`REST · HIT · PULSE`,`PREVIEW`),$(`MMB / WHEEL`,`LOOK AROUND`),$(`RESET · COPY`,`DEFAULTS · SHARE VALUES`)]:Yg?[$(`LMB ON THE OUTLINE`,`PLACE A NOTE · SNAPS 1/16`),$(`LMB ON A NOTE`,`TAKE IT AWAY`),$(`ENTER / RMB`,`DONE`),$(`⌫`,`UNDO NOTE`),$(`CTRL`,V.snap?`FREE`:`SNAP`),$(`ESC`,`DROP THE FORM`)]:X?[$(`LMB`,`PLACE POINT · PLAYS AS YOU DRAW`),$(`CLICK 1ST POINT`,`CLOSE = LOOP`),$(`ENTER / RMB`,`DONE · OPEN = THERE AND BACK`),$(`⌫`,`UNDO POINT`),$(`CTRL`,V.snap?`FREE`:`SNAP`),$(`ESC`,`CANCEL`)]:J===`edit`&&Ah===`p`?[$(`1/2/3`,`POINTS/VERTS/EDGES`),$(`LMB ON THE PATH`,`ADD A NOTE`),$(`LMB ON A NOTE`,`SELECT · ⇧ ADD`),$(`DRAG / G`,`SLIDE · SNAPS 1/16`),$(`Z`,`NOTE UP / DOWN`),$(`M`,`MUTE`),$(`X`,`DELETE`),$(`R WHILE DRAGGING`,`LOOP MOTION`),$(`TAB`,`OBJECT MODE`)]:J===`edit`?[$(`1/2/3`,`POINTS/VERTS/EDGES`),$(`LMB`,`SELECT`),$(`A`,`ALL`),$(`G/R/S`,`GRAB/ROT/SCALE · RESHAPE`),$(`R WHILE DRAGGING`,`LOOP MOTION`),$(`TAB`,`OBJECT MODE`)]:dh===`top`?[$(`LMB`,`SELECT · CLICK AGAIN TO CYCLE`),$(`⇧A`,`ADD`),$(`POLYGON`,`DRAW ON THE GRID`),$(`S`,`SCALE · SNAPS TO 1/16`),$(`TAB`,`EDIT`),$(`MMB / WHEEL`,`PAN / ZOOM`),$(`NUM 5`,`3D`),$(`SPACE`,`PLAY`)]:[$(`LMB`,`SELECT`),$(`⇧A`,`ADD`),$(`G`,`MOVE`),$(`CTRL LMB · CTRL L`,`LINK IN CLICK ORDER`),$(`TAB`,`EDIT`),V.trackpad?$(`2-FINGER`,`ORBIT · ⇧ PAN · PINCH ZOOM`):$(`MMB`,`ORBIT · ⇧ PAN`),$(`ALT WHEEL`,`PLANE`),$(`NUM 7`,`TOP`),$(`SPACE`,`PLAY`)],z(`hint`).innerHTML=e.join(``)}var vv=[[`NAVIGATE`,[[`NUMPAD 7 · 5`,`TOP · 3D`],[`MMB DRAG`,`ORBIT (3D) · PAN (TOP)`],[`⇧ + MMB`,`PAN`],[`WHEEL`,`ZOOM`],[`ALT + WHEEL`,`WORK PLANE · OCTAVE UP / DOWN`],[`ALT + LMB`,`ORBIT (NO MMB)`],[`NUMPAD . / HOME`,`FRAME SEL / ALL`]]],[`FORMS & STACKS`,[[`LMB / ⇧ OR CTRL LMB`,`SELECT / ADD (IN ORDER)`],[`⇧ A`,`ADD (1 BAR) · THEN PLACE NOTES · ENTER`],[`G · R · S`,`MOVE · ROTATE · SCALE`],[`→ X / Y / Z`,`LOCK AXIS (⇧ = PLANE)`],[`CTRL L`,`LINK LOOPS · PLAY IN CLICK ORDER`],[`ALT L · UNSTACK`,`TAKE A LOOP OUT`],[`HEIGHT`,`PITCH · A PLANE PER OCTAVE`],[`↑ · ↓`,`FORM AN OCTAVE UP · DOWN (THE PLANE FOLLOWS)`],[`G UP / DOWN`,`WHOLE FORM: OCTAVE · EDIT: SCALE STEP`],[`⇧ D · CTRL C/V`,`DUPLICATE · COPY/PASTE`],[`X / DEL · CTRL Z`,`DELETE · UNDO`]]],[`EDIT & SOUND`,[[`TAB / DBL-CLICK`,`EDIT MODE`],[`1 · 2 · 3`,`POINTS · VERTS · EDGES`],[`A · ALT A · CTRL I`,`ALL · NONE · INVERT`],[`LMB ON THE PATH (1)`,`ADD A NOTE · LMB NOTE SELECT`],[`DRAG / G · THEN Z`,`SLIDE · NOTE UP / DOWN`],[`CTRL WHILE MOVING`,`INVERT SNAP`],[`M · X (POINTS)`,`MUTE · DELETE NOTES`],[`R WHILE DRAGGING`,`RECORD MOTION LOOP`],[`ALT R`,`CLEAR MOTION`],[`SPACE · ⇧ ←`,`PLAY · RESTART`],[`⇧ N · T · F1`,`PANELS · THIS SHEET`]]]].map(([e,t])=>`<div style="display:block;border:none;padding:0"><h4>${e}</h4>${t.map(([e,t])=>`<div><span>${e}</span><span>${t}</span></div>`).join(``)}</div>`).join(``);z(`keysStart`).innerHTML=vv,z(`keysHelp`).innerHTML=vv;var yv=null,bv=null,xv=!1;Ef.addEventListener(`contextmenu`,e=>e.preventDefault()),Ef.addEventListener(`pointerdown`,e=>{if(Nh){if(Ef.focus(),a_.x=e.clientX,a_.y=e.clientY,xv=e.ctrlKey||e.metaKey,Z)l_(e.button===0);else if(e.button===1||e.button===0&&e.altKey)hh(null),wh(null),yv={type:e.shiftKey||dh===`top`?`pan`:e.ctrlKey?`zoom`:`orbit`,x:e.clientX,y:e.clientY},Ef.setPointerCapture(e.pointerId),e.preventDefault();else if(!(mh||sv)){if(Yg)e.button===2?r_():e.button===0&&t_(e.clientX,e.clientY);else if(X){if(e.button===2){Kg(!1);return}e.button===0&&Wg(e.clientX,e.clientY)}else e.button===0&&(Lh.dragging||Lh.axis!==null||(J!==`edit`||Ah!==`p`||e.ctrlKey||!ig(e.clientX,e.clientY,e.shiftKey))&&(bv={x0:e.clientX,y0:e.clientY,x1:e.clientX,y1:e.clientY,moved:!1,shift:e.shiftKey,ctrl:e.ctrlKey||e.metaKey},Ef.setPointerCapture(e.pointerId)))}}}),Ef.addEventListener(`pointermove`,e=>{if(a_.x=e.clientX,a_.y=e.clientY,xv=e.ctrlKey||e.metaKey,Z)c_();else if(X&&Ug(),Yg&&e_(),yv){let t=e.clientX-yv.x,n=e.clientY-yv.y;yv.x=e.clientX,yv.y=e.clientY,yv.type===`orbit`?(lh.theta-=t*.006,lh.phi=Ud(lh.phi-n*.006,.001,Math.PI-.001)):yv.type===`pan`?Oh(t,n):kh(Math.exp(n*.006))}else if(bv&&(bv.x1=e.clientX,bv.y1=e.clientY,!bv.moved&&Math.hypot(bv.x1-bv.x0,bv.y1-bv.y0)>5&&(bv.moved=!0),bv.moved)){let e=z(`box`);e.style.display=`block`,e.style.left=Math.min(bv.x0,bv.x1)+`px`,e.style.top=Math.min(bv.y0,bv.y1)+`px`,e.style.width=Math.abs(bv.x1-bv.x0)+`px`,e.style.height=Math.abs(bv.y1-bv.y0)+`px`}}),Ef.addEventListener(`pointerup`,e=>{if(yv){yv=null;return}if(Z&&Z.drag&&e.button===0){l_(!0);return}if(!bv)return;let t=bv;bv=null,z(`box`).style.display=`none`,t.moved?Cv(t):Sv(e.clientX,e.clientY,t.shift||t.ctrl&&J===`object`)});function Sv(e,t,n){if(J===`object`){let r=Eg(e,t);cg(r?r.shape:null,n)}else if(Ah===`p`)rg(e,t,n);else{let r=Og(e,t),i=q.editSel;if(!r)n||i.clear();else if(n){let e=r.every(e=>i.has(e));r.forEach(t=>e?i.delete(t):i.add(t))}else i.clear(),r.forEach(e=>i.add(e));Vh()}}function Cv(e){let t=Math.min(e.x0,e.x1),n=Math.max(e.x0,e.x1),r=Math.min(e.y0,e.y1),i=Math.max(e.y0,e.y1),a=e=>e.z<1&&e.x>=t&&e.x<=n&&e.y>=r&&e.y<=i;if(J===`object`)!e.shift&&!e.ctrl&&K.clear(),W.forEach(t=>{let n=t.group.matrixWorld;[...Array(t.n*2).keys()].some(e=>a(Sg(t.vert(e).clone().applyMatrix4(n))))&&(e.ctrl?K.delete(t):(K.add(t),Ph(t)))}),K.has(q)||Ph([...K].pop()??null);else if(Ah===`p`){let t=q,n=t.group.matrixWorld;!e.shift&&!e.ctrl&&t.noteSel.clear(),t.notes.forEach((r,i)=>{a(Sg(t.notePos(i,B()).applyMatrix4(n)))&&(e.ctrl?t.noteSel.delete(i):t.noteSel.add(i))})}else{let t=q,n=t.group.matrixWorld;!e.shift&&!e.ctrl&&t.editSel.clear();let r=[...Array(t.n*2).keys()].filter(e=>a(Sg(t.vert(e).clone().applyMatrix4(n)))),i=r;if(Ah===`e`){let e=new Set(r);i=lg(t).filter(([t,n])=>e.has(t)&&e.has(n)).flat()}i.forEach(n=>e.ctrl?t.editSel.delete(n):t.editSel.add(n))}Vh(),Q()}Ef.addEventListener(`dblclick`,e=>{if(!(!Nh||Z||X||Yg||mh)){if(J===`object`){Tg(null);let t=Eg(e.clientX,e.clientY);t&&(cg(t.shape,!1),eg(`edit`))}else(Ah===`p`?ng(e.clientX,e.clientY)<0:!Og(e.clientX,e.clientY))&&eg(`object`)}});var wv=0,Tv=0;Ef.addEventListener(`wheel`,e=>{if(e.preventDefault(),!Nh)return;if(e.altKey){let t=e.deltaMode===1?e.deltaY*33:e.deltaY;performance.now()-Tv>300&&(wv=0),Tv=performance.now(),wv+=t,Math.abs(wv)>=50&&(Hh(pf.plane-Math.sign(wv)),wv=0);return}if(hh(null),wh(null),e.ctrlKey){kh(Math.exp(e.deltaY*.01));return}if(V.trackpad){e.shiftKey||dh===`top`?Oh(-e.deltaX,-e.deltaY):(lh.theta+=e.deltaX*.004,lh.phi=Ud(lh.phi+e.deltaY*.004,.001,Math.PI-.001));return}let t=e.deltaMode===1?e.deltaY*33:e.deltaY;kh(Math.exp(t*.0012))},{passive:!1}),addEventListener(`keyup`,e=>{xv=e.ctrlKey||e.metaKey}),addEventListener(`keydown`,e=>{if(e.target.closest&&e.target.closest(`input,select,textarea`)){e.key===`Escape`&&e.target.blur();return}if(!Nh){(e.code===`Enter`||e.code===`Space`)&&(e.preventDefault(),Ev());return}let t=e.code,n=e.ctrlKey||e.metaKey;if(xv=n,t===`F1`)e.preventDefault(),gv();else if(z(`help`).style.display===`flex`&&t===`Escape`)gv(!1);else if(sv)(t===`KeyN`&&!e.shiftKey||t===`Escape`)&&hv(!1),e.preventDefault();else if(t===`KeyR`&&!e.repeat&&!e.altKey&&!n&&(Lh.dragging||Z))e.preventDefault(),h_();else if(t===`Escape`&&d_&&Lh.dragging)y_(!1);else if(Z){if(e.preventDefault(),Z.drag&&t!==`KeyZ`&&[`KeyX`,`KeyY`].includes(t))return;if(Z.type!==`H`&&[`KeyX`,`KeyY`,`KeyZ`].includes(t)){let n=t[3].toLowerCase();Z.axis===n&&Z.exclude===e.shiftKey?Z.axis=null:(Z.axis=n,Z.exclude=e.shiftKey),c_()}else t===`Escape`?l_(!1):t===`Enter`||t===`NumpadEnter`||t===`Space`?l_(!0):(t===`ControlLeft`||t===`ControlRight`||t===`MetaLeft`)&&c_()}else{if(Yg){if(t===`Enter`||t===`NumpadEnter`){e.preventDefault(),r_();return}if(t===`Escape`){i_();return}if(t===`Backspace`||n&&t===`KeyZ`){e.preventDefault(),n_();return}}if(X){if(t===`Escape`){qg();return}if(t===`Enter`||t===`NumpadEnter`){e.preventDefault(),Kg(!1);return}if(t===`Backspace`||n&&t===`KeyZ`){e.preventDefault(),Gg();return}}if(n){if(t===`KeyL`){e.preventDefault(),V_();return}t===`KeyZ`?(e.preventDefault(),e.shiftKey?yg():vg()):t===`KeyY`?(e.preventDefault(),yg()):t===`KeyC`?L_():t===`KeyV`?R_():t===`KeyI`&&(e.preventDefault(),J_())}else switch(t){case`Space`:e.preventDefault(),W_();break;case`Tab`:e.preventDefault(),G_();break;case`KeyA`:e.preventDefault(),e.shiftKey?(k_(a_.x,a_.y),iv(a_.x,a_.y)):e.altKey?q_():K_();break;case`KeyG`:o_(`G`);break;case`KeyR`:e.altKey?(e.preventDefault(),b_()):o_(`R`);break;case`KeyS`:o_(`S`);break;case`KeyD`:e.shiftKey&&F_();break;case`KeyL`:e.altKey&&(e.preventDefault(),H_());break;case`KeyX`:case`Delete`:J===`edit`?Ah===`p`&&og():z_();break;case`KeyM`:J===`edit`&&Ah===`p`&&ag();break;case`KeyN`:e.shiftKey?z(`props`).style.display=z(`props`).style.display===`none`?``:`none`:hv();break;case`KeyT`:z(`tools`).style.display=z(`tools`).style.display===`none`?``:`none`;break;case`Digit1`:J===`edit`&&tg(`p`);break;case`Digit2`:J===`edit`&&tg(`v`);break;case`Digit3`:J===`edit`&&tg(`e`);break;case`Numpad7`:xh(dh===`top`?`3d`:`top`);break;case`Numpad5`:case`Numpad1`:case`Numpad3`:xh(`3d`);break;case`Numpad4`:dh===`3d`&&Th({theta:lh.theta-Math.PI/12});break;case`Numpad6`:dh===`3d`&&Th({theta:lh.theta+Math.PI/12});break;case`Numpad8`:dh===`3d`&&Th({phi:Ud(lh.phi-Math.PI/12,.001,Math.PI-.001)});break;case`Numpad2`:dh===`3d`&&Th({phi:Ud(lh.phi+Math.PI/12,.001,Math.PI-.001)});break;case`NumpadAdd`:kh(.85);break;case`NumpadSubtract`:kh(1/.85);break;case`NumpadDecimal`:case`Period`:J===`edit`?Dh():Eh(K.size?[...K]:W);break;case`Home`:Eh(W);break;case`ArrowLeft`:e.shiftKey&&Y_();break;case`ArrowUp`:case`ArrowDown`:e.preventDefault(),Uh(t===`ArrowUp`?1:-1);break;case`Escape`:av()}}});function Ev(){Nh||(Fh(!0),nh.ensure(),z(`start`).style.display=`none`,$d||Y_(),W_(!0),_v())}z(`beginBtn`).addEventListener(`click`,Ev),V.bpm=132,V.key=10,V.mode=4;{let e=uf.thick,t=4*uf.step,n=[0,.25,.5,.75],r=[1,3,5,7].map(e=>e/8);[{name:`Kick`,...em(4,1,e),sound:`stem_kick`,notes:$p(n),anchor:[-3,-.25]},{name:`Clap`,...em(4,1,e),sound:`stem_clap`,notes:$p([.25,.75]),anchor:[-1.5,.75]},{name:`Cymbal`,...em(4,1,e),sound:`stem_cymbal`,notes:$p(r),anchor:[0,1.25]},{name:`Synth`,...em(4,1,e),sound:`stem_synth`,notes:$p(r),dy:t,anchor:[1.5,.75]},{name:`Bass`,...em(4,1,e),sound:`stem_bass`,notes:$p(n),anchor:[3,-.25]}].forEach(e=>sm({...e,name:Jp(e.name)}))}z(`keySel`).value=V.key,z(`modeSel`).value=V.mode,z(`gBpm`).value=V.bpm,z(`gBpmV`).textContent=V.bpm,lh.target.set(0,.5,.3),lh.radius=10.5,lh.theta=0,lh.phi=1.15,pg(mg()),sg(`translate`),tg(`v`),Q(),_v(),bh();function Dv(){let e=new Set(W.map(e=>e.sound));return{revision:1,shapes:mg(),settings:{...V},instruments:[...e].flatMap(e=>Yd[e]?.sculpt?[Yd[e].sculpt]:[]),view:{target:lh.target.toArray(),radius:lh.radius,theta:lh.theta,phi:lh.phi,mode:dh,top:{...uh}},plane:pf.plane,bars:Hv,selected:[...K].map(e=>e.id),active:q?.id??null,editMode:J}}var Ov=null;function kv(){let e=Dv(),t=JSON.stringify(e);if(t===Ov)return;let n=kd(localStorage,e);n&&(Ov=t),z(`sceneSaveStatus`).textContent=n?`Saved locally`:`Could not save scene`,n||console.warn(`Beatbox scene could not be saved.`)}queueMicrotask(()=>{$d&&(Object.assign(V,$d.settings),gg($d.shapes),lh.target.fromArray($d.view.target),Object.assign(lh,{radius:$d.view.radius,theta:$d.view.theta,phi:$d.view.phi}),Object.assign(uh,$d.view.top),$d.view.mode===`top`&&xh(`top`),pf.plane=$d.plane,pf.y=pf.plane*uf.step*7,qv($d.bars),Kv(null),K.clear(),W.filter(e=>$d.selected?.includes(e.id)).forEach(e=>K.add(e)),Ph(W.find(e=>e.id===$d.active)??null),$d.editMode===`edit`&&q&&eg(`edit`),pg(mg()));let e=Ad(localStorage);jd(localStorage),e&&(z(`start`).style.display=`none`,Fh(!0),W_(!1)),z(`keySel`).value=V.key,z(`modeSel`).value=V.mode,z(`gBpm`).value=V.bpm,z(`gBpmV`).textContent=V.bpm,z(`snapBtn`).classList.toggle(`on`,V.snap),z(`padBtn`).classList.toggle(`on`,V.trackpad);for(let e of new Set(W.map(e=>e.sound)))Yd[e]?.sculpt&&nh.prepareSculpt(e).catch(t=>{q?.sound===e&&(z(`pSculptStatus`).textContent=`Could not prepare sound: ${t.message}`),console.warn(`sculpt sound render failed`,t)});z(`sceneSaveStatus`).textContent=$d?`Scene restored`:`New scene`,Q(),_v(),bh(),Ov=JSON.stringify($d||Dv()),setInterval(()=>{document.hidden||kv()},1500)}),addEventListener(`pagehide`,()=>{kv(),nh.ctx?.suspend()}),document.querySelectorAll(`#soundsculpt-pages a`).forEach(e=>e.addEventListener(`click`,kv)),document.addEventListener(`visibilitychange`,()=>{document.hidden&&(kv(),W_(!1),nh.ctx?.suspend())}),addEventListener(`pageshow`,e=>{e.persisted&&(W_(!1),Kv(null))}),document.addEventListener(`change`,kv);function Av(){dm.forEach(e=>{let t=0;e.forEach(e=>{e.stS=t,e.stL=Math.max(e.loopBars(),1/64),t+=e.stL}),e.T=t})}function jv(e){dm.forEach(t=>{let n=(e%t.T+t.T)%t.T,r=t.length-1;for(let e=0;e<t.length;e++)if(n<t[e].stS+t[e].stL){r=e;break}t.forEach((e,t)=>{e.stackActive=t===r,t===r&&(e.localPh=Ud((n-e.stS)/e.stL,0,.99999))})})}function Mv(e,t,n,r,i){let a=e.T;if(!(a>0)||n<=t)return;let o=e=>r+(e-t)/(n-t)*i;e.forEach(e=>{for(let r of e.hits()){if(e.notes[r.k].mute)continue;let i=e.stS+(r.t+e.phaseOff)%1*e.stL,s=i+(Math.floor((t-i)/a)+1)*a;for(let t=0;s<=n&&t<64;s+=a,t++)e.hit(r.k,o(s))}})}var Nv=Pf({color:4930379,linewidth:1.2,transparent:!0,opacity:.45}),Pv=Pf({color:4930379,linewidth:1.2,transparent:!0,opacity:.35,dashed:!0,dashSize:.07,gapSize:.06}),Fv=new Qu(new Mu,Nv),Iv=new Qu(new Mu,Pv);[Fv,Iv].forEach(e=>{e.layers.set(3),e.frustumCulled=!1,e.visible=!1,Df.add(e)});var Lv=``;function Rv(){let e=[],t=[],n=(e,t,n)=>{let r=B(),i=B();for(let a=0;a<24;a++)Hp(e,t,a/24,r),Hp(e,t,(a+1)/24,i),n.push(r.x,r.y,r.z,i.x,i.y,i.z)};dm.forEach(r=>{if(r.length<2)return;let i=r.map(e=>Up(e));for(let t=0;t<r.length-1;t++)n(i[t],i[t+1],e);n(i[r.length-1],i[0],t)});let r=e.concat(t).map(e=>e.toFixed(3)).join();r!==Lv&&(Lv=r,Fv.visible=e.length>0,Iv.visible=t.length>0,e.length&&(Fv.geometry.dispose(),Fv.geometry=new Mu,Fv.geometry.setPositions(e)),t.length&&(Iv.geometry.dispose(),Iv.geometry=new Mu,Iv.geometry.setPositions(t),Iv.computeLineDistances()))}var zv=null,Bv=performance.now(),Vv=0,Hv=-5e-4,Uv=0,Wv=0,Gv=uf.thick;function Kv(e){zv=e}function qv(e){Hv=e}function Jv(e){Uv=e}function Yv(){return nh.ctx?nh.ctx.currentTime:performance.now()/1e3}var Xv=0;function Zv(e){requestAnimationFrame(Zv);let t=Math.min(.1,(e-Bv)/1e3);Bv=e,Sh(t),sv||(Wv+=t);let n=Yv()+Kd;zv===null&&(zv=n);let r=n-zv;r<0&&(r=0),r>.6&&(r=0);let i=n-r;zv=n;let a=rf(),o=Hv;Mh&&r>0&&(Hv+=r/a);let s=Hv-Kd/a;d_&&(g_(),__()),fm(),uf.thick!==Gv&&(Gv=uf.thick,W.forEach(e=>{Xp(e),e.rebuild()})),W.forEach(e=>e.applyTracks(s)),Tm(fh),W.forEach(e=>e.measure());let c=ff(),l=pf.y;pf.y+=(pf.plane*c-pf.y)*(1-Math.exp(-t/.045)),Math.abs(pf.plane*c-pf.y)<.001&&(pf.y=pf.plane*c),pf.y!==l&&(lh.target.y+=pf.y-l,bh());let u=0,d=0,f=4;W.forEach(e=>e.ringW.forEach(e=>{u=Math.max(u,e.y),d=Math.min(d,e.y),f=Math.max(f,Math.hypot(e.x,e.z)+2)})),Ap(c,Ud(Math.min(pf.plane,hf(d)),mf.lo,0),Ud(Math.max(pf.plane,Math.ceil(u/c),1),1,mf.hi),pf.plane,pf.y,f,.5*fh),kp(.55*fh),Av(),jv(s),Mh&&r>0&&dm.forEach(e=>Mv(e,o,Hv,i,r));let p=Yv();for(let e=eh.length-1;e>=0;e--){let t=eh[e];t.t<=p&&(t.s.lightUp(t.i),t.s.flare=1,t.s.flareTau=Math.max(.05,t.dur*.5),cf(Cf(Qd(t.s.sound).hex,t.semis,t.s.flareCol),H.satFull),eh.splice(e,1))}let m=t;if(sv){let e=e=>cf(Cf(Qd(e.sound).hex,xf(e),e.flareCol),H.satFull),n=e=>e.notes.forEach((t,n)=>{t.mute||e.lightUp(n)});cv===`rest`?(m=0,W.forEach(e=>{e.flare=0,e.lightClear()})):cv===`hit`?(m=0,W.forEach(t=>{t.idle||(t.flare=1,e(t),n(t))})):(Uv+=t)>=rf()/4&&(Uv=0,W.forEach(t=>{t.idle||(t.flare=1,e(t),n(t))}))}if(Nv.linewidth=H.connW,Pv.linewidth=H.connW,W.forEach(e=>{e.update(m,K.has(e),e===q,s,fh),e.mlObj&&e.mlObj.position.copy(e.base)}),Rv(),nh.listener(),!Lh.dragging&&!Z&&(J===`edit`||K.size)){let e=Bh();e&&Lh.object&&Ih.position.copy(e)}if(Fg(),Xv+=((J===`edit`&&q?1:0)-Xv)*(1-Math.exp(-t/.08)),jp(dh===`top`||mh?.74:.8,q&&Xv>.01?{obj:q.milk,amt:Xv}:null,J===`object`?[...K].map(e=>({obj:e.mesh,act:e===q})):[]),(Vv+=t)>.25){if(Vv=0,tv(),z(`info`).textContent=`PLANE ${pf.plane>0?`+`:``}${pf.plane} · ${W.length} FORMS${dm.some(e=>e.length>1)?` · ${dm.filter(e=>e.length>1).length} LINKED`:``} · ${Mh?`PLAYING`:`STOPPED`} · ${V.bpm} BPM · BAR ${Math.max(0,Math.floor(Hv))+1}`,G.on){let e=(performance.now()-G.t0)/1e3;z(`recTime`).textContent=`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`}else z(`recTime`).textContent=``}}requestAnimationFrame(Zv),addEventListener(`resize`,()=>{kf.aspect=innerWidth/innerHeight,kf.updateProjectionMatrix(),U.setSize(innerWidth,innerHeight),ip(),Nf.forEach(e=>e.resolution.set(innerWidth,innerHeight))});