// Need to dump database values during table creation

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


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


  

  constructor (public navCtrl: NavController, private sqlite: SQLite) {
    
    this.createAppDatabase
    
  }

  private createAppDatabase(): void { 
    this.loadingStatus = 'Chargement en cours, veuillez patienter...' // Wait message while db initializes
    this.sqlite.create({ // Creates or opens db
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log(`DB created, named {tccmuseum.db`)
        this.db = db;
        this.createTable(); // Creates table only if non-existent
      })
      .catch(e => console.log(e));
    this.loadingStatus = "Touchez ici pour démarrer" // db is initialized and ready, user can start using the app
     
      
  }

  // Function for creating table "works", only if not already created
  private createTable(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `works` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` TEXT )', {})
    .then(() => console.log('Table created'))
    .catch(e => console.log(e));

  }

  // Function linked to start button, sends to the Tabs/List pages
  private goToTabs() {
    this.navCtrl.push(TabsPage)
  }


}
