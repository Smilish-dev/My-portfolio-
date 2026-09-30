import type {Metadata} from 'next';
import {Space_Grotesk} from 'next/font/google';
import './globals.css';
const f=Space_Grotesk({subsets:['latin'],display:'swap'});
export const metadata:Metadata={title:'Adedayo — AI Automation & Digital Systems',description:'Adedayo builds AI automation systems, real-estate workflows, web experiences and digital products.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={f.className}>{children}</body></html>}
