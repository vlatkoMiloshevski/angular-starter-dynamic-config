import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreviewChangeComponent } from 'src/app/shared/preview-change/preview-change.component';


@Component({
    selector: 'app-your-claims',
    templateUrl: './your-claims.component.html',
})
export class YourClaimsComponent extends PreviewChangeComponent {
    form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);
        this.ngOnInit();
        this.form = this.formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue]
        });
    }
}
