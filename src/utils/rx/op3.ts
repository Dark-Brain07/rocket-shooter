export function map3<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter3<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}