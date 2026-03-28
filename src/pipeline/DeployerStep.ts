export class DeployerStep{private opts:Record<string,any>={};
configure(o:Record<string,any>){this.opts={...this.opts,...o};}
run():Promise<{ok:boolean}>{return Promise.resolve({ok:Object.keys(this.opts).length>0});}
reset(){this.opts={};}}