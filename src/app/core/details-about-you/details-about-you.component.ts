import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-details-about-you',
    templateUrl: './details-about-you.component.html',
})
export class DetailsAboutYouComponent implements OnInit {
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
        this.outputEvent.emit({ component: this, event: 'letsgo' });
        this.letsGoClicked = true;
    }

    save() {
        this.isEditable = !this.isEditable;
        this.outputEvent.emit({ component: this, event: 'save' });
    }
}
