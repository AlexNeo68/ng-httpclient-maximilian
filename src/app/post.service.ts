import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  store(title: string, content: string) {
    const newPost: Post = { title, content };
    this.http
      .post<{ name: string }>(
        'https://ng-http-f320d-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        newPost,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => this.error.next(error.message)
      );
  }

  index() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('search', 'query');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-http-f320d-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map((receiveData) => {
          const result: Post[] = [];
          for (const key in receiveData) {
            if (receiveData.hasOwnProperty(key)) {
              result.push({ ...receiveData[key], id: key });
            }
          }
          return result;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  destroy() {
    return this.http
      .delete(
        'https://ng-http-f320d-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        {
          observe: 'events',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
        })
      );
  }
}
