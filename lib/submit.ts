export type Req={name:string;email:string;service:string;message:string};
// Connect a backend: set NEXT_PUBLIC_FORM_ENDPOINT (Formspree, a Resend route, etc.) or replace this function.
export async function submitRequest(d:Req):Promise<'sent'|'not-configured'>{
  const url=process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if(!url) return 'not-configured';
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  if(!r.ok) throw new Error(typeof j.message==='string'&&j.message?j.message:`Request failed (${r.status})`);
  return 'sent';
}
