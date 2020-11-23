import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-standard-page',
    templateUrl: 'standard-page.component.html',
    styleUrls: ['./standard-page.component.scss'],
})
export class StandardPageComponent implements OnInit {
    insuranceType: string;
    constructor(
    ) { }

    ngOnInit() {
        this.insuranceType = window.sessionStorage.getItem('insuranceType');
    }
}
