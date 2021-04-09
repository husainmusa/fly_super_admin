"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsComponent = void 0;
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
var moment = require("moment");
var lodash_1 = require("lodash");
var sweetalert2_1 = require("sweetalert2");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(api, router, spinner, toastyService, util) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.spinner = spinner;
        this.toastyService = toastyService;
        this.util = util;
        this.products = [];
        this.dummProducts = [];
        this.dummy = Array(5);
        this.page = 1;
        this.resetChanges = function () {
            _this.products = _this.dummProducts;
        };
        this.getProducts();
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        // this.dummy = Array(5);
        // this.products = [];
        this.api.get('products').then(function (data) {
            console.log('products', data);
            _this.dummy = [];
            if (data && data.status === 200 && data.data && data.data.length > 0) {
                _this.products = data.data;
                _this.dummProducts = data.data;
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
    ProductsComponent.prototype.search = function (string) {
        this.resetChanges();
        console.log('string', string);
        this.products = this.filterItems(string);
    };
    ProductsComponent.prototype.error = function (message) {
        var toastOptions = {
            title: this.api.translate('Error'),
            msg: message,
            showClose: true,
            timeout: 2000,
            theme: 'default',
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function () {
                console.log('Toast  has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.error(toastOptions);
    };
    ProductsComponent.prototype.success = function (message) {
        var toastOptions = {
            title: this.api.translate('Success'),
            msg: message,
            showClose: true,
            timeout: 2000,
            theme: 'default',
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function () {
                console.log('Toast  has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.success(toastOptions);
    };
    ProductsComponent.prototype.setFilteredItems = function () {
        console.log('clear');
        this.products = [];
        this.products = this.dummProducts;
    };
    ProductsComponent.prototype.filterItems = function (searchTerm) {
        return this.products.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    ProductsComponent.prototype.sortByName = function () {
        this.products = lodash_1.orderBy(this.products, ['name'], ['asc']);
    };
    ProductsComponent.prototype.sortByRating = function () {
        this.products = lodash_1.orderBy(this.products, ['rating'], ['desc']);
    };
    ProductsComponent.prototype.sortByHome = function () {
        this.products = lodash_1.orderBy(this.products, ['in_home'], ['desc']);
    };
    ProductsComponent.prototype.getClass = function (item) {
        if (item === '1') {
            return 'btn btn-primary btn-round';
        }
        else if (item === '0') {
            return 'btn btn-danger btn-round';
        }
        return 'btn btn-warning btn-round';
    };
    ProductsComponent.prototype.openOrder = function (item) {
        console.log(item);
        var navData = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['manage-products'], navData);
    };
    ProductsComponent.prototype.getDates = function (date) {
        return moment(date).format('llll');
    };
    ProductsComponent.prototype.getCurrency = function () {
        return this.api.getCurrecySymbol();
    };
    ProductsComponent.prototype.update = function (item, value) {
        var _this = this;
        if (value === 'home') {
            console.log('home', item);
            sweetalert2_1["default"].fire({
                title: this.api.translate('Are you sure?'),
                text: 'To change it',
                icon: 'question',
                showConfirmButton: true,
                confirmButtonText: this.api.translate('Yes'),
                showCancelButton: true,
                cancelButtonText: this.api.translate('Cancle'),
                backdrop: false,
                background: 'white'
            }).then(function (data) {
                if (data && data.value) {
                    console.log('update it');
                    var param = {
                        id: item.id,
                        in_home: item.in_home === '1' ? 0 : 1
                    };
                    _this.spinner.show();
                    _this.api.post('products/editList', param).then(function (datas) {
                        _this.spinner.hide();
                        _this.getProducts();
                    }, function (error) {
                        _this.spinner.hide();
                        _this.error(_this.api.translate('Something went wrong'));
                        console.log(error);
                    })["catch"](function (error) {
                        _this.spinner.hide();
                        console.log(error);
                        _this.error(_this.api.translate('Something went wrong'));
                    });
                }
            });
            // this.sp
        }
        else if (value === 'status') {
            console.log('status', item);
            sweetalert2_1["default"].fire({
                title: this.api.translate('Are you sure?'),
                text: 'To change it',
                icon: 'question',
                showConfirmButton: true,
                confirmButtonText: this.api.translate('Yes'),
                showCancelButton: true,
                cancelButtonText: this.api.translate('Cancle'),
                backdrop: false,
                background: 'white'
            }).then(function (data) {
                if (data && data.value) {
                    console.log('update it');
                    var param = {
                        id: item.id,
                        status: item.status === '1' ? 0 : 1
                    };
                    _this.spinner.show();
                    _this.api.post('products/editList', param).then(function (datas) {
                        _this.spinner.hide();
                        _this.getProducts();
                    }, function (error) {
                        _this.spinner.hide();
                        _this.error(_this.api.translate('Something went wrong'));
                        console.log(error);
                    })["catch"](function (error) {
                        _this.spinner.hide();
                        console.log(error);
                        _this.error(_this.api.translate('Something went wrong'));
                    });
                }
            });
        }
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.css']
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
