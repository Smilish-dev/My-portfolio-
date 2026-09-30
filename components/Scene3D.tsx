'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {useEffect,useMemo,useRef} from 'react';
import * as THREE from 'three';
type S={current:{mx:number;my:number;scroll:number;reduce:boolean}};
const glass={color:'#123CFF',transparent:true,opacity:.3,transmission:.9,roughness:.08,metalness:.15,thickness:1.5,ior:1.45,clearcoat:1} as const;
const V=[[-3,0,0],[-1.5,1.3,.5],[-1.5,-1.3,-.5],[0,0,0],[1.5,1.4,-.4],[1.5,0,.6],[1.5,-1.4,0],[3,.7,.3],[3,-.7,-.3]].map(p=>new THREE.Vector3(...(p as [number,number,number])));
const E=[[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[3,6],[4,7],[5,7],[5,8],[6,8]];
const PN=E.length*2;
function Network({s}:{s:S}){
  const grp=useRef<THREE.Group>(null!),core=useRef<THREE.Mesh>(null!),pulses=useRef<THREE.InstancedMesh>(null!);
  const geo=useMemo(()=>{const p:THREE.Vector3[]=[];E.forEach(([a,b])=>p.push(V[a],V[b]));return new THREE.BufferGeometry().setFromPoints(p)},[]);
  const dummy=useMemo(()=>new THREE.Object3D(),[]);
  useFrame(({clock,viewport,size},dt)=>{
    const {mx,my,scroll,reduce}=s.current,wide=size.width>860,k=1-Math.pow(.001,dt),g=grp.current,t=reduce?0:clock.elapsedTime;
    const sc=wide?viewport.width*.075:viewport.width*.14;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x,sc,k));
    g.position.x=THREE.MathUtils.lerp(g.position.x,wide?viewport.width*.22:0,k);
    g.position.y=THREE.MathUtils.lerp(g.position.y,Math.sin(scroll*Math.PI*4)*.5+Math.sin(t*.5)*.1,k);
    g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,mx*.5+Math.sin(scroll*Math.PI*2)*.6+Math.sin(t*.3)*.15,k);
    g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,my*.35,k);
    if(!reduce){core.current.rotation.y+=dt*.25;core.current.rotation.z+=dt*.1}
    for(let i=0;i<PN;i++){const e=E[i%E.length],u=(t*.25+i/PN+(i%E.length)*.13)%1;
      dummy.position.lerpVectors(V[e[0]],V[e[1]],u);dummy.scale.setScalar(.1+Math.sin(u*Math.PI)*.9);dummy.updateMatrix();pulses.current.setMatrixAt(i,dummy.matrix)}
    pulses.current.instanceMatrix.needsUpdate=true});
  return <group ref={grp}>
    <lineSegments geometry={geo}><lineBasicMaterial color="#4F7CFF" transparent opacity={.5}/></lineSegments>
    {V.map((v,i)=>i===3?null:<mesh key={i} position={v}><icosahedronGeometry args={[.17,1]}/><meshStandardMaterial color="#4F7CFF" emissive="#1248FF" emissiveIntensity={1.2} roughness={.3}/></mesh>)}
    <mesh ref={core} position={V[3]} scale={.5}><icosahedronGeometry args={[1.5,1]}/><meshPhysicalMaterial {...glass} flatShading/></mesh>
    <mesh position={V[3]} scale={.28}><icosahedronGeometry args={[1.5,0]}/><meshBasicMaterial color="#4F7CFF" wireframe transparent opacity={.5}/></mesh>
    <instancedMesh ref={pulses} args={[undefined,undefined,PN]}><sphereGeometry args={[.055,8,8]}/><meshBasicMaterial color="#BFD0FF"/></instancedMesh></group>}
function Dust({s,n}:{s:S;n:number}){
  const ref=useRef<THREE.Points>(null!);
  const pos=useMemo(()=>{const a=new Float32Array(n*3);for(let i=0;i<n*3;i+=3){a[i]=(Math.random()-.5)*16;a[i+1]=(Math.random()-.5)*10;a[i+2]=(Math.random()-.5)*8-2}return a},[n]);
  useFrame((_,dt)=>{const {scroll,my,reduce}=s.current;if(!reduce)ref.current.rotation.y+=dt*.02;ref.current.position.y=scroll*2.5;ref.current.rotation.x=my*.05});
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry><pointsMaterial size={.03} color="#8CAAFF" transparent opacity={.5} sizeAttenuation depthWrite={false}/></points>}
export default function Scene3D(){
  const s=useRef({mx:0,my:0,scroll:0,reduce:false});
  useEffect(()=>{s.current.reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pm=(e:PointerEvent)=>{s.current.mx=e.clientX/innerWidth*2-1;s.current.my=e.clientY/innerHeight*2-1};
    const sc=()=>{const h=document.documentElement.scrollHeight-innerHeight;s.current.scroll=h>0?Math.min(1,scrollY/h):0};
    addEventListener('pointermove',pm);addEventListener('scroll',sc,{passive:true});sc();
    return()=>{removeEventListener('pointermove',pm);removeEventListener('scroll',sc)}},[]);
  const n=innerWidth<700?60:120;
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6],fov:45}} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={.6}/><pointLight position={[4,3,4]} intensity={60} color="#4F7CFF"/><pointLight position={[-4,-2,3]} intensity={30} color="#1248FF"/><pointLight position={[0,4,-2]} intensity={25} color="#F7F9FF"/>
    <Network s={s}/><Dust s={s} n={n}/></Canvas>}
