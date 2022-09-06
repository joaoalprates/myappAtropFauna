import { AtropService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from './../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  atrops: any = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    private router: Router,
    private atropService: AtropService,
    public photoService: PhotoService,
    ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.atropService.getAtrops().subscribe((response) => {
      this.atrops = response;
    });
  }
}
