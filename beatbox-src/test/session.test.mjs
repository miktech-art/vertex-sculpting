import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SESSION_KEY, readSession, saveSession, validSession, introSeen, markIntroSeen } from '../src/lib/session.js';
const fixture = () => ({
  revision:1,
  shapes:[{id:1,name:'My box',sound:'sculpt:one',bottom:[[0,0,0],[1,0,0],[1,0,1]],top:[[0,.5,0],[1,.5,0],[1,.5,1]],quat:[0,0,0,1],scale:[1,1,1],dy:0,anchor:[1,2],notes:[{f:.25,y:.5,mute:false}],fx:{delay:.5},tracks:{obj:{len:1,frames:[[0,0,0],[1,0,0]]}}}],
  settings:{bpm:153,key:2,mode:3,snap:false,trackpad:true},
  view:{target:[1,2,3],radius:12,theta:.7,phi:1,mode:'top',top:{cx:1,cz:2,h:4}},
  plane:1,bars:2.75,selected:[1],active:1,editMode:'edit',instruments:[{libraryId:'one'}],
});
const storage = () => {const data = new Map();return {data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};};
test('a Beatbox session round-trips geometry, notes, instrument assignment, effects, tempo, view and playhead', () => {
  const local=storage(), session=fixture();
  assert.equal(saveSession(local,session),true);
  assert.deepEqual(readSession(local),session);
});
test('an intentionally empty scene is restored instead of recreating default boxes', () => {
  const local=storage(),session=fixture(); session.shapes=[];
  assert.equal(saveSession(local,session),true);
  assert.deepEqual(readSession(local).shapes,[]);
});
test('intro visibility is stored independently and only needs showing once', () => {
  const local=storage();assert.equal(introSeen(local),false);
  markIntroSeen(local);assert.equal(introSeen(local),true);
  assert.equal(local.getItem(SESSION_KEY),null);
});
test('invalid scene geometry and settings are rejected without overwriting a good session', () => {
  const local=storage();saveSession(local,fixture());const raw=local.getItem(SESSION_KEY);
  for (const mutate of [s=>s.shapes[0].bottom[0][0]=NaN,s=>s.settings.bpm=500,s=>s.view.radius=-1,s=>s.shapes.push(structuredClone(s.shapes[0]))]) {
    const invalid=fixture();mutate(invalid);assert.equal(validSession(invalid),false);assert.equal(saveSession(local,invalid),false);
  }
  assert.equal(local.getItem(SESSION_KEY),raw);
});
test('malformed persisted data gets a recovery copy and unavailable storage does not crash startup', () => {
  const local=storage();local.setItem(SESSION_KEY,'broken');assert.equal(readSession(local),null);
  assert.equal(local.getItem(`${SESSION_KEY}:recovery`),'broken');
  assert.equal(readSession({getItem:()=>{throw new Error('blocked')}}),null);
  assert.equal(saveSession({setItem:()=>{throw new Error('quota')}},fixture()),false);
});
