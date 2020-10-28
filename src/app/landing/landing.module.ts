import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { LandingRoutes } from './landing.routes';
import { LandingService } from './landing.service';
import { QuickCheckComponent } from './quick-check/quick-check.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';


@NgModule({
    declarations: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
    providers: [LandingService],
    imports: [
        CommonModule,
        LandingRoutes,
    ],
    entryComponents: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
})
export class LandingModule { }
