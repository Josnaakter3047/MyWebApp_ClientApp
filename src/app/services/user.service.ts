import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login/login';
import { Registeruser } from '../models/register/registeruser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postLogin(data:Login):Observable<Login> {
    return this.http.post<Login>(`http://localhost:16669/api/users/login` , data);
  }

  postRegister(data: Registeruser): Observable<Registeruser> {
    return this.http.post<Registeruser>(`http://localhost:16669/api/users/RegisterUser`, data);
  }
}
