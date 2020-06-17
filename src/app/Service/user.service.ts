import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from "../_models/Token";

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http:HttpClient) {}

  register(username, password)
  {
    console.log("register");
    return this.http.post<Token>(`(https://localhost:8000/register`, {username,password});

  }
  login(username, password)
  {
    console.log("login");
    return this.http.post<Token>(`(https://localhost:8000/login`, {username,password});
  }
  logout()
  {
    localStorage.removeItem('token');
  }
  grantRole(username: string, role:string)
  {
    console.log("grantRole");
    return this.http.patch(`(https://localhost:8000/grantRole`,{username, role});
  }
}
