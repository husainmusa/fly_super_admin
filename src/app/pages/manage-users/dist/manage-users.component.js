"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageUsersComponent = void 0;
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
var ManageUsersComponent = /** @class */ (function () {
    function ManageUsersComponent(api, route, toastyService, util) {
        var _this = this;
        this.api = api;
        this.route = route;
        this.toastyService = toastyService;
        this.util = util;
        this.myOrders = [];
        this.myaddress = [];
        this.reviews = [];
        this.name = '';
        this.email = '';
        this.photo = '';
        this.route.queryParams.subscribe(function (data) {
            console.log(data);
            if (data && data.id) {
                _this.id = data.id;
                _this.getProfile();
                _this.getMyOrders();
                _this.getAddress();
                _this.getReviews();
            }
        });
    }
    ManageUsersComponent.prototype.ngOnInit = function () {
    };
    ManageUsersComponent.prototype.getProfile = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('users/getById', param).then(function (data) {
            console.log('user info=>', data);
            if (data && data.status === 200 && data.data && data.data.length) {
                var info = data.data[0];
                console.log('info', info);
                _this.email = info.email;
                _this.name = info.first_name + ' ' + info.last_name;
                _this.photo = _this.api.mediaURL + info.cover;
            }
        }, function (error) {
            console.log(error);
            _this.error('Something went wrong');
        });
    };
    ManageUsersComponent.prototype.getReviews = function () {
        var _this = this;
        var param = {
            id: this.id,
            where: 'uid = ' + this.id
        };
        this.api.post('rating/getFromIDs', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200) {
                _this.reviews = data.data;
            }
        }, function (error) {
            console.log(error);
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.error('Something went wrong');
        });
    };
    ManageUsersComponent.prototype.getAddress = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.myaddress = [];
        this.api.post('address/getByUid', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200 && data.data.length) {
                _this.myaddress = data.data;
            }
        }, function (error) {
            console.log(error);
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.error('Something went wrong');
        });
    };
    ManageUsersComponent.prototype.getMyOrders = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('orders/getByUid', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200 && data.data.length > 0) {
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
                        element.date_time = moment(element.date_time).format('dddd, MMMM Do YYYY');
                        if (element && element.address) {
                            element.address = JSON.parse(element.address);
                        }
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
                _this.myOrders = orders;
                console.log('orderss==>?', _this.myOrders);
            }
        }, function (error) {
            console.log(error);
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.error('Something went wrong');
        });
    };
    ManageUsersComponent.prototype.getDate = function (date) {
        return moment(date).format('llll');
    };
    ManageUsersComponent.prototype.getCurrency = function () {
        return this.api.getCurrecySymbol();
    };
    ManageUsersComponent.prototype.error = function (message) {
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
    ManageUsersComponent.prototype.success = function (message) {
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
    ManageUsersComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-users',
            templateUrl: './manage-users.component.html',
            styleUrls: ['./manage-users.component.scss']
        })
    ], ManageUsersComponent);
    return ManageUsersComponent;
}());
exports.ManageUsersComponent = ManageUsersComponent;
