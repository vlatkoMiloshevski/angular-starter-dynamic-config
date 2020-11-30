import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreviewChangeComponent } from '../../shared/preview-change/preview-change.component';


@Component({
    selector: 'app-details-about-you',
    templateUrl: './details-about-you.component.html',
})
export class DetailsAboutYouComponent extends PreviewChangeComponent {

    constructor(
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);
        this.ngOnInit();
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
        });
    }

    get username() {
        return this.form.get('username').value;
    }

    get dateOfBirth() {
        return this.form.get('dateOfBirth').value;
    }

    get email() {
        return this.form.get('email').value;
    }

    get telephone() {
        return this.form.get('telephone').value;
    }

    get isFormInvalid() {
        return this.form.invalid;
    }

}
