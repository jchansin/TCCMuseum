// This will be used as a provider to avoid re-opening the database each time

// Table values need to be added in

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()

export class DatabaseProvider {

    public db: SQLiteObject;
    public loadingStatus: string;

    options: any = {
        name: 'tccmuseum.db',
        location: 'default',
        createFromLocation: 1
    }

    constructor(public sqlite: SQLite) {

    }
    
    // Initializes database
    public initAppDatabase(): void {
        this.sqlite.create(this.options)
            .then((db: SQLiteObject) => {
                console.log(`DB initialized and ready`)
                this.db = db;
            })
            .catch(e => console.log(e));
    }


    // Creating or opening the database
    public startAppDatabase(): void { 
        this.loadingStatus = 'Chargement en cours...' // Wait message while db initializes
        this.sqlite.create(this.options)
            .then((db: SQLiteObject) => {
                console.log(`DB created, named tccmuseum.db`)
                this.db = db;
                this.createTable(); // Creates table only if non-existent
            })
            .catch(e => console.log(e));
        this.loadingStatus = "Touchez ici pour démarrer" // db is initialized and ready, user can start using the app
          
    }

    // Function for creating table "works", only if not already created
    public createTable(): void {
        this.db.executeSql('CREATE TABLE `works` ( `id` INTEGER PRIMARY KEY, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` INTEGER DEFAULT 0 )', {})
            .then(() => {
                console.log("Table 'works' created")
                this.insertTableValues();
            })
            .catch(e => console.log(e));
    }


    // Table values insertion
    public insertTableValues(): void {
        this.db.executeSql('insert into `works` ( id, lastname, firstname, qr_code_number, photo_path) values ( "1", "ALVAREZ", "Jean-pierre", "9213750369", "photo_path")', {} )
            .then(() => {
                console.log('Jipé intégré en DB')
            })
            .catch(e => console.log(e));
    }


    // Table values request testing
    public requestJipeValue(): any {
        this.db.executeSql('select * from `works` where lastname = "ALVAREZ"', {})
    }


     /* // Get number of works already seen in browser
  public getSeenWorks(): void {
    this.seenWorks = this.db.executesql(
      `SELECT COUNT(visit_status)
      FROM works
      WHERE works.visit_status=1`
    )
  }

  // Get total number of works in db
  public getTotalWorks(): void {
    this.totalWorks = this.db.executesql(
      `SELECT COUNT(id)
      FROM works`
    )
  } */


}