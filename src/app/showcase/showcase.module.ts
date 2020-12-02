import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-smart-popover';
import { SharedModule } from '../shared/shared.module';
import { ShowcaseDetailsAboutYouComponent } from './showcase-details-about-you/showcase-details-about-you.component';
import { ShowcaseYourClaimsComponent } from './showcase-your-claims/showcase-your-claims.component';
import { ShowcaseYourConvictionsComponent } from './showcase-your-convictions/showcase-your-convictions.component';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutes } from './showcase.routes';


@NgModule({
    declarations: [
        ShowcaseComponent,
        ShowcaseYourClaimsComponent,
        ShowcaseDetailsAboutYouComponent,
        ShowcaseYourConvictionsComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        ShowcaseRoutes,
        SharedModule,
        PopoverModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        ShowcaseComponent,
    ],
})
export class ShowcaseModule { }
