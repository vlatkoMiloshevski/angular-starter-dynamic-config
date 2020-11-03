import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicModule } from '../../dynamic-module-loader/dynamic.module';
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
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        PaymentComponent,
    ],
})
export class PaymentModule { }
