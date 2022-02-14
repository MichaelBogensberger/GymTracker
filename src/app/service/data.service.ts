import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';



const url = "http://localhost:8080";
var user;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
  }



  apiCreateUser(firstname, lastname, email, password, username) :Observable<IUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json; charset=UTF-8')
      .set('firstname', firstname)
      .set('lastname', lastname)
      .set('email', email)
      .set('password', password)
      .set('username', username);


    return this.http.post<IUser>(url + '/api/createUser',null , { headers: headers });

  }







  
}
