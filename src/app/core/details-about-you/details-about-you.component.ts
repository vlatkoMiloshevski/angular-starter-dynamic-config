import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreviewChangeComponent } from '../../shared/preview-change/preview-change.component';


@Component({
    selector: 'app-details-about-you',
    templateUrl: './details-about-you.component.html',
})
export class DetailsAboutYouComponent extends PreviewChangeComponent {
    form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);
        this.ngOnInit();
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue],
        });
    }

}
