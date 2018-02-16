import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {TabbedInputDirective} from './src';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [TabbedInputDirective],
    exports: [TabbedInputDirective]
})
export class TabbedInputModule {
}

