import { makeDocument, validateDocument } from './model.js';
const KEY='sound-form:session:v1';
export class Store {
  constructor(){this.listeners=new Set();this.document=makeDocument();this.saved=[];try{const data=JSON.parse(localStorage.getItem(KEY));if(data?.document)this.document=validateDocument(data.document);if(Array.isArray(data?.saved))this.saved=data.saved.slice(0,40).map(validateDocument);}catch{/* Invalid or unavailable storage starts clean. */}this.initial=structuredClone(this.document);this.undoStack=[];this.redoStack=[];this.checkpoint=null;}
  subscribe(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);}
  emit(kind='change'){for(const fn of this.listeners)fn(this.document,kind);clearTimeout(this.persistTimer);this.persistTimer=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify({document:this.document,saved:this.saved}));}catch{}},200);}
  begin(){if(!this.checkpoint)this.checkpoint=structuredClone(this.document);}
  commit(){if(this.checkpoint&&JSON.stringify(this.checkpoint)!==JSON.stringify(this.document)){this.undoStack.push(this.checkpoint);if(this.undoStack.length>60)this.undoStack.shift();this.redoStack=[];}this.checkpoint=null;this.emit('commit');}
  edit(fn,kind='change'){this.begin();fn(this.document);this.emit(kind);}
  transaction(fn,kind='load'){this.begin();fn(this.document);this.commit();this.emit(kind);}
  load(document){const next=validateDocument(document);this.begin();this.document=next;this.initial=structuredClone(next);this.commit();this.emit('load');}
  undo(){if(!this.undoStack.length)return;this.redoStack.push(structuredClone(this.document));this.document=this.undoStack.pop();this.checkpoint=null;this.emit('load');}
  redo(){if(!this.redoStack.length)return;this.undoStack.push(structuredClone(this.document));this.document=this.redoStack.pop();this.checkpoint=null;this.emit('load');}
  save(name){const doc=structuredClone(this.document);doc.name=name.trim().slice(0,60)||'Untitled';this.document.name=doc.name;this.saved.unshift(doc);this.saved=this.saved.slice(0,40);this.emit('save');}
}
