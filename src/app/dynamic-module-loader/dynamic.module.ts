import { NgModule } from '@angular/core';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import { DynamicDirective } from './dynamic.directive';


@NgModule({
    declarations: [
        DynamicLoaderComponent,
        DynamicDirective,
    ],
    providers: [],
    imports: [
    ],
    entryComponents: [
    ],
    exports: [
        DynamicLoaderComponent,
        DynamicDirective,
    ]
})
export class DynamicModule { }
