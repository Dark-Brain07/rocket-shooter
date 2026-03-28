export class ShaderError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='ShaderError';this.code=code;}}