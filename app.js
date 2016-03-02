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
// dont forget to import EventEmitter and to declare your components from child up to parent.
var core_2 = require('angular2/core');
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
var ProductImage = (function () {
    function ProductImage() {
    }
    ProductImage = __decorate([
        core_1.Component({
            selector: "product-image",
            inputs: ['product'],
            template: "\n    <img [src]=\"product.imageUrl\">\n  "
        })
    ], ProductImage);
    return ProductImage;
}());
var PriceDisplay = (function () {
    function PriceDisplay() {
    }
    PriceDisplay = __decorate([
        core_1.Component({
            selector: "price-display",
            inputs: ['price'],
            template: "\n    <h4>${{ price }}</h4>\n  "
        })
    ], PriceDisplay);
    return PriceDisplay;
}());
// when we use ngFor here, it loops through the tag it's on as well as any of its child dom elements.
var ProductDepartment = (function () {
    function ProductDepartment() {
    }
    ProductDepartment.prototype.separator = function (collection, index, separatorCharacter) {
        if (separatorCharacter === void 0) { separatorCharacter = "> "; }
        if (index < collection.length - 1) {
            return separatorCharacter;
        }
        else {
            return "";
        }
    };
    ProductDepartment = __decorate([
        core_1.Component({
            selector: "product-department",
            inputs: ['product'],
            template: "\n    <span *ngFor=\"#name of product.department; #i=index\">\n      <a href=\"#\">{{ name }}</a>\n      <span>{{ separator(product.department, i) }}</span>\n    </span>\n  "
        })
    ], ProductDepartment);
    return ProductDepartment;
}());
var ProductRow = (function () {
    function ProductRow() {
    }
    ProductRow = __decorate([
        core_1.Component({
            selector: 'product-row',
            inputs: ['product'],
            directives: [ProductImage, ProductDepartment, PriceDisplay],
            template: "\n    <h1>{{ product.name }}</h1>\n    <product-image [product]=\"product\"></product-image>\n    <p>Product SKU: {{ product.sku }}</p>\n    <product-department [product]=\"product\"></product-department>\n    <price-display [price]=\"product.price\"></price-display>\n  "
        })
    ], ProductRow);
    return ProductRow;
}());
var ProductsList = (function () {
    function ProductsList() {
        this.onProductSelected = new core_2.EventEmitter();
    }
    ProductsList.prototype.clicked = function (clickedProduct) {
        this.currentProduct = clickedProduct;
        this.onProductSelected.emit(clickedProduct);
    };
    ProductsList.prototype.isSelected = function (product) {
        //this method returns true/false to either add the selected class or not to the current row.
        if (!product || !this.currentProduct) {
            return false;
        }
        else {
            return product.sku === this.currentProduct.sku;
        }
    };
    ProductsList = __decorate([
        core_1.Component({
            selector: 'products-list',
            directives: [ProductRow],
            inputs: ['productList'],
            outputs: ['onProductSelected'],
            template: "\n  <product-row *ngFor=\"#currentProduct of productList\"\n    [product]=\"currentProduct\"\n    (click)=clicked(currentProduct)\n    [class.selected]=\"isSelected(currentProduct)\">\n    </product-row>\n  "
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
            new Product('MYSHOES', 'Black Runners', '/resources/images/shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 39.99),
            new Product('SWEETJACKET', 'Green Jacket', '/resources/images/jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 59.99),
            new Product('NEATHAT', 'Purple hat', '/resources/images/hat.jpg', ['Men', 'Accessories', 'Hats'], 79.99),
        ];
    }
    InventoryApp.prototype.productWasSelected = function (product) {
        console.log('product clicked: ', product);
    };
    InventoryApp = __decorate([
        core_1.Component({
            selector: 'inventory-app',
            directives: [ProductsList],
            template: "\n    <div class=\"inventory-app\">\n      <products-list\n        [productList]=\"products\"\n        (onProductSelected)=\"productWasSelected($event)\">\n      </products-list>\n    </div>\n  "
        })
    ], InventoryApp);
    return InventoryApp;
}());
browser_1.bootstrap(InventoryApp);
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
