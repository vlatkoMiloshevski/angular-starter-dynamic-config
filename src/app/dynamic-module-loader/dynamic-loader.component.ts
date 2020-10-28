import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { DynamicDirective } from './dynamic.directive';

@Component({
    selector: 'app-dynamic-loader',
    templateUrl: './dynamic-loader.component.html',
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
    @Input() dataItem: DynamicComponent;
    @ViewChild(DynamicDirective, { static: true }) appDynamicDirective: DynamicDirective;
    interval: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        const dataItem = this.dataItem;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dataItem.component);

        const viewContainerRef = this.appDynamicDirective.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<DynamicComponent>(componentFactory);
    }
}
