export class CanvasError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='CanvasError';this.code=code;}}