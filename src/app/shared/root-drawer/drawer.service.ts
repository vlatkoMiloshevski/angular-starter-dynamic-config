import { Injectable, Type, Injector } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { journeyActions } from 'src/app/store/store.actions';
import { IAppState } from 'src/app/store/store.reducer';
import { getJourneyIsLoading } from 'src/app/store/store.selectors';
import { Drawer, DrawerConfig } from './drawer.model';


@Injectable({
    providedIn: 'root',
})
export class DrawerService {
    private isBusy: boolean = false;
    private isLoading: boolean = false;
    private _drawers: Array<Drawer> = [];
    private drawersSubject: Subject<Drawer[]> = new Subject<Drawer[]>();
    private saveDrawerSubject: Subject<string> = new Subject<string>();
    private popupVisibilitySubject = new Subject<boolean>();
    private activeDrawerIdSubject = new Subject<string>();
    public isLoading$ = new Observable<boolean>();
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(private redux: NgRedux<IAppState>, private injector: Injector, 
        // protected dlSvc?: DataLayerService,
        ) { }

    /**
     * Get is open popup observable
     * @return boolean as an observable
     */
    getPopupVisibility(): Observable<boolean> {
        return this.popupVisibilitySubject.asObservable();
    }

    /**
     * Get active drawer id observable
     * @return drawer id as an observable
     */
    getActiveDrawerId(): Observable<string> {
        return this.activeDrawerIdSubject.asObservable();
    }

    /**
     * Update the popup visibility
     */
    updatePopupVisibility(visible: boolean) {
        this.popupVisibilitySubject.next(visible);
    }

    /**
     * Update the active drawer id
     */
    updateActiveDrawerId(id: string) {
        this.activeDrawerIdSubject.next(id);
    }

    /**
     * Get open drawers observable
     * @return drawer array as an observable
     */
    getDrawers(): Observable<Drawer[]> {
        return this.drawersSubject.asObservable();
    }

    /**
     * Save Drawer Observable - Subscribed to by all drawers. Informs drawer if submit
     */
    getDrawerSaveObservable(): Observable<string> {
        return this.saveDrawerSubject.asObservable();
    }

    /**
     * Add new drawer to open drawers arr - root-drawer.component will render drawer components updated here
     * @param component: Component type to open in new drawer
     * @param initialPanel: Initial panel
     * @param config: Drawer config
     */
    openDrawer(component: Type<any>, initialPanel?: number | string, config: DrawerConfig = {}): void {
        this.isLoading$ = this.redux.select(getJourneyIsLoading).pipe(takeUntil(this.unsubscribe));
        this.isLoading$.subscribe(val => {
            this.isLoading = val;
        });

        if ((this.isBusy || !component) || this.isLoading) {
            return;
        }

        // drawer setup - assign id, create config injector
        this.isBusy = true;
        const drawerId = `drawer-${this._drawers.length + 1}`;
        config.id = drawerId;
        const newDrawer: Drawer = {
            id: drawerId,
            component: component,
            config: config,
            saveChangesCheck: false,
            injector: Injector.create({
                providers: [{ provide: DrawerConfig, useValue: config }],
                parent: this.injector,
            }),
        };

        this._drawers.push(newDrawer);
        this.redux.dispatch({
            type: journeyActions.JOURNEY_SET_DRAWER_VIEW,
            view: {
                id: drawerId,
                metadata: {
                    initialPanel: initialPanel,
                },
            },
        });
        // if (this.dlSvc && config.ensPageName) {
        //     this.setPageName(config.ensPageName);
        // }
        this.drawersSubject.next(this._drawers);
    }

    /**
     * Drawer animation complete
     */
    drawerAnimationComplete(): void {
        this.isBusy = false;
    }

    /**
     * Close Drawer
     * @param id: ID of existing drawer to close
     */
    closeDrawer(id: string): void {
        if (this.isBusy || !id) {
            return;
        }

        this.isBusy = true;
        const i = this._drawers.findIndex(d => d.id === id);
        const parent = this._drawers[i - 1];
        const view = parent ? { id: parent.id } : {};

        this._drawers.splice(i, 1);
        this._drawers.length
            ? this.redux.dispatch({
                type: journeyActions.JOURNEY_SET_DRAWER_VIEW,
                view: view,
            })
            : this.closeAllDrawersActions();
        this.updatePopupVisibility(false);
        this.drawersSubject.next(this._drawers);
    }

    /**
     * Close all open drawers
     */
    closeAllDrawers(): void {
        if (this.isBusy) {
            return;
        }

        this.isBusy = true;
        this._drawers = [];
        this.closeAllDrawersActions();
        this.updatePopupVisibility(false);
        this.drawersSubject.next(this._drawers);
    }

    /**
     * Update Save Drawer Subject with drawer ID requested to be saved
     * @param drawerId: Drawer ID
     */
    saveDrawer(drawerId: string): void {
        this.saveDrawerSubject.next(drawerId);
    }

    /**
     * Set drawer saveChangesCheck to true (displays save changes modal on drawer close)
     * @param id: Drawer ID
     */
    setDrawerDirty(id: string) {
        const drawer = this._drawers.find(d => d.id === id);
        if (drawer) {
            drawer.saveChangesCheck = true;
        }
        this.drawersSubject.next(this._drawers);
    }

    /**
     * Set drawer saveChangesCheck to true (displays save changes modal on drawer close)
     * @param id: Drawer ID
     */
    markDrawerAsPristine(id: string) {
        const drawer = this._drawers.find(d => d.id === id);
        if (drawer) {
            drawer.saveChangesCheck = false;
        }
        this.drawersSubject.next(this._drawers);
    }

    private closeAllDrawersActions = () => {
        this.redux.dispatch({ type: journeyActions.JOURNEY_CLEAR_DRAWER_VIEW });
        // this.redux.dispatch(clearDrawerData());
    }

    // private setPageName(pageName: string) {
    //     setTimeout(() => {
    //         this.redux.dispatch({ type: journeyActions.JOURNEY_SET_PAGE, page: pageName });
    //     });
    // }
}
