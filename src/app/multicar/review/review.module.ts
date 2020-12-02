import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreReviewModule } from 'src/app/core/review/core-review.module';
import { SharedModule } from '../../shared/shared.module';
import { ReviewComponent } from './review.component';
import { ReviewRoutes } from './review.routes';
import { ReviewService } from './review.service';


@NgModule({
    declarations: [
        ReviewComponent,
    ],
    providers: [ReviewService],
    imports: [
        CommonModule,
        CoreReviewModule,
        ReviewRoutes,
        SharedModule,
    ],
    entryComponents: [
        ReviewComponent,
    ],
})
export class ReviewModule { }
