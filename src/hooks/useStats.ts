import{useState,useEffect,useCallback,useRef}from'react';
export function useStats(){const[state,setState]=useState<any>(null);const ref=useRef<any>(null);
useEffect(()=>{ref.current=state;return()=>{ref.current=null;};},[state]);
const update=useCallback((v:any)=>setState(v),[]);
const reset=useCallback(()=>setState(null),[]);
return{state,update,reset};}