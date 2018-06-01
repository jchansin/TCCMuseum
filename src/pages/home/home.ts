import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../database/database';
import { Platform } from 'ionic-angular';


//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


const DATABASE_FILE_NAME: string = 'tccmuseum.db';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private db: SQLiteObject;
  public loadingStatus: string;
  public myName: string;


  constructor (platform: Platform, public navCtrl: NavController, private sqlite: SQLite, private dbService: DatabaseProvider) {
    
    platform.ready()
      .then(() => {
        this.dbService.startAppDatabase();
        this.loadingStatus = this.dbService.loadingStatus;
    })
    
  }


  // Function linked to start button, sends to the Tabs/List pages and sets Root page to Tabs
  private goToTabs() {
    console.log("Root page set to Tabs");
    this.navCtrl.setRoot(TabsPage, this.db)
      
  }



}
