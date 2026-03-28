export class Compressor{private gain=1;private muted=false;
setGain(v:number){this.gain=Math.max(0,Math.min(1,v));}
getGain(){return this.gain;}
mute(){this.muted=true;}
unmute(){this.muted=false;}
isMuted(){return this.muted;}
reset(){this.gain=1;this.muted=false;}}