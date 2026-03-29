export function map8<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter8<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}