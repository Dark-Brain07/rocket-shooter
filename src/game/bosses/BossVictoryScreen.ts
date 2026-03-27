export class BossVictoryScreen{private active=false;
activate(){this.active=true;}
deactivate(){this.active=false;}
isActive():boolean{return this.active;}
update(dt:number){if(!this.active)return;}
reset(){this.active=false;}}