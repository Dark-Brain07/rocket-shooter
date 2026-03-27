export class FSMController{private enabled=true;
enable(){this.enabled=true;}
disable(){this.enabled=false;}
isEnabled():boolean{return this.enabled;}
update(dt:number):void{if(!this.enabled)return;}
reset():void{this.enabled=true;}}