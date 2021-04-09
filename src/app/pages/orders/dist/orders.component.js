"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrdersComponent = void 0;
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
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(api, router, util, toastyService) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.util = util;
        this.toastyService = toastyService;
        this.orders = [];
        this.dummOrders = [];
        this.dummy = Array(5);
        this.page = 1;
        this.resetChanges = function () {
            _this.orders = _this.dummOrders;
        };
        this.getOrders();
    }
    OrdersComponent.prototype.getOrders = function () {
        var _this = this;
        this.api.get('orders').then(function (data) {
            console.log(data);
            _this.dummy = [];
            if (data && data.status === 200 && data.data) {
                // this.orders = data.data;
                var orders = data.data;
                orders.forEach(function (element) {
                    if ((function (x) { try {
                        JSON.parse(x);
                        return true;
                    }
                    catch (e) {
                        return false;
                    } })(element.orders)) {
                        element.orders = JSON.parse(element.orders);
                        element.store_id = element.store_id.split(',');
                    }
                });
                _this.orders = orders;
                _this.dummOrders = _this.orders;
            }
            else {
                _this.error(_this.api.translate('Something went wrong'));
            }
        })["catch"](function (error) {
            console.log(error);
            _this.dummy = [];
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    OrdersComponent.prototype.ngOnInit = function () {
    };
    OrdersComponent.prototype.search = function (string) {
        this.resetChanges();
        console.log('string', string);
        this.orders = this.filterItems(string);
    };
    OrdersComponent.prototype.error = function (message) {
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
    OrdersComponent.prototype.success = function (message) {
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
    OrdersComponent.prototype.setFilteredItems = function () {
        console.log('clear');
        this.orders = [];
        this.orders = this.dummOrders;
    };
    OrdersComponent.prototype.filterItems = function (searchTerm) {
        return this.orders.filter(function (item) {
            return item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    OrdersComponent.prototype.getClass = function (item) {
        if (item === 'created' || item === 'accepted' || item === 'picked') {
            return 'btn btn-primary btn-round';
        }
        else if (item === 'delivered') {
            return 'btn btn-success btn-round';
        }
        else if (item === 'rejected' || item === 'cancel') {
            return 'btn btn-danger btn-round';
        }
        return 'btn btn-warning btn-round';
    };
    OrdersComponent.prototype.openOrder = function (item) {
        console.log(item);
        var navData = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['manage-orders'], navData);
    };
    OrdersComponent.prototype.getDates = function (date) {
        return moment(date).format('llll');
    };
    OrdersComponent.prototype.getCurrency = function () {
        return this.api.getCurrecySymbol();
    };
    OrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-orders',
            templateUrl: './orders.component.html',
            styleUrls: ['./orders.component.scss']
        })
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
