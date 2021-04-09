"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApisService = exports.AuthInfo = void 0;
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
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var sweetalert2_1 = require("sweetalert2");
var environment_1 = require("src/environments/environment");
var AuthInfo = /** @class */ (function () {
    function AuthInfo($uid) {
        this.$uid = $uid;
    }
    AuthInfo.prototype.isLoggedIn = function () {
        return !!this.$uid;
    };
    return AuthInfo;
}());
exports.AuthInfo = AuthInfo;
var ApisService = /** @class */ (function () {
    function ApisService(http) {
        this.http = http;
        this.authInfo$ = new rxjs_1.BehaviorSubject(ApisService_1.UNKNOWN_USER);
        this.baseUrl = '';
        this.mediaURL = '';
        this.baseUrl = environment_1.environment.baseURL;
        this.mediaURL = environment_1.environment.mediaURL;
    }
    ApisService_1 = ApisService;
    ApisService.prototype.translate = function (str) {
        return str;
    };
    ApisService.prototype.alerts = function (title, message, type) {
        sweetalert2_1["default"].fire(title, message, type);
    };
    ApisService.prototype.uploadFile = function (files) {
        var formData = new FormData();
        Array.from(files).forEach(function (f) { return formData.append('userfile', f); });
        return this.http.post(this.baseUrl + 'users/upload_image', formData);
    };
    ApisService.prototype.getCurrencyCode = function () {
        return environment_1.environment.general.code;
    };
    ApisService.prototype.getCurrecySymbol = function () {
        return environment_1.environment.general.symbol;
    };
    ApisService.prototype.sendNotification = function (msg, title) {
        var body = {
            app_id: environment_1.environment.onesignal.appId,
            included_segments: ['Active Users', 'Inactive Users"'],
            headings: { en: title },
            contents: { en: msg },
            data: { task: msg }
        };
        var header = {
            headers: new http_1.HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', "Basic " + environment_1.environment.onesignal.restKey)
        };
        return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
    };
    ApisService.prototype.JSON_to_URLEncoded = function (element, key, list) {
        var new_list = list || [];
        if (typeof element === 'object') {
            for (var idx in element) {
                this.JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, new_list);
            }
        }
        else {
            new_list.push(key + '=' + encodeURIComponent(element));
        }
        return new_list.join('&');
    };
    ApisService.prototype.post = function (url, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = {
                headers: new http_1.HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Basic', "" + environment_1.environment.authToken)
            };
            var param = _this.JSON_to_URLEncoded(body);
            console.log(param);
            _this.http.post(_this.baseUrl + url, param, header).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                resolve(error);
            });
            // return this.http.post(this.baseUrl + url, param, header);
        });
    };
    ApisService.prototype.get = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = {
                headers: new http_1.HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Basic', "" + environment_1.environment.authToken)
                // .set('responseType', 'blob')
            };
            _this.http.get(_this.baseUrl + url, header).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                resolve(error);
            });
        });
    };
    ApisService.prototype.getCurrency = function (url) {
        var header = {
            headers: new http_1.HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Basic', "" + environment_1.environment.authToken)
        };
        return this.http.get(this.baseUrl + url, header);
    };
    ApisService.prototype.externalGet = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = {
                headers: new http_1.HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Basic', "" + environment_1.environment.authToken)
            };
            _this.http.get(url, header).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                resolve(error);
            });
        });
    };
    var ApisService_1;
    ApisService.UNKNOWN_USER = new AuthInfo(null);
    ApisService = ApisService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApisService);
    return ApisService;
}());
exports.ApisService = ApisService;
