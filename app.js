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
// top level app component
// this is the component decorator.
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
/* The ProductsList component has two jobs:
display all ProductRow components,
and keep track of which one is selected */
//inputs are data received from the parent component and stored as instance variables in the child component.
/*
Say we want to pass data stored in a parent component under the instance variable name 'myName' to a child component called my-component

in the parent's template use the child including its inputs, just like a constructor:
<my-component [shortName]="myName"></my-component>
and also in the parent be sure to include it under directives (the controller class)
directives: [ProductsList]

Then in the child component:
@Component({
  selector: 'my-component',
  inputs: ['name: shortName']
})
class MyComponent {
  name: string;
}
this takes the value of the parent instance variable 'myName' and puts it into the child my-component
under the input 'shortName', and the child component decorator takes that and puts it into an instance variable on the child controller class to match the attribute key 'name'
the key in the inputs array shows how the data will be stored in the child controller
the value is what variable the parent is putting the data into.
these can be the same if you want a shortcut:

<my-component [name]="myName"></my-component>
inputs: ['name']
class MyComponent {
  name: string;
}
*/
var ProductRow = (function () {
    function ProductRow() {
    }
    ProductRow = __decorate([
        core_1.Component({
            selector: 'product-row',
            template: "\n    <p>yo</p>\n  "
        })
    ], ProductRow);
    return ProductRow;
}());
var ProductsList = (function () {
    function ProductsList() {
    }
    ProductsList = __decorate([
        core_1.Component({
            selector: 'products-list',
            directives: [ProductRow],
            inputs: ['productList'],
            template: "\n  <h3 *ngFor=\"#currentProduct of productList\">{{ currentProduct.name }}</h3>\n  "
        })
    ], ProductsList);
    return ProductsList;
}());
//Top level component goes last. Needs to know about its children.
var InventoryApp = (function () {
    function InventoryApp() {
        // when we make a new instance of the component, this constructor is called.
        // setup tasks go here. To test it out, we're creating a product and storing it in the instance variable.
        this.products = [
            new Product('MYSHOES', 'Black Runners', '/resources/images/products/shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 39.99),
            new Product('SWEETJACKET', 'Green Jacket', '/resources/images/products/jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 59.99),
            new Product('NEATHAT', 'Purple hat', '/resources/images/products/hat.jpg', ['Men', 'Accessories', 'Hats'], 79.99),
        ];
    }
    InventoryApp = __decorate([
        core_1.Component({
            selector: 'inventory-app',
            directives: [ProductsList],
            template: "\n    <div class=\"inventory-app\">\n      <products-list [productList]=\"products\"></products-list>\n    </div>\n  "
        })
    ], InventoryApp);
    return InventoryApp;
}());
browser_1.bootstrap(InventoryApp);
