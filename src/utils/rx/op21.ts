export function map21<T,R>(fn:(v:T)=>R):(src:T[])=>R[]{return src=>src.map(fn);}
export function filter21<T>(p:(v:T)=>boolean):(src:T[])=>T[]{return src=>src.filter(p);}