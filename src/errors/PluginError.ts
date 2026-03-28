export class PluginError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='PluginError';this.code=code;}}