import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ListPage } from '../list/list';
import { ScanPage } from '../scan/scan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = ScanPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
