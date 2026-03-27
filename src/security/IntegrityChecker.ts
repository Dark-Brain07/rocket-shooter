export class IntegrityChecker{private active=true;
validate(input:any):boolean{if(!this.active)return true;return typeof input!=='undefined';}
sanitize(input:string):string{return input.replace(/[<>]/g,'');}}