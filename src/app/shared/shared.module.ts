import { NgModule } from '@angular/core';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from '../dynamic-module-loader/dynamic.module';
import { DynamicSingleSelectComponent } from './dynamic-single-select/dynamic-single-select.component';
import { DynamicSingleSelectService } from './dynamic-single-select/dynamic-single-select.service';
import { Strategy1Component } from './dynamic-single-select/strategy/strategy1.component';
import { Strategy2Component } from './dynamic-single-select/strategy/strategy2.component';
import { Strategy3Component } from './dynamic-single-select/strategy/strategy3.component';


@NgModule({
    declarations: [
        NavButtonsComponent,
        DynamicSingleSelectComponent,
        Strategy1Component,
        Strategy2Component,
        Strategy3Component,
    ],
    providers: [
        DynamicSingleSelectService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicModule,
    ],
    entryComponents: [
        NavButtonsComponent,
        DynamicSingleSelectComponent,
        Strategy1Component,
        Strategy2Component,
        Strategy3Component,
    ],
    exports: [
        NavButtonsComponent,
        DynamicSingleSelectComponent,
        Strategy1Component,
        Strategy2Component,
        Strategy3Component,
    ]
})
export class SharedModule { }
