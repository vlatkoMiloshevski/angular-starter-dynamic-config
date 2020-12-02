import { Component, Input, OnInit, Type } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { InfoModalComponent } from '../modal/info-modal/info-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-info-button-component',
    templateUrl: 'info-button.component.html',
})
export class InfoButtonComponent implements OnInit {
    @Input() tooltipText: string;
    @Input() modalComponent: Type<ModalComponent>;

    constructor(
        private modalService: ModalService,
    ) { }

    ngOnInit() {
    }

    openModal() {
        this.modalService.openModal(this.modalComponent, { isClosedOnResize: true });
    }
}
