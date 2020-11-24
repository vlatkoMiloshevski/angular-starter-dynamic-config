import { Type, Injector } from '@angular/core';
import { DrawerComponent } from './drawer.component';

export interface Drawer {
  id: string;
  component: Type<DrawerComponent>;
  saveChangesCheck: boolean;
  config?: DrawerConfig;
  injector?: Injector;
}

export class DrawerConfig {
  id?: string;
  data?: any;
  ensPageName?: string;
  updateIsRequired?: boolean;
}
