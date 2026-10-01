import Navbar from '@/components/Navbar';import Hero from '@/components/Hero';import Services from '@/components/Services';
import Projects from '@/components/Projects';import About from '@/components/About';import Skills from '@/components/Skills';
import Contact from '@/components/Contact';import Footer from '@/components/Footer';import Background from '@/components/Background';import Fx from '@/components/Fx';import Products from '@/components/Products';import {getContent} from '@/lib/storage';
export default async function Page(){const c=await getContent();return <>
<Background/><Fx/><Navbar products={c.products.length>0}/><main id="home"><Hero tags={c.heroTags} hero={c.hero}/>
<div className="marquee" aria-hidden="true"><div className="track">{[0,1].map(k=><div key={k} className="grp">{c.marquee.map(i=><span key={i+k}>{i}<b>✦</b></span>)}</div>)}</div></div>
<Services services={c.services}/><Projects projects={c.projects}/><Products products={c.products}/><About/><Skills tools={c.tools}/><Contact links={c.links} status={c.status} options={[...c.services.map(s=>s.t),'Other']}/></main><Footer links={c.links}/></>}
