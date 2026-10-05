'use client';
import {useEffect,useState} from 'react';import {createPortal} from 'react-dom';import {track} from '@/lib/track';
function embed(u:string):{type:'frame'|'video';src:string}{
  try{const x=new URL(u),h=x.hostname.replace(/^www\./,'');
    if((h==='youtube.com'||h==='m.youtube.com')&&x.searchParams.get('v'))return {type:'frame',src:`https://www.youtube.com/embed/${x.searchParams.get('v')}`};
    if(h==='youtu.be')return {type:'frame',src:`https://www.youtube.com/embed/${x.pathname.slice(1)}`};
    if(h==='vimeo.com'&&/^\/\d+/.test(x.pathname))return {type:'frame',src:`https://player.vimeo.com/video/${x.pathname.split('/')[1]}`};
    if(h==='loom.com'&&x.pathname.startsWith('/share/'))return {type:'frame',src:`https://www.loom.com/embed/${x.pathname.split('/')[2]}`};
    if(h==='drive.google.com'){const m=x.pathname.match(/\/file\/d\/([^/]+)/);if(m)return {type:'frame',src:`https://drive.google.com/file/d/${m[1]}/preview`}}
    if(/\.(mp4|webm|ogg)$/i.test(x.pathname))return {type:'video',src:u}}catch{}
  return {type:'frame',src:u}}
export default function DemoButton({url,title,className,label}:{url:string;title:string;className?:string;label:string}){
  const [open,setOpen]=useState(false),m=embed(url);
  useEffect(()=>{if(!open)return;const k=(ev:KeyboardEvent)=>{if(ev.key==='Escape'){ev.stopPropagation();setOpen(false)}};addEventListener('keydown',k,true);return()=>removeEventListener('keydown',k,true)},[open]);
  return <><button type="button" className={className} onClick={()=>{track('watch_demo');setOpen(true)}}>{label} ▸</button>
  {open&&createPortal(<div className="backdrop demo-bd" onClick={()=>setOpen(false)}><div className="modal glass demo" role="dialog" aria-modal="true" aria-label={`${title} demo`} onClick={ev=>ev.stopPropagation()}>
    <button className="close" aria-label="Close demo" onClick={()=>setOpen(false)}>×</button>
    <h3 className="dt">{title}</h3>
    <div className="demo-frame">{m.type==='video'?<video src={m.src} controls playsInline/>:<iframe src={m.src} title={`${title} demo`} allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"/>}</div>
    <p className="dnote">Prefer a bigger view? <a href={url} target="_blank" rel="noreferrer">Open in a new tab ↗</a></p></div></div>,document.body)}</>}
