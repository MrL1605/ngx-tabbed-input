//our root app component
import {Component, NgModule, VERSION, ViewChild} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {TabbedInputDirective} from './directive';

@Component({
    selector: 'my-app',
    template: `
        <div>
            <h2>Hello {{name}}</h2>
            <div class="col-sm-4">
            <tabbed-input [onlyOptionsAllowed]="false" [initVal]="arr"
                          [options]="autoPopulateOptions" #tabbedInput>
            </tabbed-input>
            </div>
            
            <div class="btn btn-default" (click)="cleanCards()" >Clear All</div>
            
        </div>
    `,
})
export class App {

    @ViewChild("tabbedInput") tInput;
    arr: Array<string> = ['One', 'To2'];
    name: string = '';
    autoPopulateOptions: Array<string> = ['Option1', 'Oops2'];

    constructor() {
        this.name = `Angular! v${VERSION.full}`;
    }

    cleanCards() {
        this.tInput.clearAll();
    }
}

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [App, TabbedInputDirective],
    bootstrap: [App]
})
export class AppModule {
}