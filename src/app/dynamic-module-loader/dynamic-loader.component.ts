import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { DynamicDirective } from './dynamic.directive';

@Component({
    selector: 'app-dynamic-loader',
    templateUrl: './dynamic-loader.component.html',
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
    @Input() dataItem: DynamicComponent;
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
        const dataItem = this.dataItem;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dataItem.component);

        const viewContainerRef = this.appDynamicDirective.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent<DynamicComponent>(componentFactory);
        this.componentRef.instance.data = dataItem.data;
        if (this.componentRef.instance.outputEvent) {
            this.componentRef.instance.outputEvent.subscribe(val => this.outputEvent.emit(val));
        }
    }
}
