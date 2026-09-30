import {Links} from '@/lib/data';import ContactLinks from './ContactLinks';
export default function Footer({links}:{links:Links}){return <footer className="foot wrap"><div><a href="#home" className="logo">Adedayo.</a><p>AI automation • digital systems • web experiences</p></div><ContactLinks links={links}/><a href="#home" className="back">BACK TO TOP ↑</a></footer>}
