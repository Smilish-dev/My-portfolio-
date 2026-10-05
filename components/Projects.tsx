'use client';
import {CSSProperties,useState} from 'react';import {Project} from '@/lib/data';import Reveal from './Reveal';import ProjectModal from './ProjectModal';import ImageBox from './ImageBox';
export function Visual({p,i}:{p:Project;i:number}){return <div className={`viz v${i%4}`} aria-hidden="true">
  {p.flow.map((n,k)=><span key={n} className="node" style={{'--k':k} as CSSProperties}>{n}</span>)}</div>}
export default function Projects({projects,overlay=''}:{projects:Project[];overlay?:string}){
  const [sel,setSel]=useState<number|null>(null);
  return <section id="work" className="sec wrap" aria-labelledby="pj">
    <Reveal><h2 id="pj">Built to work.</h2><p className="sub">A collection of automation, real-estate, web and product concepts. Click a project to see the problem, architecture and solution.</p></Reveal>
    <div className="pgrid">{projects.map((p,i)=><Reveal key={p.id} delay={(i%2)*80} as="article" className="card glass proj">
      <button onClick={()=>setSel(i)} aria-label={`Open ${p.name} case study`}>{p.image?<ImageBox src={p.image} alt={p.name} overlay={overlay}/>:<Visual p={p} i={i}/>}<div className="pmeta"><small>{p.id} · {p.cat}</small><h3>{p.name}</h3><p>{p.desc}</p>{p.price&&<strong className="price">{p.price}</strong>}</div></button></Reveal>)}</div>
    {sel!==null&&<ProjectModal p={projects[sel]} i={sel} onClose={()=>setSel(null)} overlay={overlay}/>}</section>}
