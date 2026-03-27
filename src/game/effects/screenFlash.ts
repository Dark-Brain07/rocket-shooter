export class ScreenFlash{private alpha=0;private color='#fff';private decay=0.05;
trigger(color='#ffffff',intensity=0.5){this.alpha=intensity;this.color=color;}
update(){if(this.alpha>0)this.alpha=Math.max(0,this.alpha-this.decay);}
render(ctx:CanvasRenderingContext2D,w:number,h:number){if(this.alpha<=0)return;ctx.globalAlpha=this.alpha;ctx.fillStyle=this.color;ctx.fillRect(0,0,w,h);ctx.globalAlpha=1;}
isActive():boolean{return this.alpha>0;}}