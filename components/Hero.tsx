'use client';
import dynamic from 'next/dynamic';
const Hero3D=dynamic(()=>import('./Hero3D'),{ssr:false});
export default function Hero({tags}:{tags:string[]}){return <section className="hero" aria-labelledby="h1">
  <Hero3D/><div className="grid-bg" aria-hidden="true"/>
  {tags.slice(0,3).map((t,i)=><span key={t+i} className={`tag glass t${i+1}`} aria-hidden="true">{t}</span>)}
  <div className="wrap hero-c"><h1 id="h1">I turn business<br/>problems into<br/><span className="grad">digital systems.</span></h1>
  <p className="lead">I build intelligent workflows, automation systems and polished web experiences that help businesses work smarter and move faster.</p>
  <div className="row"><a href="#work" className="btn">Explore My Work ↗</a><a href="#contact" className="btn ghost">Start a Project</a></div></div></section>}
