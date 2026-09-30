import {Links} from '@/lib/data';import {safeUrl} from '@/lib/links';
export default function ContactLinks({links}:{links:Links}){
  const wa=links.whatsapp.replace(/\D/g,''),em=links.email.trim();
  const items=[em&&['Email',`mailto:${em}`,em],wa&&['WhatsApp',`https://wa.me/${wa}`,'Message me'],safeUrl(links.linkedin)&&['LinkedIn',safeUrl(links.linkedin),'Profile'],safeUrl(links.github)&&['GitHub',safeUrl(links.github),'Profile']].filter(Boolean) as string[][];
  if(!items.length)return null;
  return <ul className="clinks">{items.map(([l,h,t])=><li key={l}><a href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel="noreferrer"><small>{l}</small><span>{t} ↗</span></a></li>)}</ul>}
