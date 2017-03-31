import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular'
import {Video} from "../../models/video"
import 'rxjs/add/operator/map';
import {YoutubeService} from '../../providers/youtube-service/youtube-service';
import {DataService} from '../../providers/data-service/data-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[YoutubeService, DataService]
})
export class HomePage implements OnInit {

  videos =[];
  currentVideo:Video; 
  videoIndex:number = 0;
  swipeCount:number = 0;  
  errorMessage; 

  constructor(public navCtrl: NavController, public ytPlayer: YoutubeService, public toastCtrl:ToastController, public dataService:DataService) {
    this.currentVideo = new Video({id:"", title:""}); 
  }

  ngOnInit() { 
    this.loadVideoList(); 
  }

  loadVideoList(){
    this.dataService.get()
                     .subscribe(
                       videos => {
                        console.log(videos); 
                        this.videos = videos
                        this.currentVideo = new Video(this.videos[this.videoIndex]);
                      },
                       error =>  this.errorMessage = <any>error);
   
  }

  playVideoById(id): void {
    this.ytPlayer.launchPlayer(id, null);
  }

  playVideo(): void {
    this.currentVideo = this.videos[this.videoIndex]; 
    this.ytPlayer.launchPlayer(this.currentVideo.id, this.currentVideo.title);
  }

  playNext(){
    this.videoIndex++; 
    if(this.videoIndex > (this.videos.length -1)){
      this.videoIndex = 0; 
    }
    this.playVideo(); 
  }
  playPreviews(){

    this.videoIndex--;
    if(this.videoIndex <= 0){
      this.videoIndex = 0; 
    }
    this.playVideo(); 

  }
  swipe(event){

    if(event.type=== "swipe"){
      if(event.direction == 2){
        this.playNext(); 
        this.presentToast()
      }else if(event.direction ==4){
        this.playPreviews(); 
        this.presentToast()
      }
    }
  }

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Changing video ...',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
