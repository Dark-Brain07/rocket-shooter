export class AudioStore{private data:Record<string,any>={};
get<T>(k:string):T|undefined{return this.data[k];}
set(k:string,v:any){this.data[k]=v;}
has(k:string){return k in this.data;}
remove(k:string){delete this.data[k];}
clear(){this.data={};}}