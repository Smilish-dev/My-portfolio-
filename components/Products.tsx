import {Product} from '@/lib/data';import {safeUrl} from '@/lib/links';import Reveal from './Reveal';import TrackLink from './TrackLink';
export default function Products({products}:{products:Product[]}){
  if(!products.length)return null;
  return <section id="products" className="sec wrap" aria-labelledby="pd"><Reveal><h2 id="pd">AI mastery products.</h2><p className="sub">Guides and training to help you build your own automations and AI agents.</p></Reveal>
  <div className="prgrid">{products.map((p,i)=>{const u=safeUrl(p.link);return <Reveal key={p.name+i} delay={i*80} as="article" className="card glass prod">
    {p.image&&<img className="pimg" src={p.image} alt={p.name} loading="lazy"/>}
    <div className="pbody"><h3>{p.name}</h3>{p.price&&<strong className="price">{p.price}</strong>}<p>{p.desc}</p>
    {p.features.length>0&&<ul className="feat">{p.features.map(f=><li key={f}>{f}</li>)}</ul>}
    <div className="pbtns"><TrackLink event="buy_product" className="btn" href={u||'#contact'} external={!!u}>{p.cta||'Get access'} ↗</TrackLink>{safeUrl(p.demo)&&<TrackLink event="watch_demo" className="btn ghost" href={safeUrl(p.demo)} external>Live demo ↗</TrackLink>}</div></div></Reveal>})}</div></section>}
