'use client';
import {useState} from 'react';import {Service} from '@/lib/data';import Reveal from './Reveal';import ServiceModal from './ServiceModal';
export default function Services({services}:{services:Service[]}){const [sel,setSel]=useState<number|null>(null);
  return <section id="services" className="sec wrap" aria-labelledby="sv">
  <Reveal><h2 id="sv">Systems with a purpose.</h2><p className="sub">Technology is only useful when it solves a real business problem. I focus on the architecture behind the interface—not just the interface itself.</p></Reveal>
  <div className="sgrid">{services.map((s,i)=><Reveal key={s.t+i} delay={i*80} as="article" className="card glass svc"><button onClick={()=>setSel(i)} aria-label={`View details for ${s.t}`}>
    {s.image&&<img className="simg" src={s.image} alt="" loading="lazy"/>}<span className="num">{String(i+1).padStart(2,'0')}</span>
    <h3>{s.t}</h3><p>{s.d}</p>{s.price&&<strong className="price">{s.price}</strong>}<div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><span className="more">View details ↗</span></button></Reveal>)}</div>
  {sel!==null&&<ServiceModal s={services[sel]} onClose={()=>setSel(null)}/>}</section>}
