"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
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
var router_1 = require("@angular/router");
var admin_component_1 = require("./layouts/admin/admin.component");
var auth_component_1 = require("./layouts/auth/auth.component");
var auth_guard_1 = require("./guard/auth.guard");
var auth_guard_2 = require("./setupGuard/auth.guard");
var leaved_guard_1 = require("./leaved/leaved.guard");
var routes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'city',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/cities/cities.module'); }).then(function (m) { return m.CitiesModule; }); }
            },
            {
                path: 'users',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/users/users.module'); }).then(function (m) { return m.UsersModule; }); }
            },
            {
                path: 'stores',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/stores/stores.module'); }).then(function (m) { return m.StoresModule; }); }
            },
            {
                path: 'orders',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/orders/orders.module'); }).then(function (m) { return m.OrdersModule; }); }
            },
            {
                path: 'drivers',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/drivers/drivers.module'); }).then(function (m) { return m.DriversModule; }); }
            },
            {
                path: 'offers',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/offers/offers.module'); }).then(function (m) { return m.OffersModule; }); }
            },
            {
                path: 'banners',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/banners/banners.module'); }).then(function (m) { return m.BannersModule; }); }
            },
            {
                path: 'contacts',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contacts/contacts.module'); }).then(function (m) { return m.ContactsModule; }); },
                canDeactivate: [leaved_guard_1.LeaveGuard]
            },
            {
                path: 'notifications',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/notifications/notifications.module'); }).then(function (m) { return m.NotificationsModule; }); }
            },
            {
                path: 'stats',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/stats/stats.module'); }).then(function (m) { return m.StatsModule; }); }
            },
            {
                path: 'manage-users',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-users/manage-users.module'); }).then(function (m) { return m.ManageUsersModule; }); }
            },
            {
                path: 'manage-stores',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-stores/manage-stores.module'); }).then(function (m) { return m.ManageStoresModule; }); }
            },
            {
                path: 'manage-orders',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-orders/manage-orders.module'); }).then(function (m) { return m.ManageOrdersModule; }); }
            },
            {
                path: 'manage-drivers',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-drivers/manage-drivers.module'); }).then(function (m) { return m.ManageDriversModule; }); }
            },
            {
                path: 'manage-offers',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-offers/manage-offers.module'); }).then(function (m) { return m.ManageOffersModule; }); }
            },
            {
                path: 'manage-banners',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-banners/manage-banners.module'); }).then(function (m) { return m.ManageBannersModule; }); }
            },
            {
                path: 'manage-city',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-city/manage-city.module'); }).then(function (m) { return m.ManageCityModule; }); }
            },
            {
                path: 'manage-contacts',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-contacts/manage-contacts.module'); }).then(function (m) { return m.ManageContactsModule; }); }
            },
            {
                path: 'category',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/category/category.module'); }).then(function (m) { return m.CategoryModule; }); }
            },
            {
                path: 'sub-category',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/sub-category/sub-category.module'); }).then(function (m) { return m.SubCategoryModule; }); }
            },
            {
                path: 'manage-category',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-category/manage-category.module'); }).then(function (m) { return m.ManageCategoryModule; }); }
            },
            {
                path: 'manage-sub-category',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-sub-category/manage-sub-category.module'); }).then(function (m) { return m.ManageSubCategoryModule; }); }
            },
            {
                path: 'languages',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/languages/languages.module'); }).then(function (m) { return m.LanguagesModule; }); }
            },
            {
                path: 'manage-languages',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-languages/manage-languages.module'); }).then(function (m) { return m.ManageLanguagesModule; }); }
            },
            {
                path: 'manage-app',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-app/manage-app.module'); }).then(function (m) { return m.ManageAppModule; }); }
            },
            {
                path: 'send-mail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/send-email/send-email.module'); }).then(function (m) { return m.SendEmailModule; }); }
            },
            {
                path: 'app-settings',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/app-settings/app-settings.module'); }).then(function (m) { return m.AppSettingsModule; }); }
            },
            {
                path: 'general',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/app-web/app-web.module'); }).then(function (m) { return m.AppWebModule; }); }
            },
            {
                path: 'products',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/products/products.module'); }).then(function (m) { return m.ProductsModule; }); }
            },
            {
                path: 'manage-products',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-products/manage-products.module'); }).then(function (m) { return m.ManageProductsModule; }); }
            },
            {
                path: 'payment',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/payments/payments.module'); }).then(function (m) { return m.PaymentsModule; }); }
            },
            {
                path: 'manage-payment',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-payment/manage-payment.module'); }).then(function (m) { return m.ManagePaymentModule; }); }
            },
            {
                path: 'app-pages',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/app-pages/app-pages.module'); }).then(function (m) { return m.AppPagesModule; }); }
            },
            {
                path: 'manage-app-pages',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-app-pages/manage-app-pages.module'); }).then(function (m) { return m.ManageAppPagesModule; }); }
            },
            {
                path: 'driver-stats',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/driver-stats/driver-stats.module'); }).then(function (m) { return m.DriverStatsModule; }); }
            },
            {
                path: 'emails',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/emails/emails.module'); }).then(function (m) { return m.EmailsModule; }); }
            },
            {
                path: 'emails-details',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/emails-details/emails-details.module'); }).then(function (m) { return m.EmailsDetailsModule; }); }
            },
            {
                path: 'manage-popup',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-popup/manage-popup.module'); }).then(function (m) { return m.ManagePopupModule; }); }
            },
            {
                path: 'administrantor',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/administrator/administrator.module'); }).then(function (m) { return m.AdministratorModule; }); }
            },
            {
                path: 'manage-administrantor',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/manage-admin/manage-admin.module'); }).then(function (m) { return m.ManageAdminModule; }); }
            }
            //
        ]
    },
    {
        path: '',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: 'login',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/login/login.module'); }).then(function (m) { return m.LoginModule; }); },
                canActivate: [auth_guard_2.SetupAuthGuard]
            },
            // , {
            //   path: 'report',
            //   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
            // },
            {
                path: 'setup',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/setup/setup.module'); }).then(function (m) { return m.SetupModule; }); }
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: false })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
