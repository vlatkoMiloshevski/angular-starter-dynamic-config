import { Component, OnInit } from '@angular/core';

import * as whatsCovered from './whats-covered.json';

@Component({
    selector: 'app-whats-covered',
    templateUrl: './whats-covered.component.html',
})
export class WhatsCoveredComponent implements OnInit {
    data: any;

    constructor() { }

    ngOnInit() {
        this.data = whatsCovered.coverage.questions;
    }

}
