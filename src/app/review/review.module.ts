import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { ReviewRoutes } from './review.routes';
import { ReviewService } from './review.service';
import { QuickCheckComponent } from './quick-check/quick-check.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';


@NgModule({
    declarations: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
    providers: [ReviewService],
    imports: [
        CommonModule,
        ReviewRoutes,
    ],
    entryComponents: [
        WhatsCoveredComponent,
        KeepingYouInformedComponent,
        QuickCheckComponent,
    ],
})
export class ReviewModule { }
