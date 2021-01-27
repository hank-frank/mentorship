import {
    HttpErrorResponse,
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

@Injectable()
export class MentorshipHttpInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private apiService: ApiService) { };
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    // if (event instanceof HttpResponse && event.status === 200) {
                    // }
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        console.log('catching 401, bad login');
                        this.apiService.setIsLogInErrorMessage(true);
                        this.toastr.error("Error", `${error.status}`);
                    }
                    return throwError(error);
                }),
                finalize(() => {
                    const msg = `"${req.urlWithParams}"`;
                    console.log(msg);
                })
            )
    }
}
    // return new Observable((observer) => {
    //     next.handle(req).subscribe(
    //         (res: HttpResponse<any>) => {
    //             console.log(`outside if: `, req);

    //             if (res instanceof HttpResponse) {
    //                 console.log(`response in if: `, res);
    //                 observer.next(res);
    //             } else {
    //                 console.log(`in else: `, req);

    //             }
    //         },
    //         (err: HttpErrorResponse) => {

    //             console.log(`error: `, err);
    //         }
    //     )
    // });