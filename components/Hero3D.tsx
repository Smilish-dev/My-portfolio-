'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';
function Gem(){
  const tilt=useRef<THREE.Group>(null!),spin=useRef<THREE.Mesh>(null!),m=useRef({x:0,y:0}),reduce=useRef(false);
  useEffect(()=>{reduce.current=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const f=(e:PointerEvent)=>{m.current.x=e.clientX/innerWidth*2-1;m.current.y=e.clientY/innerHeight*2-1};
    addEventListener('pointermove',f);return()=>removeEventListener('pointermove',f)},[]);
  useFrame(({clock,size},dt)=>{const t=clock.elapsedTime,wide=size.width>860,k=1-Math.pow(.001,dt),g=tilt.current;
    g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,m.current.x*.7,k);
    g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,m.current.y*.5,k);
    g.position.x=THREE.MathUtils.lerp(g.position.x,wide?2.1:0,k);
    g.position.y=reduce.current?0:Math.sin(t*.8)*.18;
    g.scale.setScalar(wide?1.15:.8);
    if(!reduce.current){spin.current.rotation.y+=dt*.12;spin.current.rotation.z+=dt*.05}});
  return <group ref={tilt}><mesh ref={spin}><icosahedronGeometry args={[1.5,1]}/>
    <meshPhysicalMaterial color="#123CFF" transparent opacity={.3} transmission={.9} roughness={.08} metalness={.15} thickness={1.5} ior={1.45} clearcoat={1} flatShading/></mesh>
    <mesh scale={.55}><icosahedronGeometry args={[1.5,0]}/><meshBasicMaterial color="#4F7CFF" wireframe transparent opacity={.35}/></mesh></group>}
export default function Hero3D(){
  return <div className="hero3d" aria-hidden="true"><Canvas dpr={[1,1.5]} camera={{position:[0,0,6],fov:45}} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={.6}/><pointLight position={[4,3,4]} intensity={60} color="#4F7CFF"/><pointLight position={[-4,-2,3]} intensity={30} color="#1248FF"/><pointLight position={[0,4,-2]} intensity={25} color="#F7F9FF"/>
    <Gem/></Canvas></div>}
