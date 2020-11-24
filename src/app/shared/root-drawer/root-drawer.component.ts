import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit, Renderer2, TrackByFunction } from '@angular/core';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.reducer';
import { drawerSlide } from '../animations';
import { Drawer } from './drawer.model';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './root-drawer.component.html',
  animations: [drawerSlide],
})
export class RootDrawerComponent implements OnInit, OnDestroy {
  drawers: Array<Drawer> = [];
  overlayActive: boolean = false;
  popupVisible: boolean = false;
  showSaveChangesId: string;
  private closingRoot: boolean = false;
  private unsubscribe: Subject<void> = new Subject();
  public drawer: HTMLElement;
  public clientYMobile: number;
  private clientYDesktop: number;
  private overlay: HTMLElement;

  constructor(
    private renderer: Renderer2,
    private drawerService: DrawerService,
    private redux: NgRedux<IAppState>,
    // private loadingBoxService: LoadingBoxService,
  ) { }

  /**
   * Subscrive to drawer service and watch for drawer updates
   */
  // tslint:disable-next-line:cognitive-complexity
  ngOnInit() {
    // this.redux
    //   .select(s => s.quoteAndListRef.isLoading)
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe(val => {
    //     val ? this.loadingBoxService.showLoader() : this.loadingBoxService.hideLoader();
    //   });

    this.drawerService
      .getDrawers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((drawers: Drawer[]) => {
        this.drawers = drawers;
        if (drawers.length) {
          this.showRootOverlay();
        }
      });

    this.drawerService
      .getPopupVisibility()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isVisible => {
        this.popupVisible = isVisible;
      });

    this.drawerService
      .getActiveDrawerId()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(val => {
        this.showSaveChangesId = val;
      });
  }

  /**
   * Drawer slide animation done event handler
   */
  drawerSlideComplete(): void {
    this.drawerService.drawerAnimationComplete();
    if (!this.drawers.length) {
      this.hideRootOverlay();
      this.removeScrollEvents();
    } else {
      const drawerId = this.drawers[this.drawers.length - 1].id;
      this.drawer = document.getElementById('drawer-content-id-' + drawerId);
      this.overlay = document.getElementById('drawer-overlay');
      this.clientYMobile = 0;
      this.clientYDesktop = 0;
      this.addScrollEvents();
    }
  }

  /**
   * Close drawer
   * @param id: Drawer ID
   * @param forceClose: force close
   */
  closeDrawer(id: string, forceClose?: boolean): void {
    const drawer = this.drawers.find(d => d.id === id);
    this.closingRoot = false;
    if (!forceClose && drawer.saveChangesCheck) {
      this.showSaveChangesId = drawer.id;
      this.drawerService.updatePopupVisibility(true);
    } else {
      this.drawerService.closeDrawer(id);
    }
  }

  /**
   * Close all open drawers before closing root drawer and overlay
   * @param forceClose: force close all drawers
   */
  closeRootDrawer(forceClose?: boolean): void {
    if (this.drawers.some(drawer => drawer.config.updateIsRequired)) {
      return;
    }

    this.closingRoot = true;
    const unsavedDrawers = this.drawers.filter(d => d.saveChangesCheck);
    if (!forceClose && unsavedDrawers.length > 0) {
      this.drawerService.updatePopupVisibility(true);
      this.showSaveChangesId = unsavedDrawers[unsavedDrawers.length - 1].id;
    } else {
      this.drawerService.closeAllDrawers();
      this.closingRoot = false;
    }
  }

  /**
   * Save drawer changes - if true then return to drawer, if false then close drawer without saving changes
   * @param saveChanges: Save changes
   * @param drawerId: Drawer ID
   */
  saveDrawerChanges(saveChanges: boolean, drawerId: string): void {
    saveChanges
      ? this.drawerService.saveDrawer(drawerId)
      : this.closingRoot
        ? this.closeRootDrawer(true)
        : this.closeDrawer(drawerId, true);
  }

  /**
   * On Component Destroy
   */
  ngOnDestroy(): void {
    // in case if error occured while drawer was open
    this.hideRootOverlay();
    this.drawerService.drawerAnimationComplete();
    this.drawerService.closeAllDrawers();
    this.drawerService.drawerAnimationComplete();

    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Show root overlay and disable page scrolling
   */
  private showRootOverlay(): void {
    this.overlayActive = true;
    this.renderer.addClass(document.documentElement, 'no-scroll');
  }

  /**
   * Hide root overlay and enable page scrolling
   */
  private hideRootOverlay(): void {
    this.overlayActive = false;
    this.renderer.removeClass(document.documentElement, 'no-scroll');
  }

  trackDrawer: TrackByFunction<Drawer> = (_, drawer) => drawer.id;

  /**
   * Touch device functionality (iOS devices issue fix)
   */

  private removeScrollEvents() {
    this.overlay.removeEventListener('touchmove', event => this.overlayTouchmove(event));
    this.drawer.removeEventListener('touchstart', event => this.drawerTouchstart(event));
    this.drawer.removeEventListener('touchmove', event => this.drawerTouchmove(event));
  }

  // tslint:disable-next-line:cognitive-complexity
  private addScrollEvents() {
    this.overlay.addEventListener('touchmove', event => this.overlayTouchmove(event));
    this.drawer.addEventListener('touchstart', event => this.drawerTouchstart(event));
    this.drawer.addEventListener('touchmove', event => this.drawerTouchmove(event));
  }

  public overlayTouchmove(event) {
    if (event.targetTouches.length === 1) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public drawerTouchstart(event) {
    if (event.targetTouches.length === 1) {
      this.clientYMobile = event.targetTouches[0].clientY;
    }
  }

  public drawerTouchmove(event) {
    if (event.targetTouches.length !== 1) {
      return;
    }

    const calculatedClientY = event.targetTouches[0].clientY - this.clientYMobile;

    if (this.drawer.scrollTop === 0 && calculatedClientY > 0) {
      event.stopPropagation();
      event.preventDefault();
    }

    const isOverlayTotallyScrolled = this.drawer.scrollHeight - this.drawer.scrollTop <= this.drawer.clientHeight;

    if (isOverlayTotallyScrolled && calculatedClientY < 0) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
