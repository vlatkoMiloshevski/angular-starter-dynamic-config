import { NgModule } from '@angular/core';
import { AboutYouComponent } from 'src/app/core/review/about-you/about-you.component';
import { FeesAndCancelationComponent } from 'src/app/core/review/fees-and-cancelation/fees-and-cancelation.component';
import { YourCarComponent } from 'src/app/core/review/your-car/your-car.component';
import { DynamicModule } from 'src/app/dynamic-module-loader/dynamic.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        FeesAndCancelationComponent,
        AboutYouComponent,
        YourCarComponent,
    ],
    providers: [],
    imports: [
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        FeesAndCancelationComponent,
        AboutYouComponent,
        YourCarComponent,
    ],
})
export class CoreReviewModule { }
