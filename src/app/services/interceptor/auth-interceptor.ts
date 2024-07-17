import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor( private authService: AuthService){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)

    return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
            if(!user){
                return next.handle(req);
            }
            console.log("ikinci" +user)
            console.log("birinci"+user.token)
            const updatedreq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                  }
                });
            return next.handle(updatedreq) 

        })
    )
 
}

}