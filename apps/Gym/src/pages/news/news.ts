import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsServiceProvider } from '../../providers/news-service/news-service';
import { AlertController } from 'ionic-angular';  
// import { noticiaPage } from '../noticia-page/noticia-page';


/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  //Practica
  news: any;
  //


  constructor(public navCtrl: NavController, public navParams: NavParams, public newsServiceProvider: NewsServiceProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.newsServiceProvider.getNews()
      .subscribe(
        data => {
           // Success
           console.log("DATAAAAA:   "+data);
          this.news = data;
          console.log(this.news);
        },
        (error) => {
          console.error(error);
        });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(NewsPage, {
      item: item
    });
  }
  

  // //PopUp
  // doPrompt() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Login',
  //     message: "Enter a name for this new album you're so keen on adding",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //       {
  //         name: 'body',
  //         placeholder: 'body'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }


}
