import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from '../dynamic-module-loader/dynamic.module';
import { DynamicSingleSelectComponent } from './dynamic-single-select/dynamic-single-select.component';
import { DynamicSingleSelectService } from './dynamic-single-select/dynamic-single-select.service';
import { Strategy1Component } from './dynamic-single-select/strategy/strategy1.component';
import { Strategy2Component } from './dynamic-single-select/strategy/strategy2.component';
import { Strategy3Component } from './dynamic-single-select/strategy/strategy3.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { HelpBubbleDirective } from './help-bubbles/help-bubble.directive';
import { InfoButtonComponent } from './info-button/info-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StandardPageComponent } from './standard-page/standard-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const dependencies = [
    NavButtonsComponent,
    DynamicSingleSelectComponent,
    Strategy1Component,
    Strategy2Component,
    Strategy3Component,
    InfoButtonComponent,
    HelpBubbleDirective,
    BreadcrumbComponent,
    StandardPageComponent,
    SideBarComponent,
];

@NgModule({
    declarations: [...dependencies],
    providers: [
        DynamicSingleSelectService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicModule,
    ],
    entryComponents: [...dependencies],
    exports: [...dependencies],
})
export class SharedModule { }
