export class MempoolWatcher{private net:'mainnet'|'testnet'='mainnet';
setNet(n:'mainnet'|'testnet'){this.net=n;}
getNet(){return this.net;}
async exec(p:Record<string,any>):Promise<{id:string}>{return{id:Math.random().toString(36).slice(2)};}
check(p:Record<string,any>){return!!p&&Object.keys(p).length>0;}}