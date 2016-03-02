/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
// dont forget to import EventEmitter and to declare your components from child up to parent.
import {EventEmitter} from 'angular2/core';
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
  inputs: ['product'],
  template: `
    <p>yo check out this cool {{ product.name }}</p>
  `
})
class ProductRow{
  product: Product;
}



@Component({
  selector: 'products-list',
  directives: [ProductRow], // means we're using the component ProductRow in this template.
  inputs: ['productList'], // array of strings = input keys to pass data like our array of products to this child component
  outputs: ['onProductSelected'],
  template: `
  <product-row *ngFor="#currentProduct of productList"
    [product]="currentProduct"
    (click)=clicked(currentProduct)
    [class.selected]="isSelected(currentProduct)">
    </product-row>
  `
})
// when the product row element emits its built in click event, we trigger the clicked function in products list and sent out the currentProduct
// [class.selected]= sets the class "selected" on the current component equal to true or false based on the output of the "methodOnTheRight(argument)"
// remember that both the 'clicked' method and the 'isSelected' method are called from the products-list template, so they are calling methods in the products-list controlelr class, even though they are being called from a child component tag. To call the child component's methods, do it from the child component's template.
// when using child components in a template as above, the right side of the equations in the template refer to local variables or methods from the controller class.
// left side of equations in the template refer to parts of the child component - [] = input, () = output.
class ProductsList {
  productList: Product[];
  onProductSelected: EventEmitter<Product>;
  currentProduct: Product; //reference to the clicked product. "local component state, only used inside component"
  constructor(){
    this.onProductSelected = new EventEmitter();
  }
  clicked(clickedProduct: Product): void{
    this.currentProduct = clickedProduct;
    this.onProductSelected.emit(clickedProduct);
  }
  isSelected(product: Product): boolean {
    //this method returns true/false to either add the selected class or not to the current row.
    if(!product || !this.currentProduct){
      return false;
    } else {
      return product.sku === this.currentProduct.sku;
    }
  }
}

//Top level component goes last. Needs to know about its children.
@Component({
  selector: 'inventory-app', //each of these is a key. lots of options for configuring a component.
  directives: [ProductsList],
  template: `
    <div class="inventory-app">
      <products-list
        [productList]="products"
        (onProductSelected)="productWasSelected($event)">
      </products-list>
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

  productWasSelected(product: Product): void {
    console.log('product clicked: ', product);
  }
  //“Data flows in to your component via input bindings and events flow out of your component through output bindings.”
  // input is passed through square brackets and output is passed through parenthesis.
  // in our inventoryapp template we are saying listen to the (outputDefinedInChildComponent)="methodToCallInParent($event)"
  // "$event is a special variable representing the thing emitted to the output."

  // in our child component that is sending the output, we create an output binding. bind a dom event to a method. (click)="myfunction()"
  // specify output property names in emitting component annotation - outputs: ['nameForEmitter'],
  // create an event emitter object attached to the defined output property in emitting controller class.
  // nameForEmitter: EventEmitter<string>; (we are specifying the type of event emitted here)
  // emit at the right time by calling a function from a dom event in child component template:
  // <button (click)='emitMethod()'>
  // then in the child component controller class:
  // emitMethod(){
  //  this.nameForEmitter.emit("the string i am emitting");
  // }
  // we answer for this in the parent template:
  // <child-component (nameForEmitter)=parentMethod($event)></child-component>
  // Then in the parent component class we would define the parentMethod:
  // parentMethod(message: string){
  //   console.log(message);
  // }
}
bootstrap(InventoryApp);
