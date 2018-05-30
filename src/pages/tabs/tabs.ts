import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../database/database';

import { InfoPage } from '../info/info';
import { ListPage } from '../list/list';
import { ScanPage } from '../scan/scan';

//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = ScanPage;
  tab3Root = InfoPage;



  constructor(public navCtrl: NavController, private sqlite: SQLite) {

  }


}
