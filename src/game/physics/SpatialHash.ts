export class SpatialHash{private grid=new Map<string,Set<number>>();private cellSize:number;
constructor(cs=64){this.cellSize=cs;}
private key(x:number,y:number){return Math.floor(x/this.cellSize)+','+Math.floor(y/this.cellSize);}
insert(id:number,x:number,y:number){this.grid.get(this.key(x,y))?.add(id)||this.grid.set(this.key(x,y),new Set([id]));}
query(x:number,y:number,r:number):Set<number>{const res=new Set<number>();const c=this.cellSize;for(let cx=Math.floor((x-r)/c);cx<=Math.floor((x+r)/c);cx++)for(let cy=Math.floor((y-r)/c);cy<=Math.floor((y+r)/c);cy++)this.grid.get(cx+','+cy)?.forEach(id=>res.add(id));return res;}
clear(){this.grid.clear();}}