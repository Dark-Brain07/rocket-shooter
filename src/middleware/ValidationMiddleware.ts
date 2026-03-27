export type Next=(d:any)=>Promise<any>;
export class ValidationMiddleware{async execute(d:any,next:Next):Promise<any>{return next(d);}}