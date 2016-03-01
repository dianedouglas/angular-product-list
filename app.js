"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var InventoryApp = (function () {
    function InventoryApp() {
    }
    InventoryApp = __decorate([
        core_1.Component({
            selector: 'inventory-app',
            template: "\n    <div class=\"inventory-app\">\n      Show products here.\n    </div>\n  "
        })
    ], InventoryApp);
    return InventoryApp;
}());
browser_1.bootstrap(InventoryApp);
// model
var Product = (function () {
    function Product(sku, name, imageUrl, department, price) {
        this.sku = sku;
        this.name = name;
        this.imageUrl = imageUrl;
        this.department = department;
        this.price = price;
    }
    return Product;
}());
