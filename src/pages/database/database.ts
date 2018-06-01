// This will be used as a provider to centralize database operations (see app.module.ts)


import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ListPage } from '../list/list';
import { Platform } from 'ionic-angular';



@Injectable()

export class DatabaseProvider {

    public db: SQLiteObject;
    public loadingStatus: string;
    public testString: string;

    options: any = {
        name: 'tccmuseum.db',
        location: 'default',
        createFromLocation: 1
    }

    constructor(platform: Platform, public sqlite: SQLite) {

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
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `works` ( `id` INTEGER PRIMARY KEY, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` INTEGER DEFAULT 0 )', {})
            .then(() => {
                console.log("Table 'works' created")
                this.insertTableValues();
            })
            .catch(e => console.log(e));
    }


    // Insert table values
    public insertTableValues(): void {
        this.db.executeSql("INSERT INTO `works` (id,lastname,firstname,photo_path,qr_code_number,visit_status) VALUES (1,'ALVAREZ','Jean-pierre','alvarez_jeanpierre.jpg',9213750369,0)," +
        "(2,'ARAI','Poeragui','arai_poeragui.jpg',6510403686,0)," +
        "(3,'CHANSIN','Jérôme','chansin_jerome.jpg',7216899933,0)," +
        "(4,'CHEUNG-SEN','Jonas','cheungsen_jonas.jpg',1629568455,0)," +
        "(5,'CUNY','Heimana','cuny_heimana.jpg',9266553664,0)," +
        "(6,'EBB','Nicolas','ebb_nicolas.jpg',1168085824,0)," +
        "(7,'LEHARTEL','Alexandre','lehartel_alexandre.jpg',2791010818,0)," +
        "(8,'LENOIR','Tetuaoro','lenoir_tetuaoro.jpg',4173047359,0)," +
        "(9,'LONGINE','Manaarii','longine_manaarii.jpg',9782420312,0)," +
        "(10,'LY','Joane','ly_joane.jpg',6872232276,0)," +
        "(11,'MONACO','Vaitiare','monaco_vaitiare.jpg',4653519064,0)," +
        "(12,'PAEAHI','Ariipaea','paeahi_ariipaea.jpg',3658034121,0)," +
        "(13,'PAMBRUN','Aito','pambrun_aito.jpg',5175547403,0)," +
        "(14,'PAMBRUN','Hiomai','pambrun_hiomai.jpg',9520532017,0)," +
        "(15,'PEREZ','Rahiti','perez_rahiti.jpg',1228597258,0)," +
        "(16,'PERRY','Matihamu','perry_matihanu.jpg',5480211371,0)," +
        "(17,'ROUSSEL','Christian','roussel_christian.jpg',2462643924,0)," +
        "(18,'TEHUPE','Tinirau','tehupe_tinirau.jpg',5055364030,0)," +
        "(19,'TEMATAHOTOA','Tinirau','tematahotoa_tinirau.jpg',6232447902,0)," +
        "(20,'TOOFA','Teparii','toofa_teparii.jpg',4235066246,0)," +
        "(21, 'MARO', 'Teremu', 'maro_teremu.jpg',1234567890);",{} )
            .then(() => {
                console.log('DB values filled in')
            })
            .catch(e => console.log(e));
    }


}