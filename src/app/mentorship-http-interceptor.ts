import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class MentorshipHttpInterceptor implements HttpInterceptor {
    constructor() {};
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Http Interceptor");
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    alert(`Http Error: $req.url}`);
                    return throwError(error);
                }),
                finalize(() => {
                    const msg = `"${req.urlWithParams}"`;
                    console.log(msg);
                })
            );
    }
}