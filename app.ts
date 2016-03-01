/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
@Component({
  selector: 'inventory-app',
  template: `
    <div class="inventory-app">
      Show products here.
    </div>
  `
})
class InventoryApp {

}
bootstrap(InventoryApp);

// model
class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string,
    public price: number
  ){}
}
