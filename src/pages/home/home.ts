import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../database/database';

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


  constructor (public navCtrl: NavController, private sqlite: SQLite, private dbService: DatabaseProvider) {
    
    this.dbService.startAppDatabase();
    this.loadingStatus = this.dbService.loadingStatus;
    
  }


  // Function for creating table "works", only if not already created
  private createTable(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `works` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` TEXT )', {})
    .then(() => console.log('Table created'))
    .catch(e => console.log(e));

  }

  // Function linked to start button, sends to the Tabs/List pages
  private goToTabs() {
    this.navCtrl.push(TabsPage, this.db)
  }



}
