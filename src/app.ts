//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {TabbedInputDirective} from 'src/tabbedInput'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      <tabbed-input [initVal]="arr"></tabbed-input>
    </div>
  `,
})
export class App {
  
    arr : Array<string> = [];
    name:string;
  
    constructor() {
        this.name = `Angular! v${VERSION.full}`
        this.arr = ["One", "To2"];
    }
  
  
  
}

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ App, TabbedInputDirective ],
  bootstrap: [ App ]
})
export class AppModule {}