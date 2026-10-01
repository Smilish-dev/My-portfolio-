export type Req={name:string;email:string;service:string;message:string};
// Set NEXT_PUBLIC_FORM_ENDPOINT to https://formsubmit.co/ajax/YOUR-EMAIL (or your FormSubmit alias)
export async function submitRequest(d:Req):Promise<'sent'|'not-configured'>{
  const url=process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if(!url) return 'not-configured';
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...d,_subject:'New portfolio project request',_captcha:'false'})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||j.success===false||j.success==='false') throw new Error(typeof j.message==='string'&&j.message?j.message:`Request failed (${r.status})`);
  return 'sent';
}
