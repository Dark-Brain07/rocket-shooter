export class AnimationMixer{private playing=false;private time=0;
play(){this.playing=true;}
pause(){this.playing=false;}
stop(){this.playing=false;this.time=0;}
update(dt:number){if(this.playing)this.time+=dt;}
getTime():number{return this.time;}
isPlaying():boolean{return this.playing;}
reset(){this.time=0;this.playing=false;}}