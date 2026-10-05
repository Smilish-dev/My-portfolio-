export default function ImageBox({src,alt,overlay}:{src:string;alt:string;overlay?:string}){
  return <div className="imgbox"><img src={src} alt={alt} loading="lazy"/>{overlay?<span className="ovl"><i aria-hidden="true">✦</i>{overlay}</span>:null}</div>}
