import { Component } from '@angular/core';

import { InfoPage } from '../info/info';
import { ListPage } from '../list/list';
import { ScanPage } from '../scan/scan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = ScanPage;
  tab3Root = InfoPage;

  constructor() {

  }
}
