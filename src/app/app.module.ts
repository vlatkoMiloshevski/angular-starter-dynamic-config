import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicLoaderComponent } from './dynamic-module-loader/dynamic-loader.component';
import { DynamicDirective } from './dynamic-module-loader/dynamic.directive';
import { LandingComponent } from './landing/landing.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    NavButtonsComponent,
    DynamicLoaderComponent,
    DynamicDirective,
    LandingComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
