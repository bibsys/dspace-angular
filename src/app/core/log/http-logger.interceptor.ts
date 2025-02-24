import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Request: ${request.method} ${request.urlWithParams}`, request);

    const startTime = Date.now();

    return next.handle(request).pipe(
      tap({
        next: (event: any) => {
          const duration = Date.now() - startTime;
          console.log(`Response from: [${request.method}] ${request.urlWithParams} {${event.status}} (${duration}ms)`);
        },
        error: (error: any) => {
          const duration = Date.now() - startTime;
          console.error(`Error from: [${request.method}] ${request.urlWithParams} {${error.status}} (${duration}ms)`);
        },
      })
    );
  }
}