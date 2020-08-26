import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivityDictionariesService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  headers = new HttpHeaders(`token: ${this.token}`);
  httpOptions = {
    headers: this.headers,
  };

  getPartTypeData() {
    return this.http.get(
      `https://localhost:8002/activityDictionaries`,
      this.httpOptions
    );
  }
  postPartTypeData(data) {
    console.log(data);
    return this.http.post(
      `https://localhost:8002/activityDictionary`,
      data,
      this.httpOptions
    );
  }
  deletePartTypeData(code) {
    return this.http.delete(
      `https://localhost:8002/activityDictionary/${code}`,
      this.httpOptions
    );
  }
}
