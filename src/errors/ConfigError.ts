export class ConfigError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='ConfigError';this.code=code;}}