import Reveal from './Reveal';
export default function Skills({tools}:{tools:string[]}){return <section className="sec wrap" aria-labelledby="sk"><Reveal><h2 id="sk">The tools behind the systems.</h2></Reveal>
  <ul className="pills">{tools.map((t,i)=><Reveal as="li" key={t} delay={i*40} className="pill glass">{t}</Reveal>)}</ul></section>}
