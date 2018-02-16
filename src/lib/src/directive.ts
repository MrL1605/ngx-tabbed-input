import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'tabbed-input',
    template: `

        <div>
            <div style="display:inline" class="form-control">
                <span style="margin-right:5px" class="text-center bg-info"
                      *ngFor="let card of cardsArr; let ind=index"> {{card}}
                    <span (click)="removeCard(card, ind)" class="glyphicon glyphicon-remove small"></span>
                </span>
                <input list="browsers" [(ngModel)]="newCard" name="cardHolder"
                       (ngModelChange)="updateValue()" (keydown)="keyDownListener($event)"
                       style="border: none; overflow: auto; outline: none;margin: 0;border: 0;padding: 0; background:transparent;"
                       class="form-control-static">
            </div>
            <div>
                <ul class="hideDiv list-group">
                    <li *ngFor="let each of autoPopulateOptions; let optionInd=index " class="list-group-item"
                        (click)="autoPopulateClick(each)" [class.active]="optionInd == selectedInd">{{each}}
                    </li>
                </ul>
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

    clearAll() {
        this.newCard = '';
        this.cardsArr = [];
    }

    populateList() {
        this.selectedInd = -1;
        this.autoPopulateOptions = [];
        for (let each of this.options) {
            if (this.cardsArr.indexOf(each) == -1)
                this.autoPopulateOptions.push(each);
        }
    }

    /**
     * Function used to create a card. But mostly used externally by autoPopulate list click
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

    keyDownListener(e: any) {
        // If Backspace is clicked
        if (this.newCard.trim() == '' && e.keyCode == 8) {
            this.cardsArr.pop();
            return;
        }

        // If Down is clicked
        if (e.keyCode == 40 && this.autoPopulateOptions.length != 0) {
            this.selectedInd = (this.selectedInd + 1) % this.autoPopulateOptions.length;
        }

        // If Enter is clicked
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
            if (each.toLowerCase().indexOf(current.trim().toLowerCase()) != -1) {
                // Only insert given value if it already does not exist in card
                if (this.onlyOptionsAllowed && this.cardsArr.indexOf(each) == -1)
                    this.autoPopulateOptions.push(each);
                else if (!this.onlyOptionsAllowed)
                    this.autoPopulateOptions.push(each);
            }
        }
        console.log(this.autoPopulateOptions);
        if (current[current.length - 1] == ' ' && current.trim() != '') {
            if (!this.onlyOptionsAllowed) {
                this.populateList();
                this.autoPopulateClick(current);
            } else {
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
            this.newCard = '';
            this.populateList();
        } else if (current.trim() == '') {
            this.autoPopulateOptions = [];
        }
    }

    removeCard(cardValue: string, cardInd: number) {
        this.cardsArr.splice(cardInd, 1);
        this.autoPopulateOptions.push(cardValue);
        this.selectedInd = -1;
    }


}

