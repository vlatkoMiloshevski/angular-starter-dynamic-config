import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-your-convictions',
    templateUrl: './your-convictions.component.html',
})
export class YourConvictionsComponent implements OnInit {
    @Output() outputEvent: EventEmitter<any> = new EventEmitter();
    isEditable: boolean;
    letsGoClicked: boolean;
    form: any;

    constructor(
        public formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue]
        });
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
        this.outputEvent.emit(this);
    }
}
