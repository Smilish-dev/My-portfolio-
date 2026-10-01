import {promises as fs} from 'fs';import path from 'path';import {Content,defaults} from './data';
const FILE=path.join(process.cwd(),'content','site.json');
const sb=()=>{const u=process.env.SUPABASE_URL,k=process.env.SUPABASE_SERVICE_KEY;return u&&k?{u,h:{apikey:k,Authorization:`Bearer ${k}`,'Content-Type':'application/json'}}:null};
export async function getContent():Promise<Content>{
  try{const s=sb();
    if(s){const r=await fetch(`${s.u}/rest/v1/site_content?id=eq.main&select=data`,{headers:s.h,cache:'no-store'});const j=await r.json();if(j[0]?.data)return {...defaults,...j[0].data}}
    else return {...defaults,...JSON.parse(await fs.readFile(FILE,'utf8'))}}catch{}
  return defaults}
export async function saveContent(c:Content){const s=sb();
  if(s){const r=await fetch(`${s.u}/rest/v1/site_content`,{method:'POST',headers:{...s.h,Prefer:'resolution=merge-duplicates'},body:JSON.stringify({id:'main',data:c})});if(!r.ok)throw new Error(`Supabase ${r.status}: ${(await r.text()).slice(0,200)}`);return}
  await fs.mkdir(path.dirname(FILE),{recursive:true});await fs.writeFile(FILE,JSON.stringify(c,null,2))}
