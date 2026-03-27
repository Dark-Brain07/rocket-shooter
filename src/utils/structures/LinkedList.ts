export class LinkedList<T=any>{private data:T[]=[];
add(item:T){this.data.push(item);}
remove():T|undefined{return this.data.pop();}
get size(){return this.data.length;}
clear(){this.data=[];}
isEmpty():boolean{return this.data.length===0;}}