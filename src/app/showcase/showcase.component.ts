import { Component, OnInit } from '@angular/core';
import { selectedItemPropertyType } from '../shared/dynamic-single-select/dynamic-single-select.component';

@Component({
    templateUrl: 'showcase.component.html',
})
export class ShowcaseComponent implements OnInit {
    tooltipText: string;
    firstInputList: { name: string; type: any; }[];
    secondInputList: { name: string; type: any; }[];
    firstStrategy: any;
    secondStrategy: any;
    thirdStrategy: any;
    thirdInputList: { name: string; type: selectedItemPropertyType; }[];
    firstInputListNoAdvanced: { name: string; type: selectedItemPropertyType; }[];
    constructor(
    ) { }

    ngOnInit() {
        this.firstStrategy = '1';
        this.secondStrategy = '2';
        this.thirdStrategy = '3';
        this.firstInputList = [
            { name: 'On my driveway', type: selectedItemPropertyType.PRIMARY },
            { name: 'In my garage', type: selectedItemPropertyType.PRIMARY },
            { name: 'Road outside my residence', type: selectedItemPropertyType.PRIMARY },
            { name: 'Other', type: selectedItemPropertyType.LOAD_ADVANCED_SEARCH },
            { name: 'Car park - Private', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Car park - Public', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Garage - Work', type: selectedItemPropertyType.ADVANCED_SEARCH },
        ];
        this.firstInputListNoAdvanced = [
            { name: 'On my driveway', type: selectedItemPropertyType.PRIMARY },
            { name: 'In my garage', type: selectedItemPropertyType.PRIMARY },
            { name: 'Road outside my residence', type: selectedItemPropertyType.PRIMARY },
        ];
        this.secondInputList = [
            { name: 'On my driveway', type: selectedItemPropertyType.PRIMARY },
            { name: 'In my garage', type: selectedItemPropertyType.PRIMARY },
            { name: 'Road outside my residence', type: selectedItemPropertyType.PRIMARY },
            { name: 'Other', type: selectedItemPropertyType.LOAD_ADVANCED_SEARCH },
            { name: 'Car park - Private', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Car park - Public', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Garage - Work', type: selectedItemPropertyType.ADVANCED_SEARCH },
        ];
        this.thirdInputList = [
            { name: 'On my driveway', type: selectedItemPropertyType.PRIMARY },
            { name: 'In my garage', type: selectedItemPropertyType.PRIMARY },
            { name: 'Road outside my residence', type: selectedItemPropertyType.PRIMARY },
            { name: 'Other', type: selectedItemPropertyType.LOAD_ADVANCED_SEARCH },
            { name: 'Car park - Private', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Car park - Public', type: selectedItemPropertyType.ADVANCED_SEARCH },
            { name: 'Garage - Work', type: selectedItemPropertyType.ADVANCED_SEARCH },
        ];
        this.tooltipText = 'From time to time esure services Limited, trading as esure like to contact you with marketing messages by email, post, phone and through digital channels. Please see our Privacy Policy for full details. If you prefer not to receive these messages from us, you can unsubscribe here. ';
    }

    firstFormValidityEvent(data) {
        console.log(data);
    }

    secondFormValidityEvent(data) {
        console.log(data);
    }

    thirdFormValidityEvent(data) {
        console.log(data);
    }

    firstFormValidityEventNoAdvanced(data) {
        console.log(data);
    }
}
