import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment.component';
import { PaymentRoutes } from './payment.routes';


@NgModule({
    declarations: [
        PaymentComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        PaymentRoutes,
        SharedModule,
    ],
    entryComponents: [
        PaymentComponent,
    ],
})
export class PaymentModule { }
