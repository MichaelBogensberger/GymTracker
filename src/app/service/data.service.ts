import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';



const url = "http://localhost:8080";
var user;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
  }



  apiCreateUser(firstname, lastname, email, password, username, height) :Observable<IUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json; charset=UTF-8')
      .set('firstname', firstname)
      .set('lastname', lastname)
      .set('email', email)
      .set('password', password)
      .set('username', username)
      .set('height', String(height));


    return this.http.post<IUser>(url + '/api/createUser',null , { headers: headers });

  }

  apiLogin(username, password) :Observable<IToken> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')

    const body = {
      username: username,
      password: password
    }

    return this.http.post<IToken>(url + '/api/login', body);

  }





  
}
