import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicComponent } from 'src/app/dynamic-module-loader/dynamic.component';
import { DynamicSingleSelectService } from './dynamic-single-select.service';

export enum selectedItemPropertyType {
    PRIMARY,
    LOAD_ADVANCED_SEARCH,
    ADVANCED_SEARCH,
}

export interface SelectedItemModel {
    name: string;
    type: selectedItemPropertyType;
    isSelected?: boolean;
}

@Component({
    selector: 'app-dynamic-single-select',
    templateUrl: './dynamic-single-select.component.html',
})
export class DynamicSingleSelectComponent implements OnInit {
    @Input() inputList: SelectedItemModel[];
    @Input() strategy: string;
    form: FormGroup;
    strategyComponent: DynamicComponent;

    constructor(
        public formBuilder: FormBuilder,
        private dynamicSingleSelectService: DynamicSingleSelectService,
    ) {
    }

    ngOnInit() {
        const advancedListItems = this.inputList.filter(x => x.type === selectedItemPropertyType.ADVANCED_SEARCH);
        this.strategyComponent = this.dynamicSingleSelectService.getComponent(this.strategy, advancedListItems);
        this.form = this.formBuilder.group({ selectedItem: [null, this.selectedItemValidator] });
    }

    selectPrimary(item) {
        this.form.get('selectedItem').setValue(this.inputList.find(x => x === item));
        this.inputList.forEach(x => x.isSelected = false);
        this.inputList.find(x => x === item).isSelected = true;
    }

    selectOther() {
        const advancedListItems = this.inputList.filter(x => x.type === selectedItemPropertyType.ADVANCED_SEARCH);
        if (advancedListItems.some(x => x.isSelected)) { return; }

        this.form.get('selectedItem').setValue(this.inputList.find(x => x.type === selectedItemPropertyType.LOAD_ADVANCED_SEARCH));
        this.inputList.forEach(x => x.isSelected = false);
        this.inputList.find(x => x.type === selectedItemPropertyType.LOAD_ADVANCED_SEARCH).isSelected = true;
    }

    get primaryListItems(): Array<any> {
        return this.inputList.filter(x => x.type === selectedItemPropertyType.PRIMARY);
    }

    get otherItem(): SelectedItemModel {
        return this.inputList.find(x => x.type === selectedItemPropertyType.LOAD_ADVANCED_SEARCH);
    }

    selectedItemValidator(control: AbstractControl) {
        if (control.value !== null && control.value.type !== selectedItemPropertyType.LOAD_ADVANCED_SEARCH) {
            return null;
        }
        return true;
    }

    outputEvent(advancedItem: SelectedItemModel) {
        this.form.get('selectedItem').setValue(advancedItem);
        this.inputList.forEach(x => x.isSelected = false);
        this.inputList.find(x => x.type === selectedItemPropertyType.LOAD_ADVANCED_SEARCH).isSelected = true;
        this.inputList.find(x => x === advancedItem).isSelected = true;
    }

}
