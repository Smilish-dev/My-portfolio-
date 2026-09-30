'use client';
import {useEffect,useRef,ReactNode,CSSProperties} from 'react';
export default function Reveal({children,delay=0,className='',as='div'}:{children:ReactNode;delay?:number;className?:string;as?:string}){
  const r=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=r.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('in');o.disconnect()}},{threshold:.15});o.observe(el);return()=>o.disconnect()},[]);
  const Tag=as as 'div';
  return <Tag ref={r} className={`reveal ${className}`} style={{'--d':`${delay}ms`} as CSSProperties}>{children}</Tag>}
