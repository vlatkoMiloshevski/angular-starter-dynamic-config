import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { DynamicDirective } from './dynamic.directive';

@Component({
    selector: 'app-dynamic-loader',
    template: `<ng-template appDynamicDirective></ng-template>`,
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
    @Input() dynamicComponent: DynamicComponent;
    @ViewChild(DynamicDirective, { static: true }) appDynamicDirective: DynamicDirective;
    @Output() outputEvent: EventEmitter<any> = new EventEmitter();

    private componentRef;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnDestroy() {

    }

    loadComponent() {
        const viewContainerRef = this.appDynamicDirective.viewContainerRef;
        viewContainerRef.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponent.component);
        this.componentRef = viewContainerRef.createComponent<DynamicComponent>(componentFactory);
        this.componentRef.instance.data = this.dynamicComponent.data;

        if (this.componentRef.instance.outputEvent) {
            this.componentRef.instance.outputEvent.subscribe(val => this.outputEvent.emit(val));
        }
    }
}
