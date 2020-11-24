
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../modal.component';
import { ModalService } from '../modal.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store/app.store';

@Component({
    selector: 'app-test-modal',
    templateUrl: './test-modal.component.html',
})

export class TestModalComponent extends ModalComponent implements OnDestroy {
    public unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public redux: NgRedux<IAppState>,
        public modalService: ModalService,
    ) {
        super();
    }

    dismissModal() {
        this.modalService.dismissModal();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
