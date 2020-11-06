import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedItemModel } from '../dynamic-single-select.component';

@Component({
    templateUrl: './strategy2.component.html',
})
export class Strategy2Component implements OnInit {
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
