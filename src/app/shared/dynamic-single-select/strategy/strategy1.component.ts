import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedItemModel } from '../dynamic-single-select.component';

@Component({
    templateUrl: './strategy1.component.html',
})
export class Strategy1Component implements OnInit {
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
