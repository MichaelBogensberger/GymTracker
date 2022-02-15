import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../service/data.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formData: FormGroup;

  constructor(private http: HttpClient, 
    public loadingController: LoadingController,
    private dataService: DataService,
    private cookie: CookieService) { }

  ngOnInit() {

    if(this.cookie.get("token") !== "") {
      console.log("Token ist nicht null");
      //alert(this.cookie.get("token"));
      window.location.href = '/main/tabs/tab1';
    }



    this.formData = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });



  }


  onSubmit() {
    console.log(this.formData.value)

    this.dataService.apiLogin(this.formData.value.username,
      this.formData.value.password).subscribe(data => {
        this.cookie.set("token", data.token);

          this.dataService.apiGetUserFromAuth(this.cookie.get("token")).subscribe(
            data => {
                console.log(data)
                this.cookie.set("userid", data.id);
                window.location.href = '/main/tabs/tab1';
            })

      });

  }


}
