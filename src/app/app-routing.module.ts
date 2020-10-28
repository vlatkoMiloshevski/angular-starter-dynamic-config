import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
    data: { preload: true },
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then(m => m.ReviewModule),
    data: { preload: true },
  }
];

// export const appRoutes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./review/review.module').then(m => m.ReviewModule),
//     data: { preload: true },
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
