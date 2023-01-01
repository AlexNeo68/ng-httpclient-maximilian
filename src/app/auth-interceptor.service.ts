import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('With Request anyway');
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    return next.handle(modifiedReq);
  }
}
