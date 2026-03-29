export function map12<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter12<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}