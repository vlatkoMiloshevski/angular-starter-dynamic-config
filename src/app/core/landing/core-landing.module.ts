import { NgModule } from '@angular/core';
import { KeepingYouInformedComponent } from 'src/app/core/landing/keeping-you-informed/keeping-you-informed.component';
import { QuickCheckComponent } from 'src/app/core/landing/quick-check/quick-check.component';
import { WhatsCoveredComponent } from 'src/app/core/landing/whats-covered/whats-covered.component';
import { DynamicModule } from 'src/app/dynamic-module-loader/dynamic.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
    providers: [],
    imports: [
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
})
export class CoreLandingModule { }
