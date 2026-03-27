export class ProjectilesRenderer{private ctx:CanvasRenderingContext2D|null=null;
init(ctx:CanvasRenderingContext2D){this.ctx=ctx;}
render(dt:number){if(!this.ctx)return;}
clear(){this.ctx?.clearRect(0,0,800,600);}
dispose(){this.ctx=null;}}