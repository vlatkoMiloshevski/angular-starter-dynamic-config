import { NgRedux } from '@angular-redux/store';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/store.reducer';
import { DrawerConfig } from './drawer.model';
import { DrawerService } from './drawer.service';

export abstract class DrawerComponent implements OnDestroy {
    protected id: string;
    protected unsavedChanges: boolean = false;
    protected saveDrawerSubscription: Subscription;
    protected getQuoteSubscription: Subscription;
    public quoteId: string;
    public version: number;
    public submitting = false;

    constructor(
        protected config: DrawerConfig,
        protected drawerService: DrawerService,
        protected redux?: NgRedux<IAppState>,
    ) {
        this.id = this.config ? this.config.id : null;
        this.saveDrawerSubscription = this.drawerService
            .getDrawerSaveObservable()
            .subscribe(drawerId => {
                if (this.id === drawerId) {
                    this.submitDrawerData();
                }
            });

    }

    /**
     * Call drawerService to close self
     */
    closeDrawer(dirty = false): void {
        if (dirty) {
            this.drawerService.updateActiveDrawerId(this.id);
            this.drawerService.updatePopupVisibility(true);
        } else {
            this.submitting = false;
            this.drawerService.closeDrawer(this.id);
        }
    }

    /**
     * Set drawer saveChangesCheck to true - this will prompt user if drawer is closed with unsaved changes
     */
    setDrawerDirty(): void {
        this.drawerService.setDrawerDirty(this.id);
    }

    markDrawerAsPristine(): void {
        this.drawerService.markDrawerAsPristine(this.id);
    }

    /**
     * On destroy unsubscribe to active subscriptions
     */
    ngOnDestroy() {
        if (this.saveDrawerSubscription) {
            this.saveDrawerSubscription.unsubscribe();
        }
        if (this.getQuoteSubscription) {
            this.getQuoteSubscription.unsubscribe();
        }
    }

    /**
     * Override in child drawer class when drawer contains form/data that needs saving
     */
    submitDrawerData() { }

}
