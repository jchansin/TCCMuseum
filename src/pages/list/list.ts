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
  public worksInfo = [];
  

  constructor(platform: Platform, public navCtrl: NavController, private sqlite: SQLite, private dbService: DatabaseProvider, public navParams: NavParams) {
    
    this.getSeenWorks();
    this.getTotalWorks();
    this.getWorksInfo();
    this.checkSeenStatus();
    

  }



  // Get number of works already seen in browser
  public getSeenWorks(): void {
    this.dbService.db.executeSql(`SELECT COUNT(visit_status) AS seen FROM works WHERE works.visit_status=1`, {})
      .then((data) => {
        console.log(data.rows.item(0).seen);
        this.seenWorks = data.rows.item(0).seen;
      })
  }

  // Get total number of works in db
  public getTotalWorks(): void {
    this.dbService.db.executeSql(`SELECT COUNT(id) AS total FROM works`, {})
      .then((data) => {
        console.log(data.rows.item(0).total);
        this.totalWorks = data.rows.item(0).total;
      })
  }

  // Get last name, first name, photo local address and QR code for all
  public getWorksInfo(): void {
    this.dbService.db.executeSql("SELECT lastname, firstname, photo_path, qr_code_number, visit_status FROM works", {})
      .then((data) => {
        console.log(data.rows.item(0));
        for (let i=0; i<data.rows.length; i++) this.worksInfo.push(data.rows.item(i));
      })
  }

  // Test function to check if visit_status gets updated when scanning
  public checkSeenStatus(): any {
    this.dbService.db.executeSql("SELECT visit_status FROM works where lastname='CHANSIN'", {})
      .then((data) => {
        console.log(data.rows.item(0));
      })
  }


}
