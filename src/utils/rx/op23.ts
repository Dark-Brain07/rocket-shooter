export function map23<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter23<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}