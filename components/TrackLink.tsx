'use client';
import {ReactNode} from 'react';import {track} from '@/lib/track';
export default function TrackLink({event,href,external,className,children}:{event:string;href:string;external?:boolean;className?:string;children:ReactNode}){
  return <a className={className} href={href} target={external?'_blank':undefined} rel="noreferrer" onClick={()=>track(event)}>{children}</a>}
