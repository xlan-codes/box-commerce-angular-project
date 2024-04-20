import { HttpInterceptor, HttpRequest, HttpHandler, HttpInterceptorFn, HttpHandlerFn } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiKey = "011bd2030a18440e90d39f2f9881d7c3";
    console.log("sss");
    const authReq = req.clone({
      params: req.params.append('api_key', apiKey)
    });
    return next.handle(authReq);
  }
}

export const httpInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
    console.log("sss");
  const apiKey = "011bd2030a18440e90d39f2f9881d7c3";
  const authReq = req.clone({
    params: req.params.append('api_key', apiKey)
  });
  return next(authReq);
};