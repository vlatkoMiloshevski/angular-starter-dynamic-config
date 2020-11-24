import { Injectable, Injector, Type } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalComponent } from './modal.component';
import { ModalModel, ModalData, ModalConfig } from './modal.data';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalSubject: Subject<ModalModel> = new Subject<ModalModel>();
    public activeModal: ModalModel;

    constructor(
        private injector: Injector,
    ) {
        this.activeModal = null;
    }

    openModal(component: Type<ModalComponent>, data: ModalData = null): void {
        this.activeModal = {
            component,
            data,
            injector: Injector.create({
                providers: [{ provide: ModalConfig, useValue: data }],
                parent: this.injector,
            }),
        };

        this.modalSubject.next(this.activeModal);
    }

    getModal(): Observable<ModalModel> {
        return this.modalSubject.asObservable();
    }

    closeModal(): void {
        if (this.isUpdateRequired()) {
            return;
        }
        this.dismissModal();
    }

    dismissModal(): void {
        this.modalSubject.next(this.activeModal = null);
    }

    isUpdateRequired() {
        return this.activeModal.data && this.activeModal.data.isUpdateRequired;
    }
}
