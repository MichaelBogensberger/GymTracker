import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';



//const url = "http://localhost:8080";
const url = "https://mbogensberger.synology.me:51608";
var user;


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient,private cookie: CookieService) { 
  }



  apiCreateUser(firstname, lastname, email, password, username, height) :Observable<IUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json; charset=UTF-8')
      .set('rejectUnauthorized','false')
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
    .set('rejectUnauthorized', 'false')
    .set('requestCert', 'false')
    .set('insecure', 'true')
    /*.set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials','true')
    .set('Access-Control-Allow-Methods: OPTIONS, GET, POST','true')
    .set('Access-Control-Allow-Headers','Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control')
    */

    const body = {
      username: username,
      password: password
    }

    return this.http.post<IToken>(url + '/api/login', body, { headers: headers });

  }


  apiAddWeight(id, weight, date, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    .set('weight', String(weight))
    .set('weightDate', String(date));


    return this.http.post<any>(url + '/api/user/'+id+'/weight', null, { headers: headers });
  }


  apiAddPlan(id, type, type_order, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    .set('type', String(type))
    .set('type_order', String(type_order));
    return this.http.post<any>(url + '/api/user/'+id+'/plan', null, { headers: headers });
  }


  apiCalcBMI(id, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)

    return this.http.post<any>(url + '/api/user/'+id+'/calcBMI', null, { headers: headers });
  }


  apiGetUserFromAuth(authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)


    return this.http.get<any>(url + '/api/user/', { headers: headers });
  }

  apiGetMostCurrentWeight(id, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    return this.http.get<any>(url + '/api/user/'+String(id)+'/currentWeight', { headers: headers });
  }



  apiAddExercise(id, gewicht, name, sets, reps, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    .set('gewicht', String(gewicht))
    .set('name', String(name))
    .set('sets', String(sets))
    .set('reps', String(reps));

    return this.http.post<any>(url + '/api/user/'+id+'/exercise', null, { headers: headers });
  }

  apiGetAllExercises(id, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    return this.http.get<any>(url + '/api/user/'+String(id)+'/exercise', { headers: headers });
  }


  apiEditExercise(id, gewicht, name, sets, reps, authorization, exercise_id) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization)
    .set('gewicht', String(gewicht))
    .set('name', String(name))
    .set('sets', String(sets))
    .set('reps', String(reps));

    return this.http.put<any>(url + '/api/user/'+id+'/exercise/'+exercise_id, null, { headers: headers });
  }

  apiDeleteExercise(exercise_id, authorization) :Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; charset=UTF-8')
    .set('rejectUnauthorized','false')
    .set('Authorization', authorization);

    return this.http.delete<any>(url + '/api/exercise/'+exercise_id, { headers: headers });
  }












  
}
