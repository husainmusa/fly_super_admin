"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
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
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(api, router, util) {
        this.api = api;
        this.router = router;
        this.util = util;
        this.dummy = Array(5);
        this.page = 1;
        this.orders = [];
        this.stores = [];
        this.users = [];
        this.allOrders = [];
        this.getData();
    }
    DashboardComponent.prototype.getData = function () {
        var _this = this;
        this.api.get('users/adminHome').then(function (data) {
            console.log(data);
            _this.dummy = [];
            if (data && data.status === 200) {
                var orders = data.data.orders;
                _this.stores = data.data.stores;
                _this.users = data.data.users;
                _this.allOrders = data.data.allOrders;
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
                        element.orders.forEach(function (order) {
                            console.log(element.id, '=>', order.variations);
                            if (order.variations && order.variations !== '' && typeof order.variations === 'string') {
                                console.log('strings', element.id);
                                order.variations = JSON.parse(order.variations);
                                console.log(order['variant']);
                                if (order["variant"] === undefined) {
                                    order['variant'] = 0;
                                }
                            }
                        });
                    }
                });
                _this.orders = orders;
                console.log("orders", _this.orders);
            }
        }, function (error) {
            console.log(error);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.getCurrency = function () {
        // return this.api.getCurrencySymbol();
    };
    DashboardComponent.prototype.getClass = function (item) {
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
    DashboardComponent.prototype.getDates = function (date) {
        return moment(date).format('llll');
    };
    DashboardComponent.prototype.openOrder = function (item) {
        console.log(item);
        var navData = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['manage-orders'], navData);
    };
    DashboardComponent.prototype.openIt = function (item) {
        this.router.navigate([item]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
