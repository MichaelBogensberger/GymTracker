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

  private split1 = false;
  private split2 = false;
  private split3 = false;
  private split4 = false;

  public user;


  constructor(private http: HttpClient, 
    public loadingController: LoadingController,
    private dataService: DataService,
    private cookie: CookieService) {
  }

  ngOnInit() {

    this.formData = new FormGroup({
      username: new FormControl(),
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
        console.log(this.user);
        this.cookie.set("userid", this.user.id);
      });




    //console.log("FERTIG ->");
    //console.log(this.user);

    //console.log(JSON.stringify(data));






    await loading.dismiss();




    

  }


}
