export function map9<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter9<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}