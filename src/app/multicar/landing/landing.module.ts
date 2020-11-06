import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreLandingModule } from 'src/app/core/landing/core-landing.module';
import { DynamicModule } from '../../dynamic-module-loader/dynamic.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingComponent } from './landing.component';
import { LandingRoutes } from './landing.routes';
import { LandingService } from './landing.service';


@NgModule({
    declarations: [
        LandingComponent,
    ],
    providers: [LandingService],
    imports: [
        CommonModule,
        CoreLandingModule,
        LandingRoutes,
        DynamicModule,
        SharedModule,
    ],
    entryComponents: [
        LandingComponent,
    ],
})
export class LandingModule { }
