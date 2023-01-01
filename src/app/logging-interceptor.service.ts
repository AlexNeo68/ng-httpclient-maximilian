import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs';

export class LoginInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('With logging interceptor');
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type == HttpEventType.Response)
          console.log('Login interceptor');
        console.log(event);
      })
    );
  }
}
