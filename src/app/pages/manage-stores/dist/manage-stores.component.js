"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ManageStoresComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var environment_1 = require("src/environments/environment");
var ManageStoresComponent = /** @class */ (function () {
    function ManageStoresComponent(route, api, toastyService, spinner, navCtrl, chMod, util) {
        this.route = route;
        this.api = api;
        this.toastyService = toastyService;
        this.spinner = spinner;
        this.navCtrl = navCtrl;
        this.chMod = chMod;
        this.util = util;
        this.banner_to_upload = '';
        this.address = '';
        this.gender = 1;
        this.name = '';
        this.descritions = '';
        this.haveData = false;
        this.time = '';
        this.email = '';
        this.fname = '';
        this.lname = '';
        this.password = '';
        this.phone = '';
        this.city = '';
        this.totalSales = 0;
        this.totalOrders = 0;
        this.reviews = [];
        this.cities = [];
        this.orders = [];
        this.getCity();
    }
    ManageStoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (data) {
            console.log('data=>', data);
            _this["new"] = data.register === 'true' ? true : false;
            console.log(_this["new"]);
            if (data && data.id && data.register) {
                _this.id = data.id;
                _this.getVenue();
                _this.getReviews();
            }
        });
    };
    ManageStoresComponent.prototype.getOrders = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('orders/getByStore', param).then(function (data) {
            console.log('by store id', data);
            var total = 0;
            if (data && data.status === 200 && data.data.length > 0) {
                data.data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, info, selected, status;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.orders)) return [3 /*break*/, 4];
                                element.orders = JSON.parse(element.orders);
                                _a = element;
                                return [4 /*yield*/, element.orders.filter(function (x) { return x.store_id === _this.id; })];
                            case 1:
                                _a.orders = _b.sent();
                                if (!(function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.status)) return [3 /*break*/, 4];
                                info = JSON.parse(element.status);
                                return [4 /*yield*/, element.orders.forEach(function (calc) {
                                        if (calc.variations && calc.variations !== '' && typeof calc.variations === 'string') {
                                            calc.variations = JSON.parse(calc.variations);
                                            console.log(calc['variant']);
                                            if (calc["variant"] === undefined) {
                                                calc['variant'] = 0;
                                            }
                                        }
                                        if (calc.sell_price === '0.00') {
                                            total = total + parseFloat(calc.original_price);
                                        }
                                        else {
                                            total = total + parseFloat(calc.sell_price);
                                        }
                                    })];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, info.filter(function (x) { return x.id === _this.id; })];
                            case 3:
                                selected = _b.sent();
                                if (selected && selected.length) {
                                    status = selected[0].status;
                                    element['storeStatus'] = status;
                                    this.orders.push(element);
                                }
                                _b.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                setTimeout(function () {
                    function percentage(num, per) {
                        return (num / 100) * per;
                    }
                    console.log(total, _this.commission);
                    var totalPrice = percentage(total, parseFloat(_this.commission));
                    console.log('commistion=====>>>>>', totalPrice.toFixed(2));
                    _this.totalSales = totalPrice.toFixed(2);
                    // this.totalAmount = total;
                    // this.toPay = this.commisionAmount;
                }, 1000);
            }
        }, function (error) {
            console.log(error);
            _this.error('Something went wrong');
        })["catch"](function (error) {
            console.log(error);
            _this.error('Something went wrong');
        });
    };
    ManageStoresComponent.prototype.getReviews = function () {
        var _this = this;
        var param = {
            id: this.id,
            where: 'sid = ' + this.id
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
    ManageStoresComponent.prototype.getVenue = function () {
        var _this = this;
        this.spinner.show();
        var param = {
            id: this.id
        };
        this.api.post('stores/getById', param).then(function (datas) {
            console.log(datas);
            _this.spinner.hide();
            if (datas && datas.status === 200 && datas.data.length) {
                var info = datas.data[0];
                console.log('-------->', info);
                _this.city = info.cid;
                _this.name = info.name;
                _this.address = info.address;
                _this.latitude = info.lat;
                _this.longitude = info.lng;
                _this.fileURL = info.cover;
                _this.coverImage = environment_1.environment.mediaURL + info.cover;
                _this.descritions = info.descriptions;
                _this.openTime = info.open_time;
                _this.closeTime = info.close_time;
                _this.commission = info.commission;
                _this.getOrders();
            }
            else {
                _this.spinner.hide();
                _this.error(_this.api.translate('Something went wrong'));
            }
        }, function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        })["catch"](function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    ManageStoresComponent.prototype.getImage = function (cover) {
        return cover ? cover : 'assets/icon.png';
    };
    ManageStoresComponent.prototype.getDate = function (date) {
        return moment(date).format('llll');
    };
    ManageStoresComponent.prototype.getCity = function () {
        var _this = this;
        this.api.get('cities').then(function (datas) {
            console.log(datas);
            if (datas && datas.data.length) {
                _this.cities = datas.data;
            }
        }, function (error) {
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        })["catch"](function (error) {
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    ManageStoresComponent.prototype.handleAddressChange = function (address) {
        console.log(address);
        this.address = address.formatted_address;
        this.latitude = address.geometry.location.lat();
        this.longitude = address.geometry.location.lng();
        console.log('=>', this.latitude);
    };
    ManageStoresComponent.prototype.updateVenue = function () {
        var _this = this;
        console.log(this.name, this.address, this.descritions, this.time, this.openTime, this.closeTime);
        if (this.name === '' || this.address === '' || this.descritions === '' || this.openTime === '' || this.closeTime === ''
            || !this.openTime || !this.closeTime) {
            this.error(this.api.translate('All Fields are required'));
            return false;
        }
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ address: this.address }, function (results, status) {
            console.log(results, status);
            if (status === 'OK' && results && results.length) {
                _this.latitude = results[0].geometry.location.lat();
                _this.longitude = results[0].geometry.location.lng();
                console.log('----->', _this.latitude, _this.longitude);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
                return false;
            }
        });
        if (!this.coverImage || this.coverImage === '') {
            this.error(this.api.translate('Please add your cover image'));
            return false;
        }
        var param = {
            name: this.name,
            address: this.address,
            descriptions: this.descritions,
            lat: this.latitude,
            lng: this.longitude,
            cover: this.fileURL,
            open_time: this.openTime,
            close_time: this.closeTime,
            cid: this.city,
            id: this.id,
            commission: this.commission
        };
        console.log('param', param);
        this.spinner.show();
        this.api.post('stores/editList', param).then(function (datas) {
            console.log(datas);
            _this.spinner.hide();
            if (datas && datas.status === 200) {
                _this.navCtrl.back();
            }
            else {
                _this.spinner.hide();
                _this.error(_this.api.translate('Something went wrong'));
            }
        }, function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        })["catch"](function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    ManageStoresComponent.prototype.create = function () {
        var _this = this;
        console.log(this.email, this.fname, this.lname, this.phone, this.password, this.name, this.address, this.descritions, this.time);
        if (this.email === '' || this.fname === '' || this.lname === '' || this.phone === '' || this.password === ''
            || this.name === '' || this.address === '' || this.descritions === ''
            || this.city === '' || !this.city || this.openTime === '' || this.closeTime === '' ||
            !this.openTime || !this.closeTime || !this.commission || this.commission === '') {
            this.error(this.api.translate('All Fields are required'));
            return false;
        }
        var emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!(emailfilter.test(this.email))) {
            this.error(this.api.translate('Please enter valid email'));
            return false;
        }
        if (!this.coverImage || this.coverImage === '') {
            this.error(this.api.translate('Please add your cover image'));
            return false;
        }
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ address: this.address }, function (results, status) {
            console.log(results, status);
            if (status === 'OK' && results && results.length) {
                _this.latitude = results[0].geometry.location.lat();
                _this.longitude = results[0].geometry.location.lng();
                console.log('----->', _this.latitude, _this.longitude);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
                return false;
            }
        });
        var userParam = {
            first_name: this.fname,
            last_name: this.lname,
            email: this.email,
            password: this.password,
            gender: this.gender,
            fcm_token: 'NA',
            type: 'store',
            lat: this.latitude,
            lng: this.longitude,
            cover: this.fileURL,
            mobile: this.phone,
            status: 1,
            verified: 1,
            others: 1,
            date: moment().format('YYYY-MM-DD'),
            stripe_key: ''
        };
        console.log('user param', userParam);
        this.spinner.show();
        this.api.post('users/registerUser', userParam).then(function (data) {
            console.log('datatatrat=a=ta=t=at=', data);
            if (data && data.data && data.status === 200) {
                var storeParam = {
                    uid: data.data.id,
                    name: _this.name,
                    mobile: _this.phone,
                    lat: _this.latitude,
                    lng: _this.longitude,
                    verified: 1,
                    address: _this.address,
                    descriptions: _this.descritions,
                    images: '[]',
                    cover: _this.fileURL,
                    status: 1,
                    open_time: _this.openTime,
                    close_time: _this.closeTime,
                    isClosed: 1,
                    certificate_url: '',
                    certificate_type: '',
                    rating: 0,
                    total_rating: 0,
                    cid: _this.city,
                    commission: _this.commission
                };
                console.log('****', storeParam);
                _this.api.post('stores/save', storeParam).then(function (salons) {
                    console.log('salonaasssss--', salons);
                    _this.spinner.hide();
                    _this.navCtrl.back();
                }, function (error) {
                    _this.spinner.hide();
                    console.log(error);
                    _this.error(_this.api.translate('Something went wrong'));
                })["catch"](function (error) {
                    _this.spinner.hide();
                    console.log(error);
                    _this.error(_this.api.translate('Something went wrong'));
                });
            }
            else {
                _this.spinner.hide();
                if (data && data.data && data.data.message) {
                    _this.error(data.data.message);
                    return false;
                }
                _this.error(data.message);
                return false;
            }
        }, function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        })["catch"](function (error) {
            _this.spinner.hide();
            console.log(error);
            _this.error(_this.api.translate('Something went wrong'));
        });
    };
    ManageStoresComponent.prototype.error = function (message) {
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
    ManageStoresComponent.prototype.success = function (message) {
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
    ManageStoresComponent.prototype.preview_banner = function (files) {
        var _this = this;
        console.log('fle', files);
        this.banner_to_upload = [];
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        this.banner_to_upload = files;
        if (this.banner_to_upload) {
            console.log('ok');
            this.spinner.show();
            this.api.uploadFile(this.banner_to_upload).subscribe(function (data) {
                console.log('==>>', data);
                _this.spinner.hide();
                if (data && data.status === 200 && data.data) {
                    _this.fileURL = data.data;
                    _this.coverImage = environment_1.environment.mediaURL + data.data;
                }
            }, function (err) {
                console.log(err);
                _this.spinner.hide();
            });
        }
        else {
            console.log('no');
        }
    };
    ManageStoresComponent.prototype.getCurrency = function () {
        return this.api.getCurrecySymbol();
    };
    __decorate([
        core_1.ViewChild('placesRef', { static: false })
    ], ManageStoresComponent.prototype, "placesRef");
    ManageStoresComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-stores',
            templateUrl: './manage-stores.component.html',
            styleUrls: ['./manage-stores.component.scss']
        })
    ], ManageStoresComponent);
    return ManageStoresComponent;
}());
exports.ManageStoresComponent = ManageStoresComponent;
