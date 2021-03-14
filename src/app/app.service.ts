import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppService {

    constructor(private readonly http: HttpClient) {

    }

    public getSearchResults(mytext: string): Observable<any> {
      return  this.http.get(`https://jsonplaceholder.typicode.com/comments?q=${mytext}`)
      .pipe(catchError(this.handleError));
    }


    public handleError(error: HttpErrorResponse | any) {
      return throwError(error);
  }
}
