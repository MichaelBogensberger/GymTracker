import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private formData: FormGroup;
  selected_option: string;

  private split1 = false;
  private split2 = false;
  private split3 = false;
  private split4 = false;



  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.formData = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      days: new FormControl(),
      split: new FormControl(),
      split1: new FormControl(),
      split2: new FormControl(),
      split3: new FormControl(),
      split4: new FormControl()
    });
  }

  onSelectChange() {
    switch (this.selected_option) {
      case '1':
        this.split1 = true;
        this.split2 = false;
        this.split3 = false;
        this.split4 = false;

        this.formData.value.split2 = null;
        this.formData.value.split3 = null;
        this.formData.value.split4 = null;

        break;

      case '2':
        this.split1 = true;
        this.split2 = true;
        this.split3 = false;
        this.split4 = false;

        this.formData.value.split3 = null;
        this.formData.value.split4 = null;
        break;

      case '3':
        this.split1 = true;
        this.split2 = true;
        this.split3 = true;
        this.split4 = false;

        this.formData.value.split4 = null;
        break;

      case '4':
        this.split1 = true;
        this.split2 = true;
        this.split3 = true;
        this.split4 = true;
        break;
    }
  }



  onSubmit() {
    console.log(this.formData.value);


    


    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json; charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers','*')
      .set('Access-Control-Expose-Headers', 'Content-Type, Authorization, X-Requested-With"')
      .set('Access-Control-Allow-Credential', 'true')
      .set('Access-Control-Max-Age', '86400')
      

      .set('firstname', 'firstnameU')
      .set('lastname', 'LastnameU')
      .set('email', 'test@gmail.at')
      .set('password', '123')
      .set('username', 'testuser');

    const b = {
      status: 'CONFIRMED'
    };
    this.http.post('http://localhost:8080/api/createUser',null , { headers: headers }).toPromise().then((data:any) => {
      console.log(data)
    });


    

  }


}
