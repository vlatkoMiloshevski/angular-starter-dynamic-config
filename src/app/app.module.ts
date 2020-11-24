import { NgReduxRouterModule } from '@angular-redux/router';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { store } from './store/app.store';
import { IAppState } from './store/store.actions';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgReduxModule,
    NgReduxRouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  entryComponents: [
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
  constructor(redux: NgRedux<IAppState>) {
    redux.provideStore(store);
  }
}

