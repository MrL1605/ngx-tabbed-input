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
            <div >
                <div class="col-sm-4">
                    <tabbed-input [onlyOptionsAllowed]="false" [initVal]="arr"
                                  [options]="autoPopulateOptions" #tabbedInput>
                    </tabbed-input>
                </div>
                <div class="btn btn-default" (click)="cleanCards()">Clear All</div>
            </div>
            <div class="col-sm-4">
                <div class="btn btn-default" (click)="getCards()">Get All</div>
                <ul class="list-group">
                    <li class="list-group-item" *ngFor="let i of result"> {{i}}</li>
                </ul>
            </div>

        </div>
    `,
})
export class App {

    @ViewChild("tabbedInput") tInput;
    arr: Array<string> = ['One', 'To2'];
    name: string = '';
    autoPopulateOptions: Array<string> = ['Option1', 'Oops2'];
    result: Array<string> = [];

    constructor() {
        this.name = `Angular! v${VERSION.full}`;
    }

    cleanCards() {
        this.tInput.clearAll();
    }

    getCards() {
        this.result = this.tInput.getCards();
    }

}

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [App, TabbedInputDirective],
    bootstrap: [App]
})
export class AppModule {
}