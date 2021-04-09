"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UtilService = void 0;
/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UtilService = /** @class */ (function () {
    function UtilService() {
        this.ejectMessages = new rxjs_1.Subject();
    }
    UtilService.prototype.setReport = function (data) {
        this.report = data;
    };
    UtilService.prototype.ejectMsg = function () {
        this.ejectMessages.next();
    };
    UtilService.prototype.successEject = function () {
        return this.ejectMessages;
    };
    UtilService.prototype.getReport = function () {
        return this.report;
    };
    UtilService.prototype.getCurrencyCode = function () {
        return environment_1.environment.general.code;
    };
    UtilService.prototype.getCurrecySymbol = function () {
        return environment_1.environment.general.symbol;
    };
    UtilService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
