import { EventEmitter, Type } from '@angular/core';
import { SelectedItemModel } from '../shared/dynamic-single-select/dynamic-single-select.component';

export class DynamicComponent {
  constructor(public component: Type<any>, public data?: SelectedItemModel[], public outputEvent?: EventEmitter<any>) {}
}
