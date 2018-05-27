import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TabsPage } from '../tabs/tabs';


const DATABASE_FILE_NAME: string = 'tccmuseum.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private db: SQLiteObject;
  public loadingStatus: string;

  constructor (public navCtrl: NavController, public loadingCtrl: LoadingController, private sqlite: SQLite) {
    this.createAppDatabase();
  }

  private createAppDatabase(): void {
    this.loadingStatus = 'Chargement en cours, veuillez patienter'
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log(`DB created, named {DATABASE_FILE_NAME`)
        this.db = db;
        this.createTable();
      })
        .then(() => {
          this.loadingStatus = "Touchez ici pour démarrer"
        })
     
      .catch(e => console.log(e));
  }

  private createTable(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `oeuvres` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` TEXT )', {})
    .then(() => console.log('Table created'))
    .catch(e => console.log(e));

  }

  private goToTabs() {
    this.navCtrl.push(TabsPage)
  }

}
