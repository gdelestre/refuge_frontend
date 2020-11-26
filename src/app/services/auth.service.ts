import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/auth';
//const url = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class SignUpData {
  username: string;
  email: string;
  role: string[];
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    const url = `${baseUrl}/signin`;
    return this.http.post(url, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: SignUpData): Observable<any> {
    const url = `${baseUrl}/signup`;
    return this.http.post(url, user, httpOptions);
  }
}