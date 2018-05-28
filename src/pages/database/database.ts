// This will be exported in pages where needed to avoid re-opening the database each time

// Table values need to be added in

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()

export class Database {

    private db: SQLiteObject;
    private loadingStatus: string;

    options: any = {
        name: 'tccmuseum.db',
        location: 'default',
        createFromLocation: 1
    }

    constructor(private sqlite: SQLite) {

        this.startAppDatabase();

    }
    
    private startAppDatabase(): void { 
        this.loadingStatus = 'Chargement en cours, veuillez patienter...' // Wait message while db initializes
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
    private createTable(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `works` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `lastname` TEXT, `firstname` TEXT, `photo_path` TEXT, `qr_code_number` INTEGER, `visit_status` TEXT )', {})
        .then(() => console.log('Table created'))
        .catch(e => console.log(e));
    }



}