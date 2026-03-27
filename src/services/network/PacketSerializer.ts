export class PacketSerializer{private connected=false;
connect():Promise<boolean>{this.connected=true;return Promise.resolve(true);}
disconnect(){this.connected=false;}
isConnected():boolean{return this.connected;}
dispose(){this.disconnect();}}