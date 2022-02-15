import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private formData: FormGroup;
  selected_option: string;

  
  today = new Date().toJSON().slice(0,10).replace(/-/g,'-');


  public user;


  constructor(private http: HttpClient, 
    public loadingController: LoadingController,
    private dataService: DataService,
    private cookie: CookieService) {
  }

  ngOnInit() {
    //console.log("today:" + this.today);


    if(this.cookie.get("token") !== "") {
      console.log("Token ist nicht null");
      //alert(this.cookie.get("token"));
      window.location.href = '/login';
    }


    this.formData = new FormGroup({
      username: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),

    });

  }







  async onSubmit() {

    const loading = await this.loadingController.create({
      message: 'User wird erstellt'
    });
    await loading.present();

    //console.log(this.formData.value);


    //let data = this.dataService.apiCreateUser('firs', 'asd', 'ss', 'sd', 'sd');

    this.dataService.apiCreateUser(this.formData.value.firstname,
      this.formData.value.lastname,
      this.formData.value.email,
      this.formData.value.password,
      this.formData.value.username,
      this.formData.value.height
      ).subscribe(data => {
        this.user = data;
        //console.log(this.user);
        this.cookie.set("userid", this.user.id);


        this.dataService.apiLogin(this.formData.value.username,
          this.formData.value.password).subscribe(data => {
              console.log(data.token);
              this.cookie.set("token", data.token);
              console.log("TOKEN COOKIE --->");
              console.log(this.cookie.get("token"));


              this.dataService.apiAddWeight(
                this.cookie.get("userid"),
                this.formData.value.weight,
                this.today,
                this.cookie.get("token")).subscribe(data => {


                  this.dataService.apiCalcBMI(
                    this.cookie.get("userid"),
                    this.cookie.get("token")
                  ).subscribe(data => {
                    
                    window.location.href = '/main/tabs/tab1';


                  })
                  
              })











              

          });


      });




    //console.log("FERTIG ->");
    //console.log(this.user);

    //console.log(JSON.stringify(data));






    await loading.dismiss();




    

  }


}
