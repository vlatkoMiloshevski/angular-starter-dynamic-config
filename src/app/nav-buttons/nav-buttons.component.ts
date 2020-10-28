import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { appRoutes } from '../app-routing.module';

@Component({
    selector: 'app-nav-buttons',
    templateUrl: './nav-buttons.component.html',
})
export class NavButtonsComponent implements OnInit {
    nextState: Route;
    prevState: Route;

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        const currentIndex = appRoutes.findIndex(route => `/${route.path}` === this.router.url);
        this.nextState = appRoutes[currentIndex + 1];
        this.prevState = appRoutes[currentIndex - 1];
    }

    goBack() {
        return this.router.navigateByUrl(this.prevState.path);
    }

    goNext() {
        return this.router.navigateByUrl(this.nextState.path);
    }
}