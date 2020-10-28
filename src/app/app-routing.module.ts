import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationService } from './shared/navigation.service';

const navigationService = new NavigationService();
export const appRoutes: Routes = navigationService.getRoutes();

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
