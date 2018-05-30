import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../database/database';

//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  // private seenWorks: number;
  // private totalWorks: number;
  private testString: any;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private dbService: DatabaseProvider, public navParams: NavParams) {
    
    /* this.dbService.initAppDatabase();
    this.testString = this.dbService.requestJipeValue(); */

  }

 
  

}
