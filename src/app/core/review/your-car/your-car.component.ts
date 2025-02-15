import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectedItemModel, selectedItemPropertyType } from 'src/app/shared/dynamic-single-select/dynamic-single-select.component';
import { YourCarService } from './your-car.service';

@Component({
  selector: 'app-your-car',
  templateUrl: './your-car.component.html',
})
export class YourCarComponent {
  @Output() outputEvent: EventEmitter<any> = new EventEmitter();
  inputList: Array<SelectedItemModel>;
  strategy: string;
  isFormValid: any;

  constructor(
    private yourCarService: YourCarService,
  ) {
    const insuranceType = window.sessionStorage.getItem('insuranceType');
    this.strategy = window['esure-env'][`${this.yourCarService.getInsuranceType(insuranceType)}_REVIEW_DYNAMIC_SINGLE_SELECT`];
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

  formValidityEvent(data) {
    this.isFormValid = data.isFormValid;
    if (this.isFormValid) { return; }

    this.outputEvent.emit(!this.isFormValid);
  }

  onNextClick() {
    this.outputEvent.emit(!this.isFormValid);
  }
}
