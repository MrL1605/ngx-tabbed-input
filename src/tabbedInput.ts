import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'tabbed-input',
    template: `

    <div>
    <div style="display:inline" class="form-control">
	    <span style="margin-right:5px" class="text-center bg-info" *ngFor="let card of cardsArr; let ind=index"> {{card}}
            <span (click)="removeCard(card, ind)" class="glyphicon glyphicon-remove small"></span>
        </span>
        <input list="browsers"  [(ngModel)]="newCard" autocapitalize name="cardHolder" 
            (ngModelChange)="updateValue()" (keydown)="popIfEmpty($event)"
            style="border: none; overflow: auto; outline: none;margin: 0px;border: 0px;padding: 0px; background:transparent;" 
            class="form-control-static">
    </div>
    <div>
    
    <ul>
      <li *ngFor="let each of autoPopulateOptions" (click)="autoPopulateClick(each)" >{{each}}</li>
    </ul>

  `,
})
export class TabbedInputDirective implements OnInit {


    @Input() initVal: Array<string>;
    @Input() onlyOptionsAllowed: boolean = true;
    @Input() options: Array<string> = [];

    newCard: string = "";
    cardsArr: Array<string> = [];
    autoPopulateOptions: Array<string> = [];

    constructor() {
    }

    ngOnInit() {
        if (this.initVal) {
            this.cardsArr = this.initVal;
        }
        this.populateList();
    }

    clearAll() {
        this.newCard = "";
        this.cardsArr = [];
    }

    populateList() {
        this.autoPopulateOptions = [];
        for (let each of this.options) {
            if (this.cardsArr.indexOf(each) == -1)
                this.autoPopulateOptions.push(each);
        }
    }

    autoPopulateClick(val: string) {
        if (val.trim() == "")
            return;
        this.cardsArr.push(val.trim());
        this.newCard = "";
        if (this.autoPopulateOptions.indexOf(val) != -1)
            this.autoPopulateOptions.splice(this.autoPopulateOptions.indexOf(val), 1);
        this.populateList();
    }

    popIfEmpty(e: any) {
        if (this.newCard.trim() == "" && e.keyCode == 8) {
            this.cardsArr.pop();
        }
    }

    updateValue() {
        let current = this.newCard;
        this.autoPopulateOptions = [];
        for (let each of this.options) {
            if (each.toLowerCase().indexOf(current.trim().toLowerCase()) != -1) {
                this.autoPopulateOptions.push(each);
            }
        }

        if (current[current.length - 1] == " " && current.trim() != "") {
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
                this.newCard = "";
                this.populateList();
                return;
            }
        } else if (current[current.length - 1] == " ") {
            this.newCard = "";
            this.populateList();
        }
    }

    removeCard(cardValue: string, cardInd: number) {
        this.cardsArr.splice(cardInd, 1);
        this.autoPopulateOptions.push(cardValue);
    }


}

