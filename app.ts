/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
// top level app component
// this is the component decorator.
@Component({
  selector: 'inventory-app', //each of these is a key. lots of options for configuring a component.
  template: `
    <div class="inventory-app">
      <h1 *ngFor="#currentProduct of products">{{ currentProduct.name }}</h1>
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
