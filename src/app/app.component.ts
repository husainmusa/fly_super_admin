/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilService } from './services/util.service';
import { ApisService } from './services/apis.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private router: Router,
    public util: UtilService,
    public api: ApisService    
  ) {
    this.api.getCurrency('users/getDefaultSettings').subscribe((data: any) => {
      console.log('----------------- app setting', data);
      if (data && data.status === 200 && data.data) {
        const manage = data.data.manage;
        const language = data.data.lang;
        const popup = data.data.popup;
        const settings = data.data.settings;
        if (settings && settings.length > 0) {
          const info = settings[0];
          this.util.currecny = info.currencySymbol;
        } else {
          this.util.currecny = '$';
        }
      }
    }, error => {
      console.log('default settings', error);
    });

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
