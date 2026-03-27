export interface Weapon{id:string;name:string;fireRate:number;damage:number;projectileType:string;level:number;}
export class WeaponSystem{private weapons:Weapon[]=[{id:'basic',name:'Blaster',fireRate:300,damage:1,projectileType:'laser',level:1}];private current=0;private lastFire=0;
getCurrent():Weapon{return this.weapons[this.current];}
canFire(now:number):boolean{return now-this.lastFire>=this.getCurrent().fireRate;}
fire(now:number){this.lastFire=now;}
upgrade(){const w=this.getCurrent();w.level++;w.damage+=0.5;w.fireRate=Math.max(100,w.fireRate-20);}
addWeapon(w:Weapon){this.weapons.push(w);}
switch(){this.current=(this.current+1)%this.weapons.length;}
reset(){this.weapons=[{id:'basic',name:'Blaster',fireRate:300,damage:1,projectileType:'laser',level:1}];this.current=0;}}