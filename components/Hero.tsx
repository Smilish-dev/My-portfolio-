export default function Hero({tags}:{tags:string[]}){return <section className="hero" aria-labelledby="h1">
  <div className="grid-bg" aria-hidden="true"/>
  {tags.slice(0,3).map((t,i)=><span key={t+i} className={`tag glass t${i+1}`} aria-hidden="true">{t}</span>)}
  <div className="wrap hero-c"><h1 id="h1"><span className="ln">I turn business</span><span className="ln">problems into</span><span className="ln grad">digital systems.</span></h1>
  <p className="lead">I build intelligent workflows, automation systems and polished web experiences that help businesses work smarter and move faster.</p>
  <div className="row"><a href="#work" className="btn">Explore My Work ↗</a><a href="#contact" className="btn ghost">Start a Project</a></div></div></section>}
