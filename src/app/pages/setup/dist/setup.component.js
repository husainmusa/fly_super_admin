"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SetupComponent = void 0;
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
var http_1 = require("@angular/common/http");
var moment = require("moment");
var SetupComponent = /** @class */ (function () {
    function SetupComponent(api, toastyService, spinner, router, http, title) {
        var _this = this;
        this.api = api;
        this.toastyService = toastyService;
        this.spinner = spinner;
        this.router = router;
        this.http = http;
        this.title = title;
        this.email = '';
        this.password = '';
        this.first_name = '';
        this.last_name = '';
        this.mobile = '';
        this.getIP().then(function (data) {
            console.log(data);
            _this.ip = data;
        })["catch"](function (error) {
            console.log(error);
        });
        this.appName = this.title.getTitle();
    }
    SetupComponent.prototype.ngOnInit = function () {
    };
    SetupComponent.prototype.login = function () {
        var _this = this;
        if (!this.first_name || !this.last_name || this.first_name === '' || this.last_name === ''
            || !this.email || this.email === '' || !this.password || this.password === '' || !this.mobile || this.mobile === '') {
            this.error('All Fields are required');
            return false;
        }
        var emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailfilter.test(this.email)) {
            this.error('Please enter valid email');
            return false;
        }
        console.log('OK');
        var param = {
            first_name: this.first_name,
            last_name: this.last_name,
            gender: 1,
            email: this.email,
            password: this.password,
            type: 'admin',
            status: 1,
            lat: '0',
            lng: '0',
            cover: 'NA',
            mobile: this.mobile,
            verified: 1,
            fcm_token: 'NA',
            others: '1',
            date: moment().format('YYYY-MM-DD'),
            stripe_key: ''
        };
        this.spinner.show();
        this.api.post('users/registerUser', param).then(function (data) {
            console.log('datas', data);
            _this.spinner.hide();
            if (data && data.status === 200) {
                localStorage.setItem('uid', 'admin');
                localStorage.setItem('type', 'admin');
                _this.postLicense();
                _this.router.navigate(['']);
            }
            else if (data && data.status === 500) {
                if (data.data && data.data.message) {
                    _this.error(data.data.message);
                }
                else {
                    _this.error(_this.api.translate('Something went wrong'));
                }
            }
            else {
                _this.error(_this.api.translate('Something went wrong'));
            }
        })["catch"](function (error) {
            _this.spinner.hide();
            console.log('errror', error);
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    SetupComponent.prototype.error = function (message) {
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
    SetupComponent.prototype.success = function (message) {
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
    SetupComponent.prototype.getIP = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('https://api.ipify.org/?format=json').subscribe(function (res) {
                resolve(res.ip);
            }, function (error) {
                reject(error);
            });
        });
    };
    SetupComponent.prototype.postLicense = function () {
        var param = {
            name: 'groceryee',
            title: this.appName,
            ip: this.ip
        };
        var params = this.api.JSON_to_URLEncoded(param);
        console.log(params);
        var header = {
            headers: new http_1.HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
        };
        this.http.post('https://initappz.com/license/index.php/basics/save', params, header).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    SetupComponent = __decorate([
        core_1.Component({
            selector: 'app-setup',
            templateUrl: './setup.component.html',
            styleUrls: ['./setup.component.scss']
        })
    ], SetupComponent);
    return SetupComponent;
}());
exports.SetupComponent = SetupComponent;
