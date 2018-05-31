import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../database/database';
import { Platform } from 'ionic-angular';


//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  public seenWorks: any;
  public totalWorks: any;
  public testString: any;


  

  constructor(platform: Platform, public navCtrl: NavController, private sqlite: SQLite, private dbService: DatabaseProvider, public navParams: NavParams) {
    
    this.getSeenWorks();
    this.getTotalWorks();
    //this.getPersonalInfo();

  }



  // Get number of works already seen in browser
  public getSeenWorks(): void {
    this.dbService.db.executeSql(`SELECT COUNT(visit_status) AS seen FROM works WHERE works.visit_status=1`, {})
      .then((data) => {
        console.log(data.rows.item(0).seen)
        this.seenWorks = data.rows.item(0).seen
      })
  }

  // Get total number of works in db
  public getTotalWorks(): void {
    this.dbService.db.executeSql(`SELECT COUNT(id) AS total FROM works`, {})
      .then((data) => {
        console.log(data.rows.item(0).total)
        this.totalWorks = data.rows.item(0).total
      })
  }

  /* // Get last name, first name, photo local address and QR code for all
  public getPersonalInfo(): void {
    this.dbService.db.executeSql("SELECT lastname, firstname, photo_path, qr_code_number AS info FROM works", {})
      .then((data) => {
        console.log(data.rows.item(0))
      })
  } */

}
