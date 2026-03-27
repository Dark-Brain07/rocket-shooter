export class RenderPipeline{private passes:Array<{name:string,render:(dt:number)=>void}>=[];
addPass(n:string,r:(dt:number)=>void){this.passes.push({name:n,render:r});}
execute(dt:number){this.passes.forEach(p=>p.render(dt));}
getCount():number{return this.passes.length;}}