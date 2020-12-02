import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicSingleSelectComponent } from './dynamic-single-select/dynamic-single-select.component';
import { DynamicSingleSelectService } from './dynamic-single-select/dynamic-single-select.service';
import { SelectOptionStrategyComponent } from './dynamic-single-select/strategy/select-option-stategy.component';
import { RadioButtonStrategyComponent } from './dynamic-single-select/strategy/radio-button-strategy.component';
import { ButtonFieldStrategyComponent } from './dynamic-single-select/strategy/button-field-strategy.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { HelpBubbleDirective } from './help-bubbles/help-bubble.directive';
import { InfoButtonComponent } from './info-button/info-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StandardPageComponent } from './standard-page/standard-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RootModalComponent } from './modal/root-modal.component';
import { ModalService } from './modal/modal.service';
import { RootDrawerComponent } from './root-drawer/root-drawer.component';
import { PreviewChangeComponent } from './preview-change/preview-change.component';
import { DynamicLoaderComponent } from './dynamic-module-loader/dynamic-loader.component';
import { DynamicDirective } from './dynamic-module-loader/dynamic.directive';

const dependencies = [
    NavButtonsComponent,
    DynamicSingleSelectComponent,
    SelectOptionStrategyComponent,
    RadioButtonStrategyComponent,
    ButtonFieldStrategyComponent,
    InfoButtonComponent,
    HelpBubbleDirective,
    BreadcrumbComponent,
    StandardPageComponent,
    SideBarComponent,
    RootModalComponent,
    RootDrawerComponent,
    PreviewChangeComponent,
    DynamicLoaderComponent,
    DynamicDirective,
];

@NgModule({
    declarations: [...dependencies],
    providers: [
        DynamicSingleSelectService,
        ModalService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [...dependencies],
    exports: [...dependencies],
})
export class SharedModule { }
