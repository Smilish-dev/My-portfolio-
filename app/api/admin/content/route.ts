import {NextResponse} from 'next/server';import {revalidatePath} from 'next/cache';import {isAuthed} from '@/lib/auth';import {getContent,saveContent} from '@/lib/storage';
const opt=(v:unknown)=>v===undefined||typeof v==='string';
const strs=(a:unknown)=>Array.isArray(a)&&a.every(x=>typeof x==='string');
export async function GET(){if(!await isAuthed())return NextResponse.json({error:'Unauthorized'},{status:401});try{return NextResponse.json(await getContent(true))}catch{return NextResponse.json({error:'Database unreachable'},{status:503})}}
export async function PUT(req:Request){if(!await isAuthed())return NextResponse.json({error:'Unauthorized'},{status:401});
  const c=await req.json().catch(()=>null);
  const ok=c&&c.links&&['facebook','instagram','youtube'].every(k=>typeof c.links[k]==='string')&&Array.isArray(c.products)&&c.products.length<=30&&c.products.every((p:any)=>['name','price','desc','image','link','cta'].every(k=>typeof p[k]==='string')&&strs(p.features))&&c.hero&&['hi','name','role','about','photo'].every(k=>typeof c.hero[k]==='string')&&typeof c.status==='string'&&['email','whatsapp','linkedin','github'].every(k=>typeof c.links[k]==='string')&&strs(c.tools)&&strs(c.marquee)&&strs(c.heroTags)&&Array.isArray(c.services)&&Array.isArray(c.projects)&&c.projects.length<=40&&
    c.services.every((s:any)=>typeof s.t==='string'&&typeof s.d==='string'&&strs(s.tags)&&[s.price,s.details,s.image].every(opt))&&
    c.projects.every((p:any)=>['id','cat','name','desc','problem','solution','impact'].every(k=>typeof p[k]==='string')&&[p.link,p.price,p.image].every(opt)&&strs(p.flow)&&strs(p.stack));
  if(!ok)return NextResponse.json({error:'Invalid content'},{status:400});
  try{await saveContent(c);revalidatePath('/');return NextResponse.json({ok:true})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not save'},{status:500})}}
