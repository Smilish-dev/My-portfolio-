import {NextResponse} from 'next/server';import {isAuthed} from '@/lib/auth';
export async function GET(){
  if(!await isAuthed())return NextResponse.json({error:'Unauthorized'},{status:401});
  const u=process.env.SUPABASE_URL?.replace(/\/$/,''),k=process.env.SUPABASE_SERVICE_KEY;
  if(!u||!k)return NextResponse.json({});
  const since=encodeURIComponent(new Date(Date.now()-30*864e5).toISOString());
  const r=await fetch(`${u}/rest/v1/site_events?select=name,created_at&created_at=gte.${since}&limit=10000`,{headers:{apikey:k,Authorization:`Bearer ${k}`},cache:'no-store'});
  if(!r.ok)return NextResponse.json({error:'stats'},{status:500});
  const rows:{name:string;created_at:string}[]=await r.json(),w=Date.now()-7*864e5,out:Record<string,{d7:number;d30:number}>={};
  for(const x of rows){const o=out[x.name]??={d7:0,d30:0};o.d30++;if(Date.parse(x.created_at)>=w)o.d7++}
  return NextResponse.json(out)}
