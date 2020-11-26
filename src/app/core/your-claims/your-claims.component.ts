import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-your-claims',
    templateUrl: './your-claims.component.html',
})
export class YourClaimsComponent implements OnInit {
    @Output() outputEvent: EventEmitter<any> = new EventEmitter();
    isEditable: boolean;
    letsGoClicked: boolean;
    form: any;

    constructor(
        public formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({});
    }

    changeClick() {
        this.isEditable = !this.isEditable;
    }

    letsGo() {
        this.isEditable = !this.isEditable;
        this.outputEvent.emit(this);
        this.letsGoClicked = true;
    }

    save() {
        this.isEditable = !this.isEditable;
    }
}
