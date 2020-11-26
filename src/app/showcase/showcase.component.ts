import { Component, OnInit } from '@angular/core';
import { DetailsAboutYouComponent } from '../core/details-about-you/details-about-you.component';
import { KeepingYouInformedComponent } from '../core/landing/keeping-you-informed/keeping-you-informed.component';
import { WhatsCoveredComponent } from '../core/landing/whats-covered/whats-covered.component';
import { YourClaimsComponent } from '../core/your-claims/your-claims.component';
import { DynamicComponent } from '../dynamic-module-loader/dynamic.component';
import { selectedItemPropertyType } from '../shared/dynamic-single-select/dynamic-single-select.component';
import { ModalService } from '../shared/modal/modal.service';
import { TestModalComponent } from '../shared/modal/test-modal/test-modal.component';
import { DrawerService } from '../shared/root-drawer/drawer.service';
import { TestDrawerComponent } from '../shared/root-drawer/test-drawer/test-drawer.component';

@Component({
    templateUrl: 'showcase.component.html',
    styleUrls: ['./showcase.component.scss'],
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
    dynamicComponentList: DynamicComponent[];
    activeComponentIndex: number;
    isContinueVisible: boolean;
    constructor(
        private drawerService: DrawerService,
        private modalService: ModalService,
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
        this.tooltipText = 'From time to time esure services Limited, trading as esure like to contact you with marketing messages by email, post, phone and through digital channels. Please see our Privacy Policy for full details.';
        this.dynamicComponentList = [
            new DynamicComponent(YourClaimsComponent, { isShown: true }),
            new DynamicComponent(YourClaimsComponent, { isShown: false }),
            new DynamicComponent(DetailsAboutYouComponent, { isShown: false }),
        ];
        this.activeComponentIndex = 0;
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

    openDrawer() {
        this.drawerService.openDrawer(TestDrawerComponent);
    }

    openModal() {
        this.modalService.openModal(TestModalComponent, { isUpdateRequired: true });
    }

    outputEvent(type) {
        console.log(type.component);
        this.dynamicComponentList[this.activeComponentIndex].data.isValid = type.component.form.valid;
        if (type.event === 'letsgo') {
            if (this.dynamicComponentList[this.activeComponentIndex + 1]) {
                this.dynamicComponentList[++this.activeComponentIndex].data.isShown = true;
            } else {
                this.isContinueVisible = true;
            }
        }
    }

    get isContinueDisabled() {
        return this.dynamicComponentList.some(x => !x.data.isValid);
    }

}
