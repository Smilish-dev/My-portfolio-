'use client';
import {useEffect,useState} from 'react';
const base=[['Home','#home'],['Services','#services'],['Work','#work'],['About','#about'],['Contact','#contact']];
export default function Navbar({products=false}:{products?:boolean}){
  const links=products?[...base.slice(0,3),['Products','#products'],...base.slice(3)]:base;
  const [s,setS]=useState(false),[o,setO]=useState(false);
  useEffect(()=>{const f=()=>setS(scrollY>20);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
  return <header className={`nav ${s?'scrolled':''}`}><nav className="glass nav-in" aria-label="Main">
    <a href="#home" className="logo">Adedayo.</a>
    <ul className={`links ${o?'open':''}`}>{links.map(([l,h])=><li key={h}><a href={h} onClick={()=>setO(false)}>{l}</a></li>)}
      <li className="mcta"><a href="#contact" onClick={()=>setO(false)}>Let&apos;s Talk ↗</a></li></ul>
    <a href="#contact" className="btn sm dcta">Let&apos;s Talk ↗</a>
    <button className="burger" aria-label="Toggle menu" aria-expanded={o} onClick={()=>setO(!o)}><i/><i/></button>
  </nav></header>}
