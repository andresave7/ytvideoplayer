
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {YoutubeService} from '../../providers/youtube-service/youtube-service';
import {DataService} from '../../providers/data-service/data-service'
import {Video} from '../../models/video';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers:[YoutubeService, DataService]
})
export class ListPage implements OnInit {
  
  private videos = [];
  private errorMessage; 

  constructor(public nav:NavController, public alertCtrl:AlertController, public dataService: DataService) {
  }

  ngOnInit() { 
    this.getVideoList(); 
  }

  playVideo(video): void {
    
  }

  addVideo() {
    let prompt = this.alertCtrl.create({
      title: 'Add Video',
      message: "Enter the youtube videoId and title",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'id',
          placeholder: 'id'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let video = new Video(data); 
            this.writeData(video); 
          }
        }
      ]
    });
    prompt.present();
  }

  writeData(video){
      if (!video) { return; }
      this.dataService.add(video)
                     .subscribe(
                       hero  => this.videos.push(hero),
                       error =>  this.errorMessage = <any>error);
  }

  dragToDelete(){
    this.remove(); 
  }

  remove(){
    alert('removed'); 
  }

  getVideoList() {
    this.dataService.get()
                     .subscribe(
                       videos => this.videos = videos,
                       error =>  this.errorMessage = <any>error);
  }
}
