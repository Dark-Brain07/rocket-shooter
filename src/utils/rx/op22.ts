export function map22<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter22<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}