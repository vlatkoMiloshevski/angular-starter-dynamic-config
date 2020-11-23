import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    routes: string[];
    currentIndex: number;
    activeRoute: string;
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.routes = this.router.config.filter(x => x.data.isNavIncluded).map(x => x.data.name);
        this.currentIndex = this.router.config.findIndex(route => `/${route.path}` === this.router.url);
        this.activeRoute = this.router.config.find(route => `/${route.path}` === this.router.url).data.name;
    }
}
