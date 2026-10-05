import {NextResponse} from 'next/server';
const OK=new Set(['book_service','watch_demo','request_similar','buy_product','form_sent']);
export async function POST(req:Request){
  const b=await req.json().catch(()=>null),name=b?.name;
  const u=process.env.SUPABASE_URL?.replace(/\/$/,''),k=process.env.SUPABASE_SERVICE_KEY;
  if(typeof name==='string'&&OK.has(name)&&u&&k){
    await fetch(`${u}/rest/v1/site_events`,{method:'POST',headers:{apikey:k,Authorization:`Bearer ${k}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({name})}).catch(()=>{})}
  return new NextResponse(null,{status:204})}
