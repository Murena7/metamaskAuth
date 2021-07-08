import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IAuthBody, IAuthResponse} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  constructor(private http: HttpClient) {
  }

  getNonce(): Observable<number> {
    return this.http
      .get<number>(`${environment.backEndUrl}/token`)
  }

  auth(body: IAuthBody): Observable<HttpResponse<IAuthResponse>> {
    return this.http
      .post<IAuthResponse>(`${environment.backEndUrl}/auth`, body, {observe: 'response'});
  }
}
