export class ParseError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='ParseError';this.code=code;}}