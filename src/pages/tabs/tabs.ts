import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../database/database';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';


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
  

  options: any = {
    name: 'tccmuseum.db',
    location: 'default',
    createFromLocation: 1
  }


  constructor(platform: Platform, public navCtrl: NavController, private sqlite: SQLite, private barcodeScanner: BarcodeScanner, private dbService: DatabaseProvider, private iab: InAppBrowser, private alertCtrl: AlertController) {
    
  
  }


  // Launch barcode scanner
  private goToScanner(): any {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedData = barcodeData.text;
        this.updateSeenStatus();
      })
      .catch(err => {
          console.log('Error', err);
      });
  }

/*   // Check if scanned QR code matches a code in DB
  private checkCodeValidity(): any {
    this.dbService.db.executeSql('SELECT qr_code_number FROM `works` WHERE works.qr_code_number='+this.scannedData, {})
      .then(checkCode => {
        console.log('Check QR code validity', checkCode.rows.item(0));
        if(checkCode == undefined) {
          this.updateSeenStatus();
        } else {
          this.invalidCodeAlert(); 
        }
      })
      .catch(err => {
          console.log('Error', err);
      });
  } */


  // When QR code is valid, update matching visit_status
  private updateSeenStatus(): any {
    this.dbService.db.executeSql("UPDATE `works` SET visit_status = '1' WHERE works.qr_code_number="+this.scannedData + ";", {})
      .then(() => {
        console.log('Status updated to "seen"');
        this.goToBrowser()
      })
      .catch(err => {
          console.log('Error', err);
      });
  }

  // Launch InApp Browser to matching page
  private goToBrowser(): void {
    this.iab.create(this.fixedURL + this.scannedData)
  }


/*   private invalidCodeAlert(): any {
    this.alertCtrl.create({
      title: "QR code invalide !",
      message: "Ce QR code ne correspond à aucune oeuvre du Tahiti Code Camp Museum.",
      buttons: [
        {
          text: "OK",
          handler: this.goToScanner(),
        },
      ]
    })
  } */



}
