import { Component } from '@angular/core';
import { SelectedItemModel, selectedItemPropertyType } from 'src/app/shared/dynamic-single-select/dynamic-single-select.component';

@Component({
  selector: 'app-your-car',
  templateUrl: './your-car.component.html',
})
export class YourCarComponent {
  inputList: Array<SelectedItemModel>;
  strategy: string;

  constructor() {
    this.strategy = window['esure-env'][`${this.insuranceType}_REVIEW_DYNAMIC_SINGLE_SELECT`];
    this.inputList = [
      { name: 'On my driveway', type: selectedItemPropertyType.PRIMARY },
      { name: 'In my garage', type: selectedItemPropertyType.PRIMARY },
      { name: 'Road outside my residence', type: selectedItemPropertyType.PRIMARY },
      { name: 'Other', type: selectedItemPropertyType.LOAD_ADVANCED_SEARCH },
      { name: 'Car park - Private', type: selectedItemPropertyType.ADVANCED_SEARCH },
      { name: 'Car park - Public', type: selectedItemPropertyType.ADVANCED_SEARCH },
      { name: 'Garage - Work', type: selectedItemPropertyType.ADVANCED_SEARCH },
    ];
  }

  get insuranceType() {
    switch (window.sessionStorage.getItem('insuranceType')) {
      case '#motor': return 'MOTOR';
      case '#home': return 'HOME';
      case '#multicar': return 'MULTICAR';
    }
  }
}
