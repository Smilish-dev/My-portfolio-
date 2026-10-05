export function track(name:string){try{navigator.sendBeacon('/api/track',new Blob([JSON.stringify({name})],{type:'application/json'}))}catch{}}
