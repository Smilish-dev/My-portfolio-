'use client';
import {useEffect,useRef} from 'react';import {Project} from '@/lib/data';import {Visual} from './Projects';import {safeUrl,bookService} from '@/lib/links';import {track} from '@/lib/track';
export default function ProjectModal({p,i,onClose}:{p:Project;i:number;onClose:()=>void}){
  const c=useRef<HTMLButtonElement>(null);
  useEffect(()=>{const prev=document.activeElement as HTMLElement|null;c.current?.focus();document.body.style.overflow='hidden';
    const k=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){e.preventDefault();c.current?.focus()}};addEventListener('keydown',k);
    return()=>{removeEventListener('keydown',k);document.body.style.overflow='';prev?.focus()}},[onClose]);
  return <div className="backdrop" onClick={onClose}><div className="modal glass" role="dialog" aria-modal="true" aria-labelledby="mt" onClick={e=>e.stopPropagation()}>
    <button ref={c} className="close" onClick={onClose} aria-label="Close project">×</button>
    <small className="cat">{p.cat}</small><h3 id="mt">{p.name}</h3>{p.price&&<strong className="price">{p.price}</strong>}<p className="lead2">{p.desc}</p>{p.image?<img className="mimg" src={p.image} alt={p.name}/>:<Visual p={p} i={i}/>}
    <div className="mgrid"><section><h4>The Problem</h4><p>{p.problem}</p></section><section><h4>The Solution</h4><p>{p.solution}</p></section></div>
    <h4>The Workflow</h4><ol className="flow">{p.flow.map(n=><li key={n}>{n}</li>)}</ol>
    <h4>Designed Impact</h4><p>{p.impact}</p><h4>Stack</h4><div className="tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div><div className="row cta">{safeUrl(p.link)&&<a className="btn sm" href={safeUrl(p.link)} target="_blank" rel="noreferrer" onClick={()=>track('watch_demo')}>Watch live demo ↗</a>}<button className="btn ghost sm" onClick={()=>{track('request_similar');bookService('Other',onClose)}}>Request something similar</button></div></div></div>}
