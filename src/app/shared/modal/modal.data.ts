import { ModalComponent } from './modal.component';
import { Type, Injector } from '@angular/core';

export class ModalModel {
    component: Type<ModalComponent>;
    injector?: Injector;
    data: ModalData;
}

export class ModalData {
    isUpdateRequired?: boolean;
    additionalData?: any;
    isClosedOnResize?: boolean;
}

export class ModalConfig {
    id?: string;
    data?: any;
    ensPageName?: string;
    updateIsRequired?: boolean;
}
