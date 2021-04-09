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
exports.ContactsComponent = void 0;
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
var core_2 = require("@angular/core");
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(api, util) {
        var _this = this;
        this.api = api;
        this.util = util;
        this.users = [];
        this.dummy = [];
        this.messages = [];
        this.resetChanges = function () {
            _this.users = _this.dummy;
        };
        var param = {
            id: 0
        };
        this.dummy = Array(10);
        this.users = [];
        this.api.post('chats/getByGroup', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200) {
                var info_1 = [];
                var info2_1 = [];
                var info3_1 = [];
                data.data.forEach(function (element) {
                    if (element.message_type === 'users') {
                        info2_1.push(element.from_id);
                        info2_1.push(element.room_id);
                    }
                    else if (element.message_type === 'store') {
                        info_1.push(element.from_id);
                        info_1.push(element.room_id);
                    }
                    else if (element.message_type === 'drivers') {
                        info3_1.push(element.from_id);
                        info3_1.push(element.room_id);
                    }
                });
                var uniq = __spreadArrays(new Set(info_1));
                console.log('uniq->>', uniq);
                var uid = {
                    id: uniq.join()
                };
                _this.api.post('stores/getChatsNames', uid).then(function (uids) {
                    _this.dummy = [];
                    console.log(uids);
                    if (uids && uids.status === 200) {
                        // this.users = uids.data;
                        uids.data.forEach(function (element) {
                            console.log(element);
                            var dats = {
                                id: element.uid,
                                name: element.name,
                                cover: element.cover,
                                type: 'store'
                            };
                            _this.users.push(dats);
                        });
                    }
                }, function (error) {
                    console.log(error);
                    _this.users = [];
                    _this.dummy = [];
                });
                var uniq2 = __spreadArrays(new Set(info2_1));
                console.log('uniq->>', uniq2);
                var uid2 = {
                    id: uniq2.join()
                };
                _this.api.post('users/getChatsNames', uid2).then(function (uids) {
                    _this.dummy = [];
                    console.log(uids);
                    if (uids && uids.status === 200) {
                        // this.users = uids.data;
                        uids.data.forEach(function (element) {
                            console.log(element);
                            var dats = {
                                id: element.id,
                                name: element.first_name + ' ' + element.last_name,
                                cover: element.cover,
                                type: 'users'
                            };
                            _this.users.push(dats);
                        });
                        console.log('all users-->>', _this.users);
                    }
                }, function (error) {
                    console.log(error);
                    _this.users = [];
                    _this.dummy = [];
                });
                var uniq3 = __spreadArrays(new Set(info3_1));
                console.log('uniq->>', uniq2);
                var uid3 = {
                    id: uniq3.join()
                };
                _this.api.post('drivers/getChatsNames', uid3).then(function (uids) {
                    _this.dummy = [];
                    console.log(uids);
                    if (uids && uids.status === 200) {
                        // this.users = uids.data;
                        uids.data.forEach(function (element) {
                            console.log(element);
                            var dats = {
                                id: element.id,
                                name: element.first_name + ' ' + element.last_name,
                                cover: element.cover,
                                type: 'drivers'
                            };
                            _this.users.push(dats);
                        });
                        console.log('all users-->>', _this.users);
                    }
                }, function (error) {
                    console.log(error);
                    _this.users = [];
                    _this.dummy = [];
                });
            }
            else {
                _this.dummy = [];
            }
        }, function (error) {
            console.log(error);
        })["catch"](function (error) {
            console.log(error);
        });
        this.interval = setInterval(function () {
            console.log('calling in interval');
            _this.getMessages();
            _this.getMessages2();
        }, 12000);
        this.util.successEject().subscribe(function (data) {
            console.log('yes eject it');
            clearInterval(_this.interval);
        });
    }
    ContactsComponent.prototype.canDeactivate = function () {
        console.log('ok');
    };
    ;
    ContactsComponent.prototype.getMessages = function () {
        var _this = this;
        var param = {
            id: 0 + '_' + this.id,
            oid: this.id
        };
        this.api.post('chats/getById', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200) {
                _this.messages = data.data;
                _this.scrollToBottom();
            }
        }, function (error) {
            console.log(error);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    ContactsComponent.prototype.getMessages2 = function () {
        var _this = this;
        var param = {
            id: this.id + '_' + 0,
            oid: this.id
        };
        this.api.post('chats/getById', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200) {
                _this.messages = data.data;
                _this.scrollToBottom();
            }
        }, function (error) {
            console.log(error);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    ContactsComponent.prototype.getMessages3 = function () {
        var _this = this;
        console.log('message from drivers');
        var param = {
            id: this.id + '_' + 0,
            oid: this.id
        };
        this.api.post('chats/getById', param).then(function (data) {
            console.log(data);
            if (data && data.status === 200) {
                _this.messages = data.data;
                _this.scrollToBottom();
            }
        }, function (error) {
            console.log(error);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    ContactsComponent.prototype.ngOnInit = function () {
    };
    ContactsComponent.prototype.search = function (str) {
        this.resetChanges();
        console.log('string', str);
        this.users = this.filterItems(str);
    };
    ContactsComponent.prototype.send = function () {
        var _this = this;
        console.log('this.mess', this.message);
        if (this.message && this.id) {
            var text = this.message;
            this.message = '';
            var fromMessage = '';
            if (this.type === 'users') {
                fromMessage = 0 + '_' + this.id;
            }
            else if (this.type === 'store') {
                fromMessage = this.id + '_' + 0;
            }
            else if (this.type === 'drivers') {
                fromMessage = 0 + '_' + this.id;
            }
            console.log('send');
            var param = {
                room_id: this.id,
                uid: fromMessage,
                from_id: 0,
                message: text,
                message_type: 'admin',
                status: 1,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            this.scrollToBottom();
            this.api.post('chats/save', param).then(function (data) {
                console.log(data);
                if (data && data.status === 200) {
                    if (_this.type === 'users') {
                        _this.getMessages();
                    }
                    else {
                        _this.getMessages2();
                    }
                }
                else {
                }
            }, function (error) {
                console.log(error);
            })["catch"](function (error) {
                console.log(error);
            });
        }
    };
    ContactsComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    };
    ContactsComponent.prototype.setFilteredItems = function () {
        console.log('clear');
        this.users = [];
        this.users = this.dummy;
    };
    ContactsComponent.prototype.filterItems = function (searchTerm) {
        return this.users.filter(function (item) {
            if (item.type === 'venue') {
                return item.fname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            }
            else {
                return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            }
        });
    };
    ContactsComponent.prototype.chatUser = function (item) {
        console.log(item);
        this.type = item.type;
        this.name = item.name;
        this.avtar = item.cover;
        this.selectedId = item.id;
        this.id = item.id;
        this.messages = [];
        if (this.type === 'users') {
            this.getMessages();
        }
        else if (this.type === 'store') {
            this.getMessages2();
        }
        else if (this.type === 'drivers') {
            this.getMessages3();
        }
    };
    __decorate([
        core_1.ViewChild('scrollMe', { static: false })
    ], ContactsComponent.prototype, "myScrollContainer");
    __decorate([
        core_1.ViewChildren('messages')
    ], ContactsComponent.prototype, "messagesList");
    __decorate([
        core_2.HostListener('window:beforeunload')
    ], ContactsComponent.prototype, "canDeactivate");
    ContactsComponent = __decorate([
        core_1.Component({
            selector: 'app-contacts',
            templateUrl: './contacts.component.html',
            styleUrls: ['./contacts.component.scss']
        })
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
