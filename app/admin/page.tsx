'use client';
import {ChangeEvent,FormEvent,useEffect,useState} from 'react';import type {Content,Project,Service} from '@/lib/data';
const csv=(s:string)=>s.split(',').map(x=>x.trim()).filter(Boolean);
const mv=<T,>(a:T[],i:number,d:number)=>{const j=i+d;if(j<0||j>=a.length)return a;const b=[...a];[b[i],b[j]]=[b[j],b[i]];return b};
function F({l,v,on,area}:{l:string;v:string;on:(v:string)=>void;area?:boolean}){return <label>{l}{area?<textarea rows={3} value={v} onChange={e=>on(e.target.value)}/>:<input value={v} onChange={e=>on(e.target.value)}/>}</label>}
function L({l,v,on}:{l:string;v:string[];on:(v:string[])=>void}){return <label>{l} (comma separated)<input key={v.join('|')} defaultValue={v.join(', ')} onBlur={e=>on(csv(e.target.value))}/></label>}
async function shrink(f:File):Promise<Blob>{const b=await createImageBitmap(f),k=Math.min(1,1600/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.round(b.width*k);c.height=Math.round(b.height*k);c.getContext('2d')!.drawImage(b,0,0,c.width,c.height);return new Promise((r,j)=>c.toBlob(x=>x?r(x):j(new Error('Could not read image')),'image/jpeg',.85))}
function Img({v,on}:{v?:string;on:(v:string)=>void}){const [b,setB]=useState('');
  async function pick(e:ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];e.target.value='';if(!f)return;setB('Uploading…');
    try{const fd=new FormData();fd.append('file',await shrink(f),'image.jpg');const r=await fetch('/api/admin/upload',{method:'POST',body:fd});const j=await r.json();if(!r.ok)throw new Error(j.error);on(j.url);setB('Uploaded. Press Save changes.')}catch(x){setB(x instanceof Error?x.message:'Upload failed')}}
  return <div className="imgf"><span>Image (optional)</span>{v&&<img src={v} alt="Preview"/>}<div className="row"><label className="btn ghost sm">{v?'Replace image':'Upload image'}<input type="file" accept="image/*" hidden onChange={pick}/></label>{v&&<button type="button" className="btn ghost sm" onClick={()=>on('')}>Remove</button>}</div><small className="status">{b}</small></div>}
