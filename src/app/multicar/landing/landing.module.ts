import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { LandingComponent } from './landing.component';
import { LandingRoutes } from './landing.routes';
import { LandingService } from './landing.service';
import { QuickCheckComponent } from './quick-check/quick-check.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';
import { DynamicModule } from '../../dynamic-module-loader/dynamic.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
        LandingComponent,
    ],
    providers: [LandingService],
    imports: [
        CommonModule,
        LandingRoutes,
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
        LandingComponent,
    ],
})
export class LandingModule { }
