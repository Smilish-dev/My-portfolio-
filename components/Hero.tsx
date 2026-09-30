import {Hero as H} from '@/lib/data';
export default function Hero({tags,hero}:{tags:string[];hero:H}){
  const ini=hero.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return <section className="hero" aria-labelledby="h1">
  {tags.slice(0,3).map((t,i)=><span key={t+i} className={`tag glass t${i+1}`} aria-hidden="true">{t}</span>)}
  <div className="wrap hero-c hero-grid"><div>
    <p className="hi">{hero.hi}</p>
    <h1 id="h1"><span className="ln grad">{hero.name}</span></h1>
    <p className="role">{hero.role}</p>
    <p className="lead">{hero.about}</p>
    <p className="pitch">I turn business problems into digital systems.</p>
    <div className="row"><a href="#work" className="btn">Explore My Work ↗</a><a href="#contact" className="btn ghost">Start a Project</a></div></div>
    <div className="photo glass">{hero.photo?<img src={hero.photo} alt={hero.name}/>:<span aria-hidden="true">{ini}</span>}</div></div></section>}
