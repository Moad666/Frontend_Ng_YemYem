import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/models/user';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSuperUser$: Observable<boolean>;

  private baseUrl = "http://127.0.0.1:8000/api/token/";
  private isSuperUser = "http://127.0.0.1:8000/api/is_superuser/";

  constructor(private httpClient : HttpClient) {
    this.isSuperUser$ = this.checkIfSuperuser();
  }


  /*loginUser(user : User){
    this.authenticated$.next(true);
    return this.httpClient.post(`${this.baseUrl}`,user);
  }*/
  loginUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, user).pipe(
      tap((response: any) => {
        console.log('Server response:', response);

        const token = response.access; // Replace 'access_token' with the correct property name

        if (token) {
          localStorage.setItem('authToken', token);
          this.authenticated$.next(true);
          this.isSuperUser$ = this.checkIfSuperuser(); // Update isSuperUser$ after authentication
        } else {
          console.error('Access token not found in the server response');
        }
      })
    );
  }

  /*checkIfSuperuser(): Observable<any> {
    return this.httpClient.get(this.isSuperUser);
  }*/
  checkIfSuperuser(): Observable<boolean> {
    // Retrieve the token from storage
    const token = localStorage.getItem('authToken');

    // If token is not present, the user is not a superuser
    if (!token) {
      return of(false);
    }

    // Include the token in the headers of the request
    const headers = { Authorization: `Bearer ${token}` };

    return this.httpClient.get(this.isSuperUser, { headers }).pipe(
      catchError(() => of(false)),  // Handle HTTP errors by assuming the user is not a superuser
      map((response: any) => response?.is_superuser === true || false)
    );
  }


}
