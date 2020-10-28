import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentComponent,
        data: { browserTitle: 'Quote Summary' },
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentRoutes { }
