import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicModule } from '../dynamic-module-loader/dynamic.module';
import { SharedModule } from '../shared/shared.module';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutes } from './showcase.routes';
import { PopoverModule } from 'ngx-smart-popover';
import { YourClaimsComponent } from '../core/your-claims/your-claims.component';
import { DetailsAboutYouComponent } from '../core/details-about-you/details-about-you.component';


@NgModule({
    declarations: [
        ShowcaseComponent,
        YourClaimsComponent,
        DetailsAboutYouComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        ShowcaseRoutes,
        DynamicModule,
        SharedModule,
        PopoverModule,
    ],
    entryComponents: [
        ShowcaseComponent,
    ],
})
export class ShowcaseModule { }
