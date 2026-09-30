import {NextResponse} from 'next/server';import {promises as fs} from 'fs';import path from 'path';import crypto from 'crypto';import {isAuthed} from '@/lib/auth';
export async function POST(req:Request){
  if(!await isAuthed())return NextResponse.json({error:'Unauthorized'},{status:401});
  const fd=await req.formData().catch(()=>null);const f=fd?.get('file');
  if(!(f instanceof File)||!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>4*1024*1024)return NextResponse.json({error:'Use a JPG, PNG or WebP under 4 MB.'},{status:400});
  const ext=f.type==='image/png'?'png':f.type==='image/webp'?'webp':'jpg',name=`${Date.now()}-${crypto.randomUUID().slice(0,8)}.${ext}`,buf=new Uint8Array(await f.arrayBuffer());
  const u=process.env.SUPABASE_URL?.replace(/\/$/,''),k=process.env.SUPABASE_SERVICE_KEY;
  try{if(u&&k){const r=await fetch(`${u}/storage/v1/object/portfolio/${name}`,{method:'POST',headers:{apikey:k,Authorization:`Bearer ${k}`,'Content-Type':f.type},body:buf});
      if(!r.ok)throw new Error('storage');return NextResponse.json({url:`${u}/storage/v1/object/public/portfolio/${name}`})}
    const dir=path.join(process.cwd(),'public','uploads');await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,name),buf);return NextResponse.json({url:`/uploads/${name}`})}
  catch{return NextResponse.json({error:'Upload failed. On Vercel, create a public Supabase bucket named portfolio.'},{status:500})}}
