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
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { ApisService } from 'src/app/services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  title: any;
  descriptions: any;
  banner_to_upload: any;
  coverImage:any;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }
  send() {
    if (!this.title || !this.descriptions) {
      this.error(this.api.translate('All Fields are required'));
      return false;
    }
    this.api.sendNotification(this.descriptions, this.title ,this.coverImage).subscribe((data) => {
      console.log(data);
      this.title = '';
      this.descriptions = '';
      this.success(this.api.translate('Notications sent'));
    }, error => {
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });

  }
  error(message) {
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: () => {
        console.log('Toast  has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: 'Success',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: () => {
        console.log('Toast  has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }


/*** image upload  **/

preview_banner(files) {

  console.log('fle', files);
  this.banner_to_upload = [];
  if (files.length === 0) {
    return;
  }
  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  this.banner_to_upload = files;
  if (this.banner_to_upload) {
    console.log('ok');
    this.spinner.show();
    this.api.uploadFile(this.banner_to_upload).subscribe((data: any) => {
      console.log('==>>', data);
      this.spinner.hide();
      if (data && data.status === 200 && data.data) {
        this.coverImage = data.data;
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  } else {
    console.log('no');
  }
}

}
