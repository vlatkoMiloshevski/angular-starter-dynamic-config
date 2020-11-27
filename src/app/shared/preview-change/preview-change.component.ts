import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-preview-change',
    templateUrl: 'preview-change.component.html',
})
export class PreviewChangeComponent implements OnInit, OnDestroy {
    @Output() outputEvent: EventEmitter<any> = new EventEmitter();
    isEditable: boolean;
    letsGoClicked: boolean;

    constructor(
        public formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
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

    ngOnDestroy(): void {
    }

}
