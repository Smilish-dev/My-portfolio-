import crypto from 'crypto';import {cookies} from 'next/headers';
export const hmac=(v:string)=>crypto.createHmac('sha256',process.env.ADMIN_SECRET||'change-me').update(v).digest('hex');
export const same=(a:string,b:string)=>a.length===b.length&&crypto.timingSafeEqual(Buffer.from(a),Buffer.from(b));
export async function isAuthed(){const pw=process.env.ADMIN_PASSWORD;if(!pw)return false;const c=(await cookies()).get('admin')?.value;return !!c&&same(c,hmac(pw))}
