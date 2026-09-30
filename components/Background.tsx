'use client';
import dynamic from 'next/dynamic';
const Scene=dynamic(()=>import('./Scene3D'),{ssr:false});
export default function Background(){return <div className="hero3d" aria-hidden="true"><Scene/></div>}
