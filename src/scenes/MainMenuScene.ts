export class MainMenuScene{private active=false;private loaded=false;
onEnter(){this.active=true;}
onExit(){this.active=false;}
update(dt:number){if(!this.active)return;}
render(ctx:CanvasRenderingContext2D){}
isActive(){return this.active;}
preload():Promise<void>{this.loaded=true;return Promise.resolve();}
dispose(){this.active=false;this.loaded=false;}}