import {Product} from '@/lib/data';import {safeUrl} from '@/lib/links';import Reveal from './Reveal';import ImageBox from './ImageBox';import DemoButton from './DemoButton';import TrackLink from './TrackLink';
export default function Products({products,overlay=''}:{products:Product[];overlay?:string}){
  if(!products.length)return null;
  return <section id="products" className="sec wrap" aria-labelledby="pd"><Reveal><h2 id="pd">AI mastery products.</h2><p className="sub">Guides and training to help you build your own automations and AI agents.</p></Reveal>
  <div className="prgrid">{products.map((p,i)=>{const u=safeUrl(p.link);return <Reveal key={p.name+i} delay={i*80} as="article" className="card glass prod">
    {p.image&&<ImageBox src={p.image} alt={p.name} overlay={overlay}/>}
    <div className="pbody"><h3>{p.name}</h3>{p.price&&<strong className="price">{p.price}</strong>}<p>{p.desc}</p>
    {p.features.length>0&&<ul className="feat">{p.features.map(f=><li key={f}>{f}</li>)}</ul>}
    <div className="pbtns"><TrackLink event="buy_product" className="btn" href={u||'#contact'} external={!!u}>{p.cta||'Get access'} ↗</TrackLink>{safeUrl(p.demo)&&<DemoButton url={safeUrl(p.demo)} title={p.name} className="btn ghost" label="Live demo"/>}</div></div></Reveal>})}</div></section>}
