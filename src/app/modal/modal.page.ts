import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataService} from '../service/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() exercise;
  private formData: FormGroup;

  constructor(private dataService: DataService, private modalCtrl: ModalController,private cookie: CookieService) { }

  ngOnInit() {
    //console.log(this.exercise);

    this.formData = new FormGroup({
      name: new FormControl(),
      sets: new FormControl(),
      reps: new FormControl(),
      gewicht: new FormControl(),

    });

    this.formData.setValue({
      name: this.exercise.name,
      sets: this.exercise.sets,
      reps: this.exercise.reps,
      gewicht: this.exercise.gewicht
    });


    
  }

  updateExercise() {
    this.dataService.apiEditExercise(
     this.cookie.get("userid"),
     this.formData.value.gewicht,
     this.formData.value.name,
     this.formData.value.sets,
     this.formData.value.reps,
     this.cookie.get("token"),
     this.exercise.exercise_id
    ).subscribe(data=> {
      console.log(data);
      this.modalCtrl.dismiss();
      
    })
  }

  deleteExercise() {
    this.dataService.apiDeleteExercise(this.exercise.exercise_id, this.cookie.get("token")).subscribe(data=> {
      console.log(data);
      this.modalCtrl.dismiss();
      
    })
  }



}
