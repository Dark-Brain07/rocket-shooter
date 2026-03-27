interface Particle{x:number;y:number;vx:number;vy:number;life:number;color:string;size:number;}
export class ExplosionManager{private particles:Particle[]=[];
explode(x:number,y:number,count=15,color='#ff4400'){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2;const s=1+Math.random()*4;this.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,color,size:1+Math.random()*3});}}
update(dt:number){this.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=dt*2;p.size*=0.97;});this.particles=this.particles.filter(p=>p.life>0);}
render(ctx:CanvasRenderingContext2D){this.particles.forEach(p=>{ctx.globalAlpha=p.life;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;}
get count(){return this.particles.length;}}