export const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const randRange=(min:number,max:number)=>min+Math.random()*(max-min);
export const randInt=(min:number,max:number)=>Math.floor(randRange(min,max+1));
export const degToRad=(d:number)=>d*Math.PI/180;
export const radToDeg=(r:number)=>r*180/Math.PI;
export const angleBetween=(x1:number,y1:number,x2:number,y2:number)=>Math.atan2(y2-y1,x2-x1);