import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../dynamic-module-loader/dynamic.component';
import { selectedItemPropertyType } from '../shared/dynamic-single-select/dynamic-single-select.component';
import { ModalService } from '../shared/modal/modal.service';
import { TestModalComponent } from '../shared/modal/test-modal/test-modal.component';
import { DrawerService } from '../shared/root-drawer/drawer.service';
import { TestDrawerComponent } from '../shared/root-drawer/test-drawer/test-drawer.component';
import { ShowcaseDetailsAboutYouComponent } from './showcase-details-about-you/showcase-details-about-you.component';
import { ShowcaseYourClaimsComponent } from './showcase-your-claims/showcase-your-claims.component';
import { ShowcaseYourConvictionsComponent } from './showcase-your-convictions/showcase-your-convictions.component';

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
            new DynamicComponent(ShowcaseDetailsAboutYouComponent, { isShown: true }),
            new DynamicComponent(ShowcaseYourClaimsComponent, { isShown: false }),
            new DynamicComponent(ShowcaseYourConvictionsComponent, { isShown: false }),
        ];
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

    getPropValue(propName, className) {
        if (window && window.hasOwnProperty('getComputedStyle')) {
            return window.getComputedStyle(document.querySelector(className), null).getPropertyValue(propName);
        }
    }

    outputEvent(component) {
        console.log(component);
        const activeComponent = this.dynamicComponentList.find(x => x.component.name === component.constructor.name);
        const activeComponentIndex = this.dynamicComponentList.findIndex(x => x.component.name === component.constructor.name);
        activeComponent.data.isValid = component.form.valid;
        const nextComponent = this.dynamicComponentList[activeComponentIndex + 1];
        if (nextComponent && !component.letsGoClicked) {
            nextComponent.data.isShown = true;
        }
    }

    get isContinueDisabled() {
        return this.dynamicComponentList.some(x => !x.data.isValid);
    }

}
