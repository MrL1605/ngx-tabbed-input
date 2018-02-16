//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {TabbedInputDirective} from './directive';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      <tabbed-input [initVal]="arr" [options]="autoPopulateOptions" ></tabbed-input>
    </div>
  `,
})
export class App {
  
    arr : Array<string> = [];
    name: string = "";
    autoPopulateOptions: Array<string> = ["Option1","Oops2"];
  
    constructor() {
        this.name = `Angular! v${VERSION.full}`;
        this.arr = ["One", "To2"];
    }

}

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ App, TabbedInputDirective ],
  bootstrap: [ App ]
})
export class AppModule {}