"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ManageOrdersComponent = void 0;
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
var ManageOrdersComponent = /** @class */ (function () {
    function ManageOrdersComponent(api, route, navCtrl, toastyService, spinner, util) {
        var _this = this;
        this.api = api;
        this.route = route;
        this.navCtrl = navCtrl;
        this.toastyService = toastyService;
        this.spinner = spinner;
        this.util = util;
        this.orderDetail = [];
        this.orders = [];
        this.status = [];
        this.driverInfo = [];
        this.stores = [];
        this.route.queryParams.subscribe(function (data) {
            console.log(data);
            if (data && data.id) {
                _this.id = data.id;
                _this.spinner.show();
                _this.loaded = false;
                _this.getOrder();
            }
            else {
                _this.navCtrl.back();
            }
        });
    }
    ManageOrdersComponent.prototype.ngOnInit = function () {
    };
    ManageOrdersComponent.prototype.back = function () {
        this.navCtrl.back();
    };
    ManageOrdersComponent.prototype.getOrder = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('orders/getById', param).then(function (data) {
            console.log(data);
            _this.spinner.hide();
            _this.loaded = true;
            if (data && data.status === 200 && data.data.length > 0) {
                var info = data.data[0];
                console.log(info);
                if ((function (x) { try {
                    JSON.parse(x);
                    return true;
                }
                catch (e) {
                    return false;
                } })(info.orders)) {
                    if ((function (x) { try {
                        JSON.parse(x);
                        return true;
                    }
                    catch (e) {
                        return false;
                    } })(info.notes)) {
                        _this.orderDetail = JSON.parse(info.notes);
                        var order_1 = JSON.parse(info.orders);
                        console.log('order=====>>', order_1);
                        var finalOrder_1 = [];
                        var ids = __spreadArrays(new Set(order_1.map(function (item) { return item.store_id; })));
                        ids.forEach(function (element) {
                            var param = {
                                id: element,
                                order: []
                            };
                            finalOrder_1.push(param);
                        });
                        ids.forEach(function (element, index) {
                            order_1.forEach(function (cart) {
                                if (cart.variations && cart.variations !== '' && typeof cart.variations === 'string') {
                                    cart.variations = JSON.parse(cart.variations);
                                    console.log(cart['variant']);
                                    if (cart["variant"] === undefined) {
                                        cart['variant'] = 0;
                                    }
                                }
                                if (cart.store_id === element) {
                                    finalOrder_1[index].order.push(cart);
                                }
                            });
                        });
                        console.log('final order', finalOrder_1);
                        _this.orders = finalOrder_1;
                        _this.status = JSON.parse(info.status);
                        console.log('order status--------------------', _this.status);
                        var status = _this.status.filter(function (x) { return x.status === 'created'; });
                        if (status.length === _this.status.length) {
                            _this.canCancle = true;
                        }
                        else {
                            _this.canCancle = false;
                        }
                        var delivered = _this.status.filter(function (x) { return x.status === 'delivered'; });
                        if (delivered.length === _this.status.length) {
                            _this.isDelivered = true;
                        }
                        else {
                            _this.isDelivered = false;
                        }
                        // if()
                        _this.datetime = moment(info.date_time).format('dddd, MMMM Do YYYY');
                        _this.payMethod = info.paid_method === 'cod' ? 'COD' : 'PAID';
                        _this.orderAt = info.order_to;
                        _this.driverId = info.driver_id;
                        var orderParam = {
                            id: _this.id
                        };
                        _this.api.post('acceptedorders/getByOrderId', orderParam).then(function (accepteddata) {
                            console.log("accepted driver data", accepteddata.data[0]);
                            var driverIdArray = _this.driverId.split(',');
                            console.log("all drivers", driverIdArray);
                            if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
                                for (var i = 0; i < driverIdArray.length; i++) {
                                    if (driverIdArray[i] == accepteddata.data[0].driver_id) {
                                        _this.acceptedDriver = driverIdArray[i];
                                    }
                                }
                                console.log("driverid", _this.acceptedDriver);
                                if (_this.acceptedDriver && _this.acceptedDriver !== '') {
                                    var userinfo = {
                                        id: _this.acceptedDriver
                                    };
                                    _this.api.post('drivers/getDriversData', userinfo).then(function (data) {
                                        console.log('driverid>', data);
                                        if (data && data.status === 200 && data.data && data.data.length) {
                                            _this.driverInfo = data.data;
                                            console.log(_this.driverInfo);
                                        }
                                    }, function (error) {
                                        console.log(error);
                                    })["catch"](function (error) {
                                        console.log(error);
                                    });
                                }
                            }
                            else {
                                if (_this.driverId && _this.driverId !== '') {
                                    var userinfo = {
                                        id: _this.driverId
                                    };
                                    _this.api.post('drivers/getDriversData', userinfo).then(function (data) {
                                        console.log('driverid>', data);
                                        if (data && data.status === 200 && data.data && data.data.length) {
                                            _this.driverInfo = data.data;
                                            console.log(_this.driverInfo);
                                        }
                                    }, function (error) {
                                        console.log(error);
                                    })["catch"](function (error) {
                                        console.log(error);
                                    });
                                }
                            }
                        });
                        var stores = {
                            id: info.store_id
                        };
                        _this.api.post('stores/getStoresData', stores).then(function (data) {
                            console.log('store=-============>>', data);
                            console.log('store=-============>>', data);
                            if (data && data.status === 200 && data.data.length) {
                                _this.stores = data.data;
                            }
                            else {
                                // this.util.showToast('No Stores Found', 'danger', 'bottom');
                                _this.error('No Stores Found');
                                _this.back();
                            }
                        }, function (error) {
                            console.log('error', error);
                            _this.error('Something went wrong');
                        })["catch"](function (error) {
                            console.log('error', error);
                            _this.error('Something went wrong');
                        });
                        if (_this.orderAt === 'home') {
                            var address = JSON.parse(info.address);
                            console.log('---address', address);
                            if (address && address.address) {
                                _this.userLat = address.lat;
                                _this.userLng = address.lng;
                                _this.address = address.address;
                            }
                        }
                    }
                }
            }
            else {
                _this.back();
                _this.error('Something went wrong');
            }
        }, function (error) {
            console.log(error);
            _this.spinner.hide();
            _this.loaded = true;
            _this.back();
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.spinner.hide();
            _this.loaded = true;
            _this.back();
            _this.error('Something went wrong');
        });
    };
    ManageOrdersComponent.prototype.error = function (message) {
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
    ManageOrdersComponent.prototype.success = function (message) {
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
    ManageOrdersComponent.prototype.getStoreName = function (id) {
        var item = this.stores.filter(function (x) { return x.uid === id; });
        if (item && item.length) {
            return item[0].name;
        }
        return 'Store';
    };
    ManageOrdersComponent.prototype.getOrderStatus = function (id) {
        var item = this.status.filter(function (x) { return x.id === id; });
        if (item && item.length) {
            return item[0].status;
        }
        return 'created';
    };
    ManageOrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-orders',
            templateUrl: './manage-orders.component.html',
            styleUrls: ['./manage-orders.component.scss']
        })
    ], ManageOrdersComponent);
    return ManageOrdersComponent;
}());
exports.ManageOrdersComponent = ManageOrdersComponent;
