import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorProcessorService } from './error-processor.service';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Candidate } from '../shared/candidate';
import { DataService } from './data.service';

interface Login {
  success: boolean;
  message: string;
  token: string;
  name: string;
  id: string;
}

interface JWTResponse {
  success: boolean;
  message: string;
  name: string;
  id: string;
}

interface Cand {
  success: boolean;
  message: string;
  candidate: Candidate;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  id: Subject<string> = new Subject<string>();
  authToken: string = undefined;

  constructor(
    private http: HttpClient,
    private errorProcessor: ErrorProcessorService,
    private dataService: DataService
  ) {}

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if (
      credentials &&
      credentials.username !== undefined &&
      credentials.id !== undefined
    ) {
      this.useCredentials(credentials);
      this.sendId(credentials.id);
      if (this.authToken) {
        this.dataService.getCandidate(credentials.id).subscribe((data) => {
          this.dataService.cand = data.candidate;
        });
        this.checkJWTtoken();
      }
    }
  }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + '/user/checkToken').subscribe(
      (res) => {
        if (res.success) {
          this.sendUsername(res.name);
          this.sendId(res.id);
        } else {
          this.destroyUserCedentials();
        }
      },
      (err) => {
        this.destroyUserCedentials();
      }
    );
  }

  storeUserCredentials(credentials: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.sendId(credentials.id);
    this.authToken = credentials.token;
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  sendId(id: string) {
    this.id.next(id);
  }

  loginUser(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post<Login>(baseURL + '/user/loginCandidate', user)
      .pipe(
        map((res) => {
          if (res.success) {
            this.storeUserCredentials({
              username: res.name,
              token: res.token,
              id: res.id,
            });
            return { success: res.success, username: res.name, id: res.id };
          } else {
            return { success: res.success, message: res.message };
          }
        })
      )
      .pipe(catchError(this.errorProcessor.handleError));
  }

  destroyUserCedentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  clearUsername() {
    this.username.next(undefined);
    this.id.next(undefined);
  }

  logOut() {
    this.destroyUserCedentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getId(): Observable<string> {
    return this.id.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }
}