const blankP=():Project=>({id:'',cat:'AUTOMATION',name:'New project',desc:'',flow:['Trigger','AI','Result'],problem:'',solution:'',impact:'',stack:[]});
export default function Admin(){
  const [c,setC]=useState<Content|null>(null),[st,setSt]=useState('load'),[pw,setPw]=useState(''),[msg,setMsg]=useState(''),[tab,setTab]=useState('projects'),[open,setOpen]=useState<number|null>(null),[dirty,setDirty]=useState(false);
  const load=async()=>{const r=await fetch('/api/admin/content');if(r.ok){setC(await r.json());setSt('in')}else setSt('out')};
  useEffect(()=>{load()},[]);
  useEffect(()=>{if(!dirty)return;const f=(e:BeforeUnloadEvent)=>e.preventDefault();addEventListener('beforeunload',f);return()=>removeEventListener('beforeunload',f)},[dirty]);
  async function login(e:FormEvent){e.preventDefault();const r=await fetch('/api/admin/login',{method:'POST',body:JSON.stringify({password:pw})});setPw('');if(r.ok){setMsg('');load()}else setMsg('Wrong password, or ADMIN_PASSWORD is not set on the server.')}
  async function save(){if(!c)return;setMsg('Saving…');const body={...c,projects:c.projects.map((p,i)=>({...p,id:String(i+1).padStart(2,'0')}))};
    const r=await fetch('/api/admin/content',{method:'PUT',body:JSON.stringify(body)});if(r.ok){setC(body);setDirty(false);setMsg('Saved. The live site is updated.')}else setMsg('Save failed. Check your storage setup (see README).')}
  const upd=(patch:Partial<Content>)=>{setC({...c!,...patch});setDirty(true)};
  const upP=(i:number,p:Partial<Project>)=>upd({projects:c!.projects.map((x,k)=>k===i?{...x,...p}:x)});
  const upS=(i:number,p:Partial<Service>)=>upd({services:c!.services.map((x,k)=>k===i?{...x,...p}:x)});
  if(st==='load')return <main className="adm"><p>Loading…</p></main>;
  if(st==='out')return <main className="adm"><form className="glass form" onSubmit={login}><h1 className="ah">Admin</h1>
    <label>Password<input type="password" value={pw} onChange={e=>setPw(e.target.value)} autoComplete="current-password"/></label><button className="btn">Sign in</button><p className="status" role="status">{msg}</p></form></main>;
  return <main className="adm wide"><header className="abar glass"><strong>Portfolio admin</strong>
    <div className="row"><a className="btn ghost sm" href="/" target="_blank" rel="noreferrer">View site ↗</a><button className="btn sm" onClick={save}>{dirty?'Save changes':'Saved'}</button>
    <button className="btn ghost sm" onClick={async()=>{await fetch('/api/admin/login',{method:'DELETE'});setSt('out')}}>Sign out</button></div></header>
    <p className="status" role="status">{msg}</p>
    <div className="tabs" role="tablist">{['projects','services','toolkit','contact'].map(t=><button key={t} role="tab" aria-selected={tab===t} className={tab===t?'on':''} onClick={()=>setTab(t)}>{t}</button>)}</div>
    {tab==='projects'&&c&&<section>{c.projects.map((p,i)=><article key={i} className="glass acard"><button className="ahead" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{String(i+1).padStart(2,'0')} · {p.name||'Untitled'}</span><small>{p.cat}</small></button>
      {open===i&&<div className="afields"><F l="Category" v={p.cat} on={v=>upP(i,{cat:v})}/><F l="Name" v={p.name} on={v=>upP(i,{name:v})}/><F l="Short description" v={p.desc} on={v=>upP(i,{desc:v})} area/>
        <L l="Workflow steps" v={p.flow} on={v=>upP(i,{flow:v})}/><F l="The problem" v={p.problem} on={v=>upP(i,{problem:v})} area/><F l="The solution" v={p.solution} on={v=>upP(i,{solution:v})} area/><F l="Designed impact (no invented numbers)" v={p.impact} on={v=>upP(i,{impact:v})} area/><L l="Stack" v={p.stack} on={v=>upP(i,{stack:v})}/><F l="Live demo link (optional)" v={p.link||''} on={v=>upP(i,{link:v})}/><F l="Price in dollars (optional), e.g. From $300" v={p.price||''} on={v=>upP(i,{price:v})}/><Img v={p.image} on={v=>upP(i,{image:v})}/>
        <div className="row"><button className="btn ghost sm" onClick={()=>{upd({projects:mv(c.projects,i,-1)});setOpen(i-1)}}>Move up</button><button className="btn ghost sm" onClick={()=>{upd({projects:mv(c.projects,i,1)});setOpen(i+1)}}>Move down</button>
        <button className="btn ghost sm" onClick={()=>{if(confirm(`Delete "${p.name}"?`)){upd({projects:c.projects.filter((_,k)=>k!==i)});setOpen(null)}}}>Delete</button></div></div>}</article>)}
      <button className="btn" onClick={()=>{upd({projects:[...c.projects,blankP()]});setOpen(c.projects.length)}}>Add project</button></section>}
    {tab==='services'&&c&&<section>{c.services.map((s,i)=><article key={i} className="glass acard"><div className="afields"><F l="Title" v={s.t} on={v=>upS(i,{t:v})}/><F l="Description" v={s.d} on={v=>upS(i,{d:v})} area/><L l="Tags" v={s.tags} on={v=>upS(i,{tags:v})}/><F l="Price in dollars, e.g. From $300" v={s.price||''} on={v=>upS(i,{price:v})}/><F l="Full details (shown when someone opens the service)" v={s.details||''} on={v=>upS(i,{details:v})} area/><Img v={s.image} on={v=>upS(i,{image:v})}/>
      <div className="row"><button className="btn ghost sm" onClick={()=>upd({services:mv(c.services,i,-1)})}>Move up</button><button className="btn ghost sm" onClick={()=>upd({services:mv(c.services,i,1)})}>Move down</button><button className="btn ghost sm" onClick={()=>confirm(`Delete "${s.t}"?`)&&upd({services:c.services.filter((_,k)=>k!==i)})}>Delete</button></div></div></article>)}
      <button className="btn" onClick={()=>upd({services:[...c.services,{t:'New service',d:'',tags:[]}]})}>Add service</button></section>}
    {tab==='toolkit'&&c&&<section className="glass acard"><div className="afields"><L l="Toolkit" v={c.tools} on={v=>upd({tools:v})}/><L l="Scrolling ticker" v={c.marquee} on={v=>upd({marquee:v})}/><L l="Hero floating tags (first 3 show)" v={c.heroTags} on={v=>upd({heroTags:v})}/></div></section>}
    {tab==='contact'&&c&&<section className="glass acard"><div className="afields"><F l="Availability line (leave empty to hide)" v={c.status} on={v=>upd({status:v})}/>
      {([['email','Email address'],['whatsapp','WhatsApp number with country code, digits only'],['linkedin','LinkedIn profile URL'],['github','GitHub profile URL']] as const).map(([k,l])=><F key={k} l={l+' (empty hides it)'} v={c.links[k]} on={v=>upd({links:{...c.links,[k]:v}})}/>)}</div></section>}
  </main>}
