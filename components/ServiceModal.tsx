'use client';
import {useEffect,useRef} from 'react';import {Service} from '@/lib/data';import {bookService} from '@/lib/links';import {track} from '@/lib/track';
export default function ServiceModal({s,onClose}:{s:Service;onClose:()=>void}){
  const c=useRef<HTMLButtonElement>(null);
  useEffect(()=>{const prev=document.activeElement as HTMLElement|null;c.current?.focus();document.body.style.overflow='hidden';
    const k=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){e.preventDefault();c.current?.focus()}};addEventListener('keydown',k);
    return()=>{removeEventListener('keydown',k);document.body.style.overflow='';prev?.focus()}},[onClose]);
  return <div className="backdrop" onClick={onClose}><div className="modal glass" role="dialog" aria-modal="true" aria-labelledby="st" onClick={e=>e.stopPropagation()}>
    <button ref={c} className="close" onClick={onClose} aria-label="Close service">×</button>
    {s.image&&<img className="mimg" src={s.image} alt={s.t}/>}
    <small className="cat">SERVICE</small><h3 id="st">{s.t}</h3>{s.price&&<strong className="price">{s.price}</strong>}
    <p className="lead2">{s.d}</p>{s.details&&<p className="pre">{s.details}</p>}
    <div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div>
    <div className="row cta"><button className="btn" onClick={()=>{track('book_service');bookService(s.t,onClose)}}>Book this service ↗</button></div></div></div>}
