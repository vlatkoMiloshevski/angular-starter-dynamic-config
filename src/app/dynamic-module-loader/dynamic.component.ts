import { EventEmitter, Type } from '@angular/core';

export class DynamicComponent {
  constructor(public component: Type<any>, public data?: any, public outputEvent?: EventEmitter<any>) {

  }
}
