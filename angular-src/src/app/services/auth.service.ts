import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post("http://localhost:80/api/register", user, this.httpOptions)
      .pipe(map(res => res));
  }

  authenticateUser(user) {
    return this.http.post("http://localhost:80/api/authentication", user, this.httpOptions)
      .pipe(map(res => res));
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    console.log(headers);
    return this.http.get("http://localhost:80/api/profile", { headers: headers })
      .pipe(map(res => res));
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken();
    const helper = new JwtHelperService();
    return (!helper.isTokenExpired(this.authToken));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}


