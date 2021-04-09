"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdministratorComponent = void 0;
/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AdministratorComponent = /** @class */ (function () {
    function AdministratorComponent(api, router, spinner, toastyService) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.spinner = spinner;
        this.toastyService = toastyService;
        this.admins = [];
        this.dummy = Array(5);
        this.dummyAdmin = [];
        this.page = 1;
        this.resetChanges = function () {
            _this.admins = _this.dummyAdmin;
        };
        this.getDrivers();
    }
    AdministratorComponent.prototype.ngOnInit = function () {
    };
    AdministratorComponent.prototype.getDrivers = function () {
        var _this = this;
        this.api.get('users/getAdmins').then(function (data) {
            _this.dummy = [];
            if (data && data.status === 200 && data.data.length) {
                _this.admins = data.data;
                _this.dummyAdmin = _this.admins;
            }
        }, function (error) {
            _this.error('Something went wrong');
        })["catch"](function (error) {
            _this.error('Something went wrong');
        });
    };
    AdministratorComponent.prototype.search = function (str) {
        this.resetChanges();
        this.admins = this.filterItems(str);
    };
    AdministratorComponent.prototype.setFilteredItems = function () {
        this.admins = [];
        this.admins = this.dummyAdmin;
    };
    AdministratorComponent.prototype.filterItems = function (searchTerm) {
        return this.admins.filter(function (item) {
            return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    AdministratorComponent.prototype.createNew = function () {
        var navData = {
            queryParams: {
                register: true
            }
        };
        this.router.navigate(['manage-administrantor'], navData);
    };
    AdministratorComponent.prototype.getClass = function (item) {
        if (item === '1') {
            return 'btn btn-primary btn-round';
        }
        else if (item === '0') {
            return 'btn btn-danger btn-round';
        }
        return 'btn btn-warning btn-round';
    };
    AdministratorComponent.prototype.changeStatus = function (item) {
        var _this = this;
        var text = item.status === 'active' ? 'deactive' : 'active';
        sweetalert2_1["default"].fire({
            title: 'Are you sure?',
            text: 'To ' + text + ' this admin!',
            icon: 'question',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            backdrop: false,
            background: 'white'
        }).then(function (data) {
            if (data && data.value) {
                // item.status = text;
                var query = item.status === '1' ? '0' : '1';
                var param = {
                    id: item.id,
                    status: query
                };
                _this.spinner.show();
                _this.api.post('users/edit_profile', param).then(function (datas) {
                    _this.spinner.hide();
                    if (datas && datas.status === 200) {
                        _this.getDrivers();
                    }
                    else {
                        _this.spinner.hide();
                        _this.error('Something went wrong');
                    }
                }, function (error) {
                    _this.spinner.hide();
                    _this.error('Something went wrong');
                })["catch"](function (error) {
                    _this.spinner.hide();
                    _this.error('Something went wrong');
                });
            }
        });
    };
    AdministratorComponent.prototype.openDriver = function (item) {
        var navData = {
            queryParams: {
                id: item.id,
                register: false
            }
        };
        this.router.navigate(['manage-administrantor'], navData);
    };
    AdministratorComponent.prototype.error = function (message) {
        var toastOptions = {
            title: 'Error',
            msg: message,
            showClose: true,
            timeout: 2000,
            theme: 'default',
            onAdd: function (toast) {
            },
            onRemove: function () {
            }
        };
        // Add see all possible types in one shot
        this.toastyService.error(toastOptions);
    };
    AdministratorComponent.prototype.success = function (message) {
        var toastOptions = {
            title: 'Success',
            msg: message,
            showClose: true,
            timeout: 2000,
            theme: 'default',
            onAdd: function (toast) {
            },
            onRemove: function () {
            }
        };
        // Add see all possible types in one shot
        this.toastyService.success(toastOptions);
    };
    AdministratorComponent = __decorate([
        core_1.Component({
            selector: 'app-administrator',
            templateUrl: './administrator.component.html',
            styleUrls: ['./administrator.component.scss']
        })
    ], AdministratorComponent);
    return AdministratorComponent;
}());
exports.AdministratorComponent = AdministratorComponent;
