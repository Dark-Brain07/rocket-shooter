export interface Projectile{x:number;y:number;vx:number;vy:number;active:boolean;damage:number;size:number;color:string;}
export class ProjectilePool{private pool:Projectile[]=[];private maxSize:number;
constructor(maxSize=200){this.maxSize=maxSize;for(let i=0;i<maxSize;i++)this.pool.push({x:0,y:0,vx:0,vy:0,active:false,damage:1,size:3,color:'#0f0'});}
get():Projectile|null{const p=this.pool.find(p=>!p.active);if(p){p.active=true;return p;}return null;}
release(p:Projectile){p.active=false;}
getActive():Projectile[]{return this.pool.filter(p=>p.active);}
clear(){this.pool.forEach(p=>p.active=false);}}