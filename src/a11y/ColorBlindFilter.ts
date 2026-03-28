export class ColorBlindFilter{private active=false;
enable(){this.active=true;}
disable(){this.active=false;}
isActive(){return this.active;}
toggle(){this.active=!this.active;}}