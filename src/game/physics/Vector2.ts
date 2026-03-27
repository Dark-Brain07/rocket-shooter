export class Vector2{constructor(public x:number=0,public y:number=0){}
add(v:Vector2):Vector2{return new Vector2(this.x+v.x,this.y+v.y);}
sub(v:Vector2):Vector2{return new Vector2(this.x-v.x,this.y-v.y);}
scale(s:number):Vector2{return new Vector2(this.x*s,this.y*s);}
magnitude():number{return Math.sqrt(this.x*this.x+this.y*this.y);}
normalize():Vector2{const m=this.magnitude();return m>0?new Vector2(this.x/m,this.y/m):new Vector2();}
dot(v:Vector2):number{return this.x*v.x+this.y*v.y;}
distanceTo(v:Vector2):number{return this.sub(v).magnitude();}
angle():number{return Math.atan2(this.y,this.x);}
static fromAngle(a:number,m=1):Vector2{return new Vector2(Math.cos(a)*m,Math.sin(a)*m);}
clone():Vector2{return new Vector2(this.x,this.y);}}