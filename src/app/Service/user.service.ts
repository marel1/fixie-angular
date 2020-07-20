import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../_models/Token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(username, password) {
    console.log('register');
    return this.http.post<string>(`https://localhost:8000/register`, {
      username: username,
      password: password,
    });
  }
  login(username, password): Observable<any> {
    const headers = new HttpHeaders();

    console.log('login');
    return this.http.post(
      `https://localhost:8000/login`,
      { username: username, password: password },
      { headers, responseType: 'text' }
    );
  }

  grantRole(username: string, role: string) {
    console.log('grantRole');
    return this.http.patch(`https://localhost:8000/grantRole`, {
      username,
      role,
    });
  }

  getUsersData() {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({ token: token });
    const httpOptions = {
      headers: headers,
    };
    return this.http.get(`https://localhost:8000/privateData`, httpOptions);
  }
  postUserData() {
    console.log('posting');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(`token: ${token}`);
    const httpOptions = {
      headers: headers,
    };
    console.log(token);
    return this.http.post(
      `https://localhost:8000/privateData`,
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        telephone: 'telephone',
        postalCode: 'postalCode',
        street: 'street',
        houseNumber: 'houseNumber',
        city: 'city',
        taxNumber: 'taxNumber',
      },
      httpOptions
    );
  }
}
