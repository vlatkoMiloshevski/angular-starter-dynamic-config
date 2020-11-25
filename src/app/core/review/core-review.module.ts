import { NgModule } from '@angular/core';
import { AboutYouComponent } from 'src/app/core/review/about-you/about-you.component';
import { YourCarComponent } from 'src/app/core/review/your-car/your-car.component';
import { DynamicModule } from 'src/app/dynamic-module-loader/dynamic.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { YourCarService } from './your-car/your-car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AboutYouComponent,
        YourCarComponent,
    ],
    providers: [YourCarService],
    imports: [
        DynamicModule,
        SharedModule,
        CommonModule,
    ],
    entryComponents: [
        AboutYouComponent,
        YourCarComponent,
    ],
})
export class CoreReviewModule { }
