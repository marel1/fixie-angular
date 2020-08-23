import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../_models/Token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  headers = new HttpHeaders(`token: ${this.token}`);
  httpOptions = {
    headers: this.headers,
  };

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
    return this.http.get(
      `https://localhost:8000/privateData`,
      this.httpOptions
    );
  }
  postUserData(data) {
    return this.http.post(
      `https://localhost:8000/privateData`,
      data,
      this.httpOptions
    );
  }
  deleteUserData(id) {
    return this.http.delete(
      `https://localhost:8000/privateData/${id}`,
      this.httpOptions
    );
  }
  updateUserData(data) {
    return this.http.put(
      `https://localhost:8000/privateData/${data.id}`,
      data,
      this.httpOptions
    );
  }
  changePassword(newPassword) {
    return this.http.patch(
      'https://localhost:8000/changePassword',
      { password: newPassword },
      this.httpOptions
    );
  }
}
