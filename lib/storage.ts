import {promises as fs} from 'fs';import path from 'path';import {Content,defaults} from './data';
const merge=(s:Partial<Content>):Content=>({...defaults,...s,links:{...defaults.links,...(s.links||{})},hero:{...defaults.hero,...(s.hero||{})},products:s.products??defaults.products});
const FILE=path.join(process.cwd(),'content','site.json');
const sb=()=>{const u=process.env.SUPABASE_URL?.replace(/\/$/,''),k=process.env.SUPABASE_SERVICE_KEY;return u&&k?{u,h:{apikey:k,Authorization:`Bearer ${k}`,'Content-Type':'application/json'}}:null};
// Public pages are cached for an hour (and refreshed instantly when you save in admin).
// If Supabase is unreachable the last good page keeps being served instead of default content.
export async function getContent(fresh=false):Promise<Content>{
  const s=sb();
  if(s){
    try{const url=`${s.u}/rest/v1/site_content?id=eq.main&select=data`;
      const r=fresh?await fetch(url,{headers:s.h,cache:'no-store'}):await fetch(url,{headers:s.h,next:{revalidate:3600}});
      if(!r.ok)throw new Error(`Supabase ${r.status}`);
      const j=await r.json();return j[0]?.data?merge(j[0].data):defaults}
    catch(e){if(process.env.NEXT_PHASE==='phase-production-build')return defaults;throw e}}
  try{return merge(JSON.parse(await fs.readFile(FILE,'utf8')))}catch{return defaults}}
export async function saveContent(c:Content){const s=sb();
  if(s){const r=await fetch(`${s.u}/rest/v1/site_content`,{method:'POST',headers:{...s.h,Prefer:'resolution=merge-duplicates'},body:JSON.stringify({id:'main',data:c})});if(!r.ok)throw new Error(`Supabase ${r.status}: ${(await r.text()).slice(0,200)}`);return}
  await fs.mkdir(path.dirname(FILE),{recursive:true});await fs.writeFile(FILE,JSON.stringify(c,null,2))}
