import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PreviewChangeComponent } from 'src/app/shared/preview-change/preview-change.component';


@Component({
    selector: 'app-showcase-your-claims',
    templateUrl: './showcase-your-claims.component.html',
})
export class ShowcaseYourClaimsComponent extends PreviewChangeComponent {

    constructor(
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);
        this.ngOnInit();
        this.form = this.formBuilder.group({
            claims: ['', Validators.required]
        });
    }

    get isNo() {
        return this.form.get('claims').value === 'No';
    }

    get isYes() {
        return this.form.get('claims').value === 'Yes';
    }

    get noClaims() {
        return this.form.get('noClaims').value;
    }

    get isFormValid() {
        return this.form.valid;
    }

    check(value){
        this.form.get('claims').setValue(value);
        if (value === 'No') {
            this.form.removeControl('noClaims');
            this.letsGoClicked = false;
            this.letsGo();
        } else {
            this.form.addControl('noClaims', new FormControl(0, Validators.min(1)));
            this.letsGoClicked = true;
            this.outputEvent.emit(this);
        }
    }

    subtract() {
        if (this.form.get('noClaims').value === 0) {
            return;
        }
        this.form.get('noClaims').setValue(this.form.get('noClaims').value - 1);
        this.letsGoClicked = false;
        this.letsGo();
    }

    add() {
        this.form.get('noClaims').setValue(this.form.get('noClaims').value + 1);
        this.letsGoClicked = false;
        this.letsGo();
    }

}
