export class PerfTracker{private data:any[]=[];private on=true;
enable(){this.on=true;}
disable(){this.on=false;}
track(ev:string,props?:Record<string,any>){if(!this.on)return;this.data.push({ev,props,ts:Date.now()});}
getData(){return[...this.data];}
flush(){const d=[...this.data];this.data=[];return d;}
getMetrics(){return{total:this.data.length,unique:new Set(this.data.map(d=>d.ev)).size};}}