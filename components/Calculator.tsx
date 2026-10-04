'use client';
import {useState} from 'react';import Reveal from './Reveal';
const fmt=(n:number)=>Math.round(n).toLocaleString('en-US');
function Slider({label,value,min,max,unit,prefix='',onChange}:{label:string;value:number;min:number;max:number;unit:string;prefix?:string;onChange:(v:number)=>void}){
  const id='calc-'+label.replace(/\W+/g,'-').toLowerCase();
  return <div className="slider"><label htmlFor={id}>{label}</label>
    <input id={id} type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))} aria-valuetext={`${prefix}${value}${unit}`}/>
    <output htmlFor={id}>{prefix}{value}{unit}</output></div>}
export default function Calculator(){
  const [people,setPeople]=useState(3),[hours,setHours]=useState(5),[rate,setRate]=useState(25),[pct,setPct]=useState(70);
  const hrs=people*hours*4.33*(pct/100),month=hrs*rate;
  return <section className="sec wrap" aria-labelledby="calc">
    <Reveal><small className="cat">TRY IT YOURSELF</small><h2 id="calc">See what automation could save you.</h2>
      <p className="sub">Adjust the numbers to estimate the time and money that automating a repetitive task could free up. The results update instantly.</p></Reveal>
    <Reveal delay={100} className="calc glass">
      <div className="sliders">
        <Slider label="Team members doing this task" value={people} min={1} max={50} unit={people===1?' person':' people'} onChange={setPeople}/>
        <Slider label="Hours per person, per week" value={hours} min={1} max={40} unit=" hrs/week" onChange={setHours}/>
        <Slider label="Average hourly cost per team member" value={rate} min={5} max={200} unit=" /hr" prefix="$" onChange={setRate}/>
        <Slider label="Estimated task automation" value={pct} min={10} max={100} unit="%" onChange={setPct}/></div>
      <div className="results" aria-live="polite">
        <div className="res"><small>Hours saved / month</small><strong>{fmt(hrs)}</strong></div>
        <div className="res"><small>Money saved / month</small><strong>${fmt(month)}</strong></div>
        <div className="res"><small>Money saved / year</small><strong>${fmt(month*12)}</strong></div></div>
      <p className="note">This is an illustrative estimate based on your inputs. Actual savings depend on the workflow being automated.</p></Reveal></section>}
