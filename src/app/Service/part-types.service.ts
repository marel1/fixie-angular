import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartTypesService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  headers = new HttpHeaders(`token: ${this.token}`);
  httpOptions = {
    headers: this.headers,
  };

  getPartTypeData() {
    return this.http.get(`https://localhost:8002/partTypes`, this.httpOptions);
  }
  postPartTypeData(data) {
    console.log(data);
    return this.http.post(
      `https://localhost:8002/partType`,
      data,
      this.httpOptions
    );
  }
  deletePartTypeData(id) {
    return this.http.delete(
      `https://localhost:8002/partType/${id}`,
      this.httpOptions
    );
  }
}
