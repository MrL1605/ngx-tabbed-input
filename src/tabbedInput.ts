import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'tabbed-input',
  template: `

    <div>
    <div style="display:inline" class="form-control">
	    <span style="margin-right:5px" class="text-center bg-info" *ngFor="let card of cardsArr; let ind=index"> {{card}}
            <span (click)="removeCard(ind)" class="glyphicon glyphicon-remove small"></span>
        </span>
        <input type="text" [(ngModel)]="newCard" autocapitalize name="cardHolder" (ngModelChange)="updateValue()"
            style="border: none; overflow: auto; outline: none;margin: 0px;border: 0px;padding: 0px; background:transparent;" 
            class="form-control-static">
    </div>
    <div>

<!--
    Experimental 
    <input type="text" [(ngModel)]="newCard" name="cardHolder" 
            placeholder="Tabbed Input" (change)="updateValue()"> 
-->

  `,
})
export class TabbedInputDirective implements OnInit {
    
    
    @Input() initVal : Array<string>;
    
    newCard : string = "";
    cardsArr : Array<string> = [];
    
    constructor() {
    }
    
    ngOnInit(){
        if (this.initVal){
            this.cardsArr = this.initVal;
        }
    }

    static clearAll(){
        this.newCard = "";
        this.cardsArr = [];
    }
    
    updateValue(){
        let current = this.newCard;
        if (current[current.length-1] == " " && current.trim() != ""){
            this.cardsArr.push(current.trim());
            this.newCard = "";
        }else if (current[current.length-1] == " "){
            this.newCard = "";
        }
    }
  
    removeCard(cardInd : number){
        this.cardsArr.splice(cardInd, 1);
    }

}

