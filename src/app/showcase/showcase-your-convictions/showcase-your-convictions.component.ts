import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PreviewChangeComponent } from 'src/app/shared/preview-change/preview-change.component';


@Component({
    selector: 'app-showcase-your-convictions',
    templateUrl: './showcase-your-convictions.component.html',
})
export class ShowcaseYourConvictionsComponent extends PreviewChangeComponent {

    constructor(
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);
        this.ngOnInit();
        this.form = this.formBuilder.group({
            convictions: ['', Validators.required],
        });
    }

    get isNo() {
        return this.form.get('convictions').value === 'No';
    }

    get isYes() {
        return this.form.get('convictions').value === 'Yes';
    }

    get noConvictions() {
        return this.form.get('noConvictions').value;
    }

    get isFormValid() {
        return this.form.valid;
    }

    check(value) {
        this.form.get('convictions').setValue(value);
        if (value === 'No') {
            this.form.removeControl('noConvictions');
            this.letsGoClicked = false;
            this.letsGo();
        } else {
            this.form.addControl('noConvictions', new FormControl(0, Validators.min(1)));
            this.outputEvent.emit(this);
        }
    }

    subtract() {
        if (this.form.get('noConvictions').value === 0) {
            return;
        }
        this.form.get('noConvictions').setValue(this.form.get('noConvictions').value - 1);
        this.letsGoClicked = false;
        this.letsGo();
    }

    add() {
        this.form.get('noConvictions').setValue(this.form.get('noConvictions').value + 1);
        this.letsGoClicked = false;
        this.letsGo();
    }

}
