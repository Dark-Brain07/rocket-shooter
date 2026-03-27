interface Star{x:number;y:number;speed:number;size:number;brightness:number;}
export class Starfield{private stars:Star[]=[];private w:number;private h:number;
constructor(w:number,h:number,count=100){this.w=w;this.h=h;for(let i=0;i<count;i++)this.stars.push({x:Math.random()*w,y:Math.random()*h,speed:0.5+Math.random()*2,size:0.5+Math.random()*2,brightness:0.3+Math.random()*0.7});}
update(){this.stars.forEach(s=>{s.y+=s.speed;if(s.y>this.h){s.y=0;s.x=Math.random()*this.w;}});}
render(ctx:CanvasRenderingContext2D){this.stars.forEach(s=>{ctx.globalAlpha=s.brightness;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;}}