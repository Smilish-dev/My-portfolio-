import Reveal from './Reveal';import {process} from '@/lib/data';
export default function About(){return <section id="about" className="sec wrap" aria-labelledby="ab">
  <div className="about"><Reveal><h2 id="ab">Technology should<br/>serve the business.</h2>
    <p className="sub">I&apos;m Adedayo—a Computer Science student and builder focused on AI automation, business systems and digital experiences.</p>
    <p className="sub">My approach is simple: understand the bottleneck, map the process, connect the right tools and build something that can actually be used.</p></Reveal>
    <Reveal delay={120} className="focus glass"><small>CURRENT FOCUS</small><strong>AI + REAL ESTATE</strong><span>Automation architecture / digital systems</span><i className="orb" aria-hidden="true"/></Reveal></div>
  <ol className="steps">{process.map(([t,d],i)=><Reveal as="li" key={t} delay={i*180}><span className="num">0{i+1}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</ol></section>}
