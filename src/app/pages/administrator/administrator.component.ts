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
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  admins: any[] = [];
  dummy = Array(5);
  dummyAdmin: any[] = [];
  page: number = 1;
  constructor(
    public api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastyService: ToastyService,
  ) {
    this.getDrivers();
  }

  ngOnInit(): void {
  }

  getDrivers() {
    this.api.get('users/getAdmins').then((data: any) => {
      this.dummy = [];
      if (data && data.status === 200 && data.data.length) {
        this.admins = data.data;
        this.dummyAdmin = this.admins;
      }
    }, error => {
      this.error('Something went wrong');
    }).catch(error => {
      this.error('Something went wrong');
    });
  }

  search(str) {
    this.resetChanges();
    this.admins = this.filterItems(str);
  }


  protected resetChanges = () => {
    this.admins = this.dummyAdmin;
  }

  setFilteredItems() {
    this.admins = [];
    this.admins = this.dummyAdmin;
  }

  filterItems(searchTerm) {
    return this.admins.filter((item) => {
      return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['manage-administrantor'], navData);
  }
  getClass(item) {
    if (item === '1') {
      return 'btn btn-primary btn-round';
    } else if (item === '0') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    Swal.fire({
      title: 'Are you sure?',
      text: 'To ' + text + ' this admin!',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        // item.status = text;
        const query = item.status === '1' ? '0' : '1';
        const param = {
          id: item.id,
          status: query
        };
        this.spinner.show();
        this.api.post('users/edit_profile', param).then((datas: any) => {
          this.spinner.hide();
          if (datas && datas.status === 200) {
            this.getDrivers();
          } else {
            this.spinner.hide();
            this.error('Something went wrong');
          }

        }, error => {
          this.spinner.hide();
          this.error('Something went wrong');
        }).catch(error => {
          this.spinner.hide();
          this.error('Something went wrong');
        });
      }
    });
  }
  openDriver(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        register: false
      }
    };
    this.router.navigate(['manage-administrantor'], navData);
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
      },
      onRemove: () => {
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
      },
      onRemove: () => {
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }
  deleteAdmin(item){
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
        this.api.post('users/deleteUser', param).then((datas: any) => {
          console.log(datas);
          this.spinner.hide();
          if (datas && datas.status === 200) {
            this.getDrivers();
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
}
