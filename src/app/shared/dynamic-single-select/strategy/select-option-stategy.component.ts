import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedItemModel } from '../dynamic-single-select.component';

@Component({
    templateUrl: './select-option-stategy.component.html',
})
export class SelectOptionStrategyComponent implements OnInit {
    @Input() data: SelectedItemModel[];
    @Output() outputEvent: EventEmitter<SelectedItemModel> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    selectAdvanced(itemName) {
        this.outputEvent.emit(this.data.find(x => x.name === itemName));
    }

    get isDefault() {
        return !this.data.some(x => x.isSelected);
    }
}
