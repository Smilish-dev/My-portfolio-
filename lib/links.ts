export function safeUrl(u?:string){if(!u)return '';try{const x=new URL(u.trim());return x.protocol==='https:'||x.protocol==='http:'?x.href:''}catch{return ''}}
export function bookService(t:string,close:()=>void){close();window.dispatchEvent(new CustomEvent('pick-service',{detail:t}));setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),50)}
