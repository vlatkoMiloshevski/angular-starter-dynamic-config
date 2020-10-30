import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedItemModel } from '../dynamic-single-select.component';

@Component({
    templateUrl: './strategy2.component.html',
})
export class Strategy2Component implements OnInit {
    @Input() data: SelectedItemModel[];
    @Output() outputEvent: EventEmitter<SelectedItemModel> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    selectAdvanced(item) {
        this.outputEvent.emit(item);
    }
}
