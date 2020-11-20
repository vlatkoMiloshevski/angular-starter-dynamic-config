import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-button-component',
    templateUrl: 'info-button.component.html',
})
export class InfoButtonComponent implements OnInit {
    @Input() tooltipText: string;

    constructor(
    ) { }

    ngOnInit() {
    }
}
