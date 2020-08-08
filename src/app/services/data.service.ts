import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { Candidate } from '../shared/candidate';
import { ErrorProcessorService } from './error-processor.service';
import { User } from '../shared/users';

interface Cand {
  success: boolean;
  message: string;
  candidates: Candidate[];
}

interface Candid {
  success: boolean;
  message: string;
  candidate: Candidate;
}

interface Vote {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorProcessorService
  ) {}

  id: string = null;
  private _listener = new Subject<any>();
  message: string = null;
  cand: Candidate;

  getAllCandidates(): Observable<any> {
    return this.http
      .get<Cand>(baseURL + '/user/allCandidates')
      .pipe(
        map((res) => {
          if (res.success) {
            return { candidates: res.candidates, message: res.message };
          } else {
            return { candidates: res.candidates, message: res.message };
          }
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getCandidate(id: string): Observable<any> {
    return this.http
      .get<Candid>(baseURL + '/user/candidate/' + id)
      .pipe(
        map((res) => {
          if (res.success) {
            return { candidate: res.candidate, message: res.message };
          } else {
            return { candidate: null, message: res.message };
          }
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  vote(user: User): Observable<any> {
    return this.http
      .post<Vote>(baseURL + '/user/vote/' + this.id, user)
      .pipe(
        map((res) => {
          this.message = res.message;
          return { success: res.success, message: res.message };
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  listen(): Observable<any> {
    return this._listener.asObservable().pipe(
      map((res) => {
        return { message: this.message };
      })
    );
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }

  addCandidate(cand: Candidate): Observable<any> {
    return this.http
      .post<Candid>(baseURL + '/admin/addCandidate', cand)
      .pipe(
        map((res) => {
          return { success: res.success, message: res.message };
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  deleteCand(code: string): Observable<any> {
    return this.http
      .post<Vote>(baseURL + '/admin/deleteCandidate/' + this.id, {
        admin: code,
      })
      .pipe(
        map((res) => {
          return { success: res.success, message: res.message };
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  updateCand(cand: Candidate): Observable<any> {
    return this.http
      .put<Vote>(baseURL + '/user/editCandidate', cand)
      .pipe(
        map((res) => {
          return { success: res.success, message: res.message };
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }

  adminUpdateCand(can: Candidate): Observable<any> {
    return this.http
      .put<Vote>(baseURL + '/admin/editCandidate/' + can._id, can)
      .pipe(
        map((res) => {
          return { success: res.success, message: res.message };
        })
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
