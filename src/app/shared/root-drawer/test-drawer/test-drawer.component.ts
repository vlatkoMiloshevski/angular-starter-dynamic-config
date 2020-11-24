import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/store.reducer';
import { DrawerComponent } from '../drawer.component';
import { DrawerConfig } from '../drawer.model';
import { DrawerService } from '../drawer.service';


@Component({
    templateUrl: './test-drawer.component.html',
})
export class TestDrawerComponent extends DrawerComponent implements OnInit {

    public customerServicePhone: string;
    public customerServicePhoneLink: string;
    public submitting: boolean;

    constructor(
        config: DrawerConfig,
        drawerService: DrawerService,
        redux: NgRedux<IAppState>,
    ) {
        super(config, drawerService, redux);
    }

    ngOnInit() {

    }

    dismissDrawer() {
        this.closeDrawer();
    }

}
