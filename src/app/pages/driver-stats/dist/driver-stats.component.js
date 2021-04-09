"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DriverStatsComponent = void 0;
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
var DriverStatsComponent = /** @class */ (function () {
    function DriverStatsComponent(api, router, spinner, toastyService, util) {
        this.api = api;
        this.router = router;
        this.spinner = spinner;
        this.toastyService = toastyService;
        this.util = util;
        this.storeOrders = [];
        this.commisionAmount = 0;
        this.toPay = 0;
        this.drivers = [];
        this.statType = 'flat';
        this.getDrivers();
    }
    DriverStatsComponent.prototype.getDrivers = function () {
        var _this = this;
        this.spinner.show();
        this.api.get('drivers').then(function (data) {
            _this.spinner.hide();
            console.log(data);
            if (data && data.status === 200 && data.data.length) {
                _this.drivers = data.data.filter(function (x) { return x.status === '1'; });
            }
        }, function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.spinner.hide();
            _this.error('Something went wrong');
        });
    };
    DriverStatsComponent.prototype.ngOnInit = function () {
    };
    DriverStatsComponent.prototype.getName = function () {
        return this.dname + '_' + moment(this.from).format('DDMMYYYY') + '_' + moment(this.to).format('DDMMYYYY');
    };
    DriverStatsComponent.prototype.getDate = function (date) {
        return moment(date).format('LL');
    };
    DriverStatsComponent.prototype.getCurrency = function () {
    };
    DriverStatsComponent.prototype.today = function () {
        return moment().format('LLL');
    };
    DriverStatsComponent.prototype.getCommisions = function (total) {
    };
    DriverStatsComponent.prototype.getStats = function () {
        var _this = this;
        console.log('did', this.did);
        console.log('from', this.from);
        console.log('to', this.to);
        if (this.did && this.from && this.to && this.statValue && this.statType) {
            var driver = this.drivers.filter(function (x) { return x.id === _this.did; });
            console.log('driver------------>>', driver);
            if (driver && driver.length) {
                this.dname = driver[0].first_name + ' ' + driver[0].last_name;
            }
            console.log('ok');
            var param = {
                did: this.did,
                start: this.from + ' 00:00:00',
                end: this.to + ' 23:59:59'
            };
            console.log(param);
            this.spinner.show();
            this.apiCalled = false;
            this.api.post('orders/driverStats', param).then(function (data) {
                _this.apiCalled = true;
                _this.spinner.hide();
                console.log(data);
                if (data && data.status === 200 && data.data.length) {
                    _this.storeOrders = data.data;
                    console.log('total Orders', _this.storeOrders);
                    var orders = data.data;
                    if (_this.statType === 'flat') {
                        var perOrder = parseFloat(_this.statValue);
                        _this.commisionAmount = orders.length * perOrder;
                        console.log('commisionAmount', _this.commisionAmount);
                        _this.toPay = _this.commisionAmount;
                    }
                    else {
                        var total_1 = 0;
                        orders.forEach(function (element) {
                            console.log(element.grand_total);
                            total_1 = total_1 + parseFloat(element.grand_total);
                        });
                        console.log('grand total========>>', total_1);
                        function percentage(num, per) {
                            return (num / 100) * per;
                        }
                        var totalPrice = percentage(total_1, parseFloat(_this.statValue));
                        console.log('commistion=====>>>>>', totalPrice);
                        _this.commisionAmount = totalPrice;
                        _this.toPay = _this.commisionAmount;
                    }
                }
            }, function (error) {
                _this.spinner.hide();
                console.log(error);
                _this.apiCalled = true;
                _this.error('Something went wrong');
            })["catch"](function (error) {
                _this.spinner.hide();
                console.log(error);
                _this.apiCalled = true;
                _this.error('Something went wrong');
            });
        }
        else {
            console.log('not valid');
            this.error('All Fields are required');
            return false;
        }
    };
    DriverStatsComponent.prototype.error = function (message) {
        var toastOptions = {
            title: 'Error',
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
    DriverStatsComponent.prototype.success = function (message) {
        var toastOptions = {
            title: 'Success',
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
    DriverStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-driver-stats',
            templateUrl: './driver-stats.component.html',
            styleUrls: ['./driver-stats.component.css']
        })
    ], DriverStatsComponent);
    return DriverStatsComponent;
}());
exports.DriverStatsComponent = DriverStatsComponent;
