'use client';
import {FormEvent,useEffect,useRef,useState} from 'react';import Reveal from './Reveal';import {submitRequest} from '@/lib/submit';import ContactLinks from './ContactLinks';import {Links} from '@/lib/data';
export default function Contact({links,status,options}:{links:Links;status:string;options:string[]}){
  const [err,setErr]=useState<Record<string,string>>({}),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false),sel=useRef<HTMLSelectElement>(null);
  useEffect(()=>{const f=(e:Event)=>{const v=(e as CustomEvent<string>).detail;if(sel.current&&options.includes(v))sel.current.value=v};addEventListener('pick-service',f);return()=>removeEventListener('pick-service',f)},[options]);
  async function go(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=e.currentTarget,d=Object.fromEntries(new FormData(f)) as Record<string,string>,x:Record<string,string>={};
    if(!d.name?.trim())x.name='Enter your name.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email||''))x.email='Enter a valid email address.';
    if(!d.service)x.service='Choose a service.';
    if((d.message||'').trim().length<10)x.message='Describe your request in at least 10 characters.';
    setErr(x);setMsg('');if(Object.keys(x).length)return;
    setBusy(true);try{const r=await submitRequest({name:d.name,email:d.email,service:d.service,message:d.message});
      if(r==='sent'){setMsg('Request sent. Thank you.');f.reset()}else setMsg('Your details are valid, but no email service is connected yet, so nothing was sent.')}
    catch(e){setMsg(e instanceof Error?e.message:'Sending failed. Please try again.')}setBusy(false)}
  const E=({k}:{k:string})=>err[k]?<span className="err" role="alert">{err[k]}</span>:null;
  return <section id="contact" className="sec wrap contact" aria-labelledby="ct">
    <Reveal><h2 id="ct">Have a business problem?<br/>Let&apos;s build the system.</h2><p className="sub">Tell me what you&apos;re trying to improve, automate or launch. I&apos;ll turn the idea into a clear technical direction.</p>{status&&<p className="avail">● {status}</p>}<ContactLinks links={links}/></Reveal>
    <Reveal delay={100}><form className="glass form" onSubmit={go} noValidate>
      <label>Your Name<input name="name" autoComplete="name" aria-invalid={!!err.name}/><E k="name"/></label>
      <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!err.email}/><E k="email"/></label>
      <label>Service<select ref={sel} name="service" defaultValue="" aria-invalid={!!err.service}><option value="" disabled>Select a service</option>{options.map(o=><option key={o}>{o}</option>)}</select><E k="service"/></label>
      <label>Your Request<textarea name="message" rows={5} aria-invalid={!!err.message}/><E k="message"/></label>
      <button className="btn" disabled={busy}>{busy?'Sending…':'Send Project Request ↗'}</button>
      <p className="status" role="status">{msg}</p></form></Reveal></section>}
