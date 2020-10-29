import { Injectable } from '@angular/core';
import { User } from './user'
import { Observable, throwError } from "rxjs"
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint: string = 'http://localhost:8081'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}
  
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  signIn(user: User) {
    return this.http.post<any>(`${this.endPoint}/users/login`, user).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
      this.getProfile().subscribe((res) => {
        this.currentUser = res
        this.router.navigate(['user-profile'])
      })
    })
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token')
    return (authToken !== null) ? true : false
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token')
    if ( removeToken == null ) {
      this.router.navigate(['log-in'])
    }
  }

  getProfile(): Observable<any> {
    let api = `${this.endPoint}/users/me`
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
