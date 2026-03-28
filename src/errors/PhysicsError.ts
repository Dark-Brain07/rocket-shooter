export class PhysicsError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='PhysicsError';this.code=code;}}