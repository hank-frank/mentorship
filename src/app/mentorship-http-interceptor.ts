import { 
    HttpErrorResponse,
    HttpResponse,
    HttpEvent, 
    HttpHandler, 
    HttpInterceptor, 
    HttpRequest 
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';




@Injectable()
export class MentorshipHttpInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {};
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Http Interceptor: `);
        return next.handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        // this.toastr.success("Object created.");
                        // console.log(`${event.status} in tap: `);
                        this.toastr.success(`success!!!!`)
                    }
                    if(event instanceof HttpResponse){

                        console.log(`${event.status} in tap: `);
                    }

                    
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(`request: `, req);
                    console.log(`error: `, error)
                    // alert(`Http Error: ${req.url}`);
                    if (error.status === 401) {
                        console.log('catching 401');
                        this.toastr.error("Error", `${error.status}`);
                    } 
                    return throwError(error);
                }),
                finalize(() => {
                    const msg = `"${req.urlWithParams}"`;
                    console.log(msg);
                    console.log(`finalize : `);

                })
            )

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

    }


}