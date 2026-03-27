export type Next=(d:any)=>Promise<any>;
export class CachingMiddleware{async execute(d:any,next:Next):Promise<any>{return next(d);}}