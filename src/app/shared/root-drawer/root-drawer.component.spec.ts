import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Renderer2, Injector, Component, NgModule, DebugElement } from '@angular/core';

import { Drawer } from 'src/app/components/shared/components/drawer/drawer.models';
import { DrawerService } from 'src/app/components/services/drawer.service';
import { RootDrawerComponent } from './root-drawer.component';
import { LoadingBoxComponent } from '@esure-dev/styles';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { WINDOW } from '@esure-dev/utils';

@Component({ template: '' })
class MockDrawerComponent {}

@NgModule({
  declarations: [MockDrawerComponent],
  entryComponents: [MockDrawerComponent],
})
class MockModule {}

// tslint:disable-next-line:no-big-function
describe('RootDrawerComponent', () => {
  let fixture: ComponentFixture<RootDrawerComponent>;
  let component: RootDrawerComponent;
  let debugEl: DebugElement;
  let mockDrawers: Drawer[];
  let drawerService: DrawerService;
  const mockGetDrawersObservable$: Subject<Drawer[]> = new Subject();
  const mockGetPopupVisibility$: Subject<boolean> = new Subject();
  const mockGetActiveDrawerId$: Subject<string> = new Subject();
  const mockWindow = { esureDataLayer: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule, NoopAnimationsModule, NgReduxTestingModule],
      declarations: [RootDrawerComponent, LoadingBoxComponent],
      providers: [Injector, Renderer2, DrawerService, { provide: WINDOW, useValue: mockWindow }],
    });

    MockNgRedux.reset();

    drawerService = TestBed.inject(DrawerService);
    fixture = TestBed.createComponent(RootDrawerComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    mockDrawers = [
      {
        id: 'drawer-1',
        component: <any>MockDrawerComponent,
        saveChangesCheck: false,
        injector: null,
        config: { id: '1', data: 'test', updateIsRequired: false },
      },
      {
        id: 'drawer-2',
        component: <any>MockDrawerComponent,
        saveChangesCheck: false,
        injector: null,
        config: { id: '1', data: 'test', updateIsRequired: false },
      },
    ];

    spyOn(drawerService, 'getDrawers').and.returnValue(mockGetDrawersObservable$.asObservable());
    spyOn(drawerService, 'getPopupVisibility').and.returnValue(mockGetPopupVisibility$.asObservable());
    spyOn(drawerService, 'getActiveDrawerId').and.returnValue(mockGetActiveDrawerId$.asObservable());
    spyOn(drawerService, 'closeDrawer').and.callFake((id: string) => {
      const drws = [...component.drawers];
      drws.pop();
      component.showSaveChangesId = id;
      mockGetDrawersObservable$.next(drws);
    });
    spyOn(drawerService, 'closeAllDrawers').and.callFake(() => {
      component.showSaveChangesId = mockDrawers[1].id;
      mockGetDrawersObservable$.next([]);
    });

    fixture.detectChanges();
  });

  afterAll(() => {
    // close overlay to re-enable scrolling in test debug window
    component['hideRootOverlay']();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to drawer service and overlay remains hidden for 0 drawers', () => {
    expect(component.overlayActive).toBeFalsy();
    expect(component.drawers.length).toEqual(0);
  });

  it('should display 1 drawer', () => {
    mockGetDrawersObservable$.next([mockDrawers[0]]);
    fixture.detectChanges();
    expect(component.overlayActive).toBeTruthy();
    expect(component.drawers.length).toEqual(1);
  });

  it('should display 2 drawers', () => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    expect(component.overlayActive).toBeTruthy();
    expect(component.drawers.length).toEqual(2);
  });

  it('should close drawer', fakeAsync(() => {
    mockGetDrawersObservable$.next([mockDrawers[0]]);
    fixture.detectChanges();
    tick(500);

    component.closeDrawer(mockDrawers[0].id);
    fixture.detectChanges();
    tick(500);

    expect(component.overlayActive).toBeFalsy();
    expect(component.drawers.length).toEqual(0);
  }));

  it('should close all drawers', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    tick(500);

    component.closeRootDrawer();
    fixture.detectChanges();
    tick(500);

    expect(component.overlayActive).toBeFalsy();
    expect(component.drawers.length).toEqual(0);
  }));

  it('should force close drawer', fakeAsync(() => {
    mockGetDrawersObservable$.next([mockDrawers[0]]);
    fixture.detectChanges();
    tick(500);

    mockDrawers[0].saveChangesCheck = true;
    component.closeDrawer(mockDrawers[0].id, true);
    fixture.detectChanges();
    tick(500);

    expect(component.overlayActive).toBeFalsy();
    expect(component.drawers.length).toEqual(0);
  }));

  it('should force close all drawers', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    tick(500);

    mockDrawers[1].saveChangesCheck = true;
    component.closeRootDrawer(true);
    fixture.detectChanges();
    tick(500);

    expect(component.overlayActive).toBeFalsy();
    expect(component.drawers.length).toEqual(0);
  }));

  it('should show save changes modal on drawer close when drawer contains unsaved changes', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    mockGetPopupVisibility$.next(true);
    fixture.detectChanges();
    tick(500);

    component.closeDrawer(mockDrawers[1].id);
    fixture.detectChanges();

    expect(component.popupVisible).toBeTruthy();
    expect(component.showSaveChangesId).toEqual(mockDrawers[1].id);
  }));

  it('should show save changes modal on root drawer close if any drawer contains unsaved changes', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    mockGetPopupVisibility$.next(true);
    fixture.detectChanges();
    tick(500);

    component.closeRootDrawer();
    fixture.detectChanges();

    expect(component.popupVisible).toBeTruthy();
    expect(component.showSaveChangesId).toEqual(mockDrawers[1].id);
  }));

  it('should close save changes modal and drawer when no selected', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    tick(500);

    mockDrawers[1].saveChangesCheck = true;
    component.closeDrawer(mockDrawers[1].id);
    fixture.detectChanges();

    const saveChangesNoBtn: HTMLButtonElement = debugEl.query(By.css('.drawer-save .confirm button:first-of-type'))
      .nativeElement;
    saveChangesNoBtn.click();

    expect(component.drawers.length).toEqual(1);
  }));

  it('should close save changes modal and all drawers when closeRootDrawer and no selected', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    tick(500);

    mockDrawers[1].saveChangesCheck = true;
    component.closeRootDrawer();
    fixture.detectChanges();

    const saveChangesNoBtn: HTMLButtonElement = debugEl.query(By.css('.drawer-save .confirm button:first-of-type'))
      .nativeElement;
    saveChangesNoBtn.click();

    expect(component.drawers.length).toEqual(0);
  }));

  it('should close save changes modal and attempt to save open drawer changes', fakeAsync(() => {
    mockGetDrawersObservable$.next(mockDrawers);
    fixture.detectChanges();
    tick(500);

    mockDrawers[1].saveChangesCheck = true;
    component.closeDrawer(mockDrawers[1].id);
    fixture.detectChanges();

    spyOn(drawerService, 'saveDrawer');
    const saveChangesYesBtn: HTMLButtonElement = debugEl.query(By.css('.drawer-save .confirm button:last-of-type'))
      .nativeElement;
    saveChangesYesBtn.click();

    expect(component.drawers.length).toEqual(2);
  }));

  it('should call stopPropagation and preventDefault', () => {
    const event = {
      targetTouches: [1],
      stopPropagation: () => {},
      preventDefault: () => {},
    };

    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');

    component.overlayTouchmove(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should set the clientYMobile to clientY from event', () => {
    const event = {
      targetTouches: [
        {
          clientX: 1,
          clientY: 2,
        },
      ],
      stopPropagation: () => {},
      preventDefault: () => {},
    };

    component.drawerTouchstart(event);

    expect(component.clientYMobile).toEqual(event.targetTouches[0].clientY);
  });

  it('should call stopPropagation and preventDefault', () => {
    const el = document.createElement('div') as HTMLDivElement;
    component.drawer = el;
    component.drawer.scrollTop = 0;
    component.clientYMobile = -1;
    const event = {
      targetTouches: [
        {
          clientX: 1,
          clientY: 2,
        },
      ],
      stopPropagation: () => {},
      preventDefault: () => {},
    };

    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');

    component.drawerTouchmove(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call stopPropagation and preventDefault', () => {
    const el = document.createElement('div') as HTMLDivElement;
    component.drawer = el;
    component.drawer.scrollTop = 0;
    component.clientYMobile = 3;
    const event = {
      targetTouches: [
        {
          clientX: 1,
          clientY: 2,
        },
      ],
      stopPropagation: () => {},
      preventDefault: () => {},
    };

    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');

    component.drawerTouchmove(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
