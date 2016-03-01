/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
// top level app component
// this is the component decorator.

// model
class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number
  ){}
}

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
@Component({
  selector: 'product-row',
  template: `
    <p>yo</p>
  `
})
class ProductRow{

}



@Component({
  selector: 'products-list',
  directives: [ProductRow], // means we're using the component ProductRow in this template.
  inputs: ['productList'], // array of strings = input keys to pass data like our array of products to this child component
  template: `
  <h3 *ngFor="#currentProduct of productList">{{ currentProduct.name }}</h3>
  `
})
class ProductsList {
  productList: Product[];
}

//Top level component goes last. Needs to know about its children.
@Component({
  selector: 'inventory-app', //each of these is a key. lots of options for configuring a component.
  directives: [ProductsList],
  template: `
    <div class="inventory-app">
      <products-list [productList]="products"></products-list>
    </div>
  `
  // using the {{}} mustache tags is called template binding. Use value of expression inside brackets.
})

//this is the component controller.
class InventoryApp {
  products: Product[]; // instance variable. can be used in this component's view.

  constructor(){
    // when we make a new instance of the component, this constructor is called.
    // setup tasks go here. To test it out, we're creating a product and storing it in the instance variable.
    this.products = [
      new Product('MYSHOES', 'Black Runners', '/resources/images/products/shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 39.99),
      new Product('SWEETJACKET', 'Green Jacket', '/resources/images/products/jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 59.99),
      new Product('NEATHAT', 'Purple hat', '/resources/images/products/hat.jpg', ['Men', 'Accessories', 'Hats'], 79.99),
    ];

  }

}
bootstrap(InventoryApp);
