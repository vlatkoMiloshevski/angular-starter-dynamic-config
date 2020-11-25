import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
    imageUrl: string;
    insuranceType: string;
    constructor(
    ) { }

    ngOnInit() {
        this.insuranceType = window.sessionStorage.getItem('insuranceType');
        this.imageUrl = `../../../../assets/images/Screenshot_${this.insuranceType.substring(1)}.png`;

    }
}
