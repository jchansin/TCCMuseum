import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../database/database';

import { InfoPage } from '../info/info';
import { ListPage } from '../list/list';
import { ScanPage } from '../scan/scan';

//Native components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Component({
  templateUrl: 'tabs.html'
})



export class TabsPage {

  tab1Root = ListPage;
  tab2Root = ScanPage;
  tab3Root = InfoPage;


  private fixedURL: string = "http://tcc.1click.pf/museum/index.php?mat=5OSWU8YOTC&oeuvre=";
  private scannedData: any;
  


  constructor(public navCtrl: NavController, private sqlite: SQLite, private barcodeScanner: BarcodeScanner, private dbService: DatabaseProvider, private iab: InAppBrowser) {
  
    this.goToScanner();

  }


  
  


  private goToScanner(): void {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedData = barcodeData.text;
        this.goToBrowser();
      })
      .catch(err => {
          console.log('Error', err);
      });
  }


  private goToBrowser(): void {
    this.iab.create(this.fixedURL + this.scannedData)
  }




}
