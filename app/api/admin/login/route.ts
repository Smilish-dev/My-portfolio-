import {NextResponse} from 'next/server';import {hmac,same} from '@/lib/auth';
export async function POST(req:Request){const pw=process.env.ADMIN_PASSWORD;const {password}=await req.json().catch(()=>({password:''}));
  if(!pw||typeof password!=='string'||!same(hmac(password),hmac(pw)))return NextResponse.json({error:'Invalid'},{status:401});
  const r=NextResponse.json({ok:true});r.cookies.set('admin',hmac(pw),{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*8});return r}
export async function DELETE(){const r=NextResponse.json({ok:true});r.cookies.delete('admin');return r}
