import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private seenWorks: number;
  private totalWorks: number;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    //this.getSeenWorks();
    //this.getTotalWorks();

  }

  /* // Get number of works already seen in browser
  private getSeenWorks(): void {
    this.seenWorks = this.db.executesql(
      `SELECT COUNT(visit_status)
      FROM oeuvres
      WHERE oeuvres.visit_status=1`
    )
  }

  // Get total number of works in db
  private getTotalWorks(): void {
    this.totalWorks = this.db.executesql(
      `SELECT COUNT(id)
      FROM oeuvres`
    )
  } */


}
