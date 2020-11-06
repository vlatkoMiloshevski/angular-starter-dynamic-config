import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicDirective]',
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
