export class GamepadAdapter{private active=false;private events:any[]=[];
start(){this.active=true;this.events=[];}
stop(){this.active=false;}
record(ev:any){if(this.active)this.events.push({...ev,t:Date.now()});}
getEvents(){return[...this.events];}
clear(){this.events=[];}
isRecording(){return this.active;}
getCount(){return this.events.length;}}