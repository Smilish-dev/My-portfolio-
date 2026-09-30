'use client';
import {useEffect,useRef} from 'react';
export default function Fx(){
  const bar=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const sc=()=>{const h=document.documentElement.scrollHeight-innerHeight;if(bar.current)bar.current.style.transform=`scaleX(${h>0?scrollY/h:0})`};
    const pm=(e:PointerEvent)=>{const c=(e.target as HTMLElement).closest?.('.card') as HTMLElement|null;if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',`${e.clientX-r.left}px`);c.style.setProperty('--my',`${e.clientY-r.top}px`)};
    addEventListener('scroll',sc,{passive:true});addEventListener('pointermove',pm);sc();
    return()=>{removeEventListener('scroll',sc);removeEventListener('pointermove',pm)}},[]);
  return <div className="progress" ref={bar} aria-hidden="true"/>}
