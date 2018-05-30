import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { DatabaseProvider } from '../database/database';
import { SQLite } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})

export class ScanPage {

  public scannedData;


  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private dbService: DatabaseProvider, private iab: InAppBrowser) {
    

    this.barcodeScanner.scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedData = barcodeData;
      })
      .catch(err => {
          console.log('Error', err);
      });
  }


  // Barcode Scanner function
  

}
