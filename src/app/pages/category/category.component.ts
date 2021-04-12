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
import Swal from 'sweetalert2';
import { ApisService } from 'src/app/services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationExtras } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any;
  dummy = Array(5);
  dummyCates: any[] = [];
  page: number = 1;
  constructor(
    private router: Router,
    public api: ApisService,
    private spinner: NgxSpinnerService,
    private toastyService: ToastyService,
  ) {
    this.getCategory();
  }

  ngOnInit(): void {
  }

  getCategory() {
    this.categories = [];
    this.dummy = Array(10);
    this.api.get('categories').then((datas: any) => {
      console.log(datas);
      this.dummy = [];
      if (datas && datas.data && datas.data.length) {
        this.categories = datas.data;
        this.dummyCates = this.categories;
      }
    }, error => {
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }

  search(str) {
    this.resetChanges();
    console.log('string', str);
    this.categories = this.filterItems(str);
  }

  protected resetChanges = () => {
    this.categories = this.dummyCates;
  }

  setFilteredItems() {
    console.log('clear');
    this.categories = [];
    this.categories = this.dummyCates;
  }

  filterItems(searchTerm) {
    return this.categories.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: this.api.translate('Error'),
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
      title: this.api.translate('Success'),
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

  getClass(item) {
    if (item === '1') {
      return 'btn btn-primary btn-round';
    } else if (item === '0') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  createNew() {
    this.router.navigate(['manage-category']);
  }
  changeStatus(item) {
    const text = item.status === '1' ? 'deactive' : 'active';
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To ') + text + this.api.translate(' this category!'),
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: this.api.translate('Yes'),
      showCancelButton: true,
      cancelButtonText: this.api.translate('Cancle'),
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        const query = item.status === '1' ? '0' : '1';
        const param = {
          id: item.id,
          status: query
        };
        this.spinner.show();
        this.api.post('categories/editList', param).then((datas) => {
          this.spinner.hide();
          this.getCategory();
        }, error => {
          this.spinner.hide();
          this.error(this.api.translate('Something went wrong'));
          console.log(error);
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        });
      }
    });
  }

  view(item) {
    const param: NavigationExtras = {
      queryParams: {
        id: item.id,
        edit: true
      }
    };
    this.router.navigate(['manage-category'], param);
  }


  deleteCategory(item){
    console.log(item);
  //  const text = item.status === '1' ? 'Deactivate' : 'Activate';
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate(`want to permanently delete!`),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.api.translate('Delete')
    }).then((result) => {
      console.log('result=======>',result)
      if (result.value) {
        const param = {
          id: item.id,
        };
        console.log('param', param);
        this.spinner.show();
        this.api.post('categories/deleteList', param).then((datas: any) => {
          console.log(datas);
          this.spinner.hide();
          if (datas && datas.status === 200) {
            this.getCategory();
          } else {
            this.spinner.hide();
            this.error(this.api.translate('Something went wrong'));
          }

        }, error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        });
      }
    });
  }

  /***** manage visiblity in app******/
  hideShow(item) {
    const text = item.showInApp === '1' ? 'hide' : 'show';
    Swal.fire({
      title: this.api.translate('Are you sure?'),
      text: this.api.translate('To ') + text + this.api.translate('this category in user application'),
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: this.api.translate('Yes'),
      showCancelButton: true,
      cancelButtonText: this.api.translate('Cancle'),
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        const query = item.showInApp === '1' ? '0' : '1';
        const param = {
          id: item.id,
          showInApp: query
        };
        this.spinner.show();
        this.api.post('categories/editList', param).then((datas) => {
          this.spinner.hide();
          this.getCategory();
        }, error => {
          this.spinner.hide();
          this.error(this.api.translate('Something went wrong'));
          console.log(error);
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        });
      }
    });
  }
}
