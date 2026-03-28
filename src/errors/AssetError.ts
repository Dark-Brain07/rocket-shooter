export class AssetError extends Error{readonly code:string;
constructor(msg:string,code='E_UNKNOWN'){super(msg);this.name='AssetError';this.code=code;}}