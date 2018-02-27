import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'tabbed-input',
    styles: [
            `
            .ngx-dropdown-style {
                padding-top: 3px;
                position: absolute;
                margin-top: 35px;
                z-index: 100;
            }

            .ngx-dropdown-focus {
                background-color: #f5f5f5;
            }
        `
    ],
    template: `

        <div class="row">
            <div class="col-sm-12">
                <div class="form-control" style="display: flex">
                    <span style="margin-right:5px" class="text-center bg-info"
                          *ngFor="let card of cardsArr; let ind=index"> {{card}}
                        <span (click)="removeCard(card, ind)" class="glyphicon glyphicon-remove small"></span>
                    </span>
                    <input list="browsers" [(ngModel)]="newCard" name="cardHolder"
                           (ngModelChange)="updateValue()" (keydown)="keyDownListener($event)"
                           style="border: none; overflow: auto; outline: none;
                           margin: 0;border: 0;padding: 0; background:transparent;">
                </div>
            </div>
            <div class="col-sm-12 form-control-static ngx-dropdown-style" *ngIf="autoPopulateOptions.length != 0">
                <div class="list-group">
                    <a *ngFor="let each of autoPopulateOptions; let optionInd=index " class="list-group-item"
                       (click)="autoPopulateClick(each)" [class.ngx-dropdown-focus]="optionInd == selectedInd">{{each}}
                    </a>
                </div>
            </div>
        </div>
    `
})
export class TabbedInputDirective implements OnInit {

    /*** This array of strings whose cards should already be created on <i>ngOnInit()</i> */
    @Input() initVal: Array<string>;
    /*** This option facilitates if a card should only be created from given options */
    @Input() onlyOptionsAllowed: boolean = false;
    /*** This array of strings whose autoPopulate should be shown when a user is typing */
    @Input() options: Array<string> = [];

    newCard: string = '';
    cardsArr: Array<string> = [];
    autoPopulateOptions: Array<string> = [];
    selectedInd: number = -1;

    constructor() {
    }

    ngOnInit() {
        if (this.initVal) {
            this.cardsArr = this.initVal;
        }
    }

    /**
     * Function is used to clear all existing cards in array.
     * */
    clearAll() {
        this.newCard = '';
        this.cardsArr = [];
    }

    /**
     * Function used to retrieve the results of cards created.
     **/
    getCards(): Array<string> {
        return this.cardsArr;
    }

    /**
     * Function is used to reset the autoPopulateOptions list and populate it
     * with all the options which are not already in cards Array.
     * */
    populateList() {
        this.selectedInd = -1;
        this.autoPopulateOptions = [];
        for (let each of this.options) {
            if (this.cardsArr.indexOf(each) == -1)
                this.autoPopulateOptions.push(each);
        }
    }

    /**
     * Function used to create a card by directly passing the value of card.
     * All checks to to insert or not should be done before this function is called.
     * But mostly used externally by autoPopulate list click.
     * */
    autoPopulateClick(val: string) {
        if (val.trim() == '')
            return;
        this.newCard = '';
        this.selectedInd = -1;
        this.autoPopulateOptions = [];
        if (this.cardsArr.indexOf(val) == -1)
            this.cardsArr.push(val.trim());
    }

    /**
     * Function used to listen to key events on when input is in focus.
     * */
    keyDownListener(e: any) {
        // If Backspace is clicked
        // and input field is empty
        if (e.keyCode == 8 && this.newCard.trim() == '') {
            this.cardsArr.pop();
            return;
        }

        // If Down is clicked
        // and length of autoPopulateOptions is not empty
        if (e.keyCode == 40 && this.autoPopulateOptions.length != 0) {
            this.selectedInd = (this.selectedInd + 1) % this.autoPopulateOptions.length;
            return;
        }

        // If Up is clicked
        // and length of autoPopulateOptions is not empty
        if (e.keyCode == 38 && this.autoPopulateOptions.length != 0) {
            if (this.selectedInd != -1)
                this.selectedInd = (this.selectedInd - 1) % this.autoPopulateOptions.length;
            return;
        }

        // If Enter is clicked
        // and something is selected
        if (e.keyCode == 13 && this.selectedInd != -1) {
            this.autoPopulateClick(this.autoPopulateOptions[this.selectedInd]);
        }
    }

    updateValue() {
        let current = this.newCard;

        // This first cleans and repopulates the autoPopulate list
        // as there is a change in value of input field
        this.autoPopulateOptions = [];
        for (let each of this.options) {

            // Check with all the options if current value matches
            if (each.toLowerCase().indexOf(current.trim().toLowerCase()) != -1) {

                // Only insert given value if it already does not exist in card
                if (this.onlyOptionsAllowed && this.cardsArr.indexOf(each) == -1)
                    this.autoPopulateOptions.push(each);
                // If onlyAllowed is not enabled then just add
                else if (!this.onlyOptionsAllowed)
                    this.autoPopulateOptions.push(each);
            }
        }

        // This is the condition if space is the last character entered with valid value.
        if (current[current.length - 1] == ' ' && current.trim() != '') {
            // If onlyOptionsAllowed is enabled then directly insert
            if (!this.onlyOptionsAllowed) {
                this.populateList();
                this.autoPopulateClick(current);
            } else {
                // Else check if it exists in autoPopulate else just empty it.
                let autoPopInd = -1;
                for (let each of this.autoPopulateOptions) {
                    autoPopInd++;
                    if (each.toLowerCase() == current.trim().toLowerCase()) {
                        this.autoPopulateClick(this.autoPopulateOptions[autoPopInd]);
                        return;
                    }
                }
                this.newCard = '';
                this.populateList();
                return;
            }
        } else if (current[current.length - 1] == ' ') {
            // If last character is space but not word is not valid
            this.newCard = '';
            this.populateList();
        } else if (current.trim() == '') {
            // word is just empty, don't show the autoPopulate
            this.autoPopulateOptions = [];
        }
    }

    /**
     * Card value is used to insert it back into autoPopulate list
     * Card index is used to remove given element from cards Array
     * */
    removeCard(cardValue: string, cardInd: number) {
        this.cardsArr.splice(cardInd, 1);
        this.selectedInd = -1;
    }


}

