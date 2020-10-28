import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReviewRoutes } from './review.routes';
import { ReviewService } from './review.service';
import { AboutYouComponent } from './about-you/about-you.component';
import { ReviewComponent } from './review.component';
import { DynamicModule } from '../dynamic-module-loader/dynamic.module';
import { SharedModule } from '../shared/shared.module';
import { YourCarComponent } from './your-car/your-carcomponent';
import { FeesAndCancelationComponent } from './fees-and-cancelation/fees-and-cancelation.component';


@NgModule({
    declarations: [
        FeesAndCancelationComponent,
        AboutYouComponent,
        YourCarComponent,
        ReviewComponent,
    ],
    providers: [ReviewService],
    imports: [
        CommonModule,
        ReviewRoutes,
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        FeesAndCancelationComponent,
        AboutYouComponent,
        YourCarComponent,
        ReviewComponent,
    ],
})
export class ReviewModule { }
