import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedItemModel } from '../dynamic-single-select.component';

@Component({
    templateUrl: './radio-button-strategy.component.html',
})
export class RadioButtonStrategyComponent implements OnInit {
    @Input() data: SelectedItemModel[];
    @Output() outputEvent: EventEmitter<SelectedItemModel> = new EventEmitter();
    selectedValue: string;

    constructor() {
    }

    ngOnInit() {

    }

    click(item: SelectedItemModel, event) {
        item.isSelected = true;
        this.selectedValue = item.name;
        this.outputEvent.emit(item);
        event.preventDefault();
    }

    select(item: SelectedItemModel, event) {
        this.selectedValue = item.name;
        this.outputEvent.emit(item);
        event.stopPropagation();
    }
}
