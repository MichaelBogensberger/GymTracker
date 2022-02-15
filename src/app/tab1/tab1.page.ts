import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user;
  public weight;
  bmi_text = "";
  public exercises = [];


  constructor(private dataService: DataService,
    private cookie: CookieService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) {}


  ngOnInit() {
    if(this.cookie.get("token") == "") {
      console.log("Token ist nicht null");
      //alert(this.cookie.get("token"));
      window.location.href = '/';
    }
    
    this.updateExercises();



    this.dataService.apiGetUserFromAuth(this.cookie.get("token")).subscribe(data => {
        this.user = data;
        this.checkBMI(data.bmi);
    })
    
    this.dataService.apiGetMostCurrentWeight(this.cookie.get("userid"),
    this.cookie.get("token")).subscribe(data => {
      this.weight = data.weight;
    })

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  checkBMI(bmi) {
      if(bmi >= 18.5 && bmi <= 24.9) {
        this.bmi_text = "Normalgewicht";
      } else if (bmi >= 25) {
        this.bmi_text = "Übergewichtig";
      } else if (bmi <= 18.4) {
        this.bmi_text = "Übergewichtig";
      }
  }



  async addExerciseAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Add Exercise',
      message: 'Hier kannst du eine Übung hinzufügen.',

      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text'
        },
        {
          name: 'reps',
          placeholder: 'Wiederholungen',
          type: 'number'
        },
        {
          name: 'sets',
          placeholder: 'Sätze',
          type: 'number'
        },
        {
          name: 'gewicht',
          placeholder: 'Gewicht',
          type: 'number'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.apiAddExercise(this.cookie.get("userid"),
            res.gewicht, res.name, res.sets, res.reps,
            this.cookie.get("token")
            ).subscribe(data => {
              //console.log(data);
              this.updateExercises();
            })

          }
        }
      ]

    });
    await alert.present();
}



  
  updateExercises() {
    this.dataService.apiGetAllExercises(this.cookie.get("userid"),
    this.cookie.get("token")
    ).subscribe(data => {
      this.exercises = data;
      console.log(data);
    })
  }
  




  async openExercise(exercise) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {exercise},
      breakpoints: [0, 0.55, 0.8],
      initialBreakpoint: 0.55
    });

    modal.onDidDismiss()
    .then((data) => {
      this.updateExercises();
  });

    modal.present();
  }



}
