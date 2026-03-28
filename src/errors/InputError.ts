export class InputError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='InputError';this.code=code;}}