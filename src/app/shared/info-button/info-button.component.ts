import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { TestModalComponent } from '../modal/test-modal/test-modal.component';

@Component({
    selector: 'app-info-button-component',
    templateUrl: 'info-button.component.html',
})
export class InfoButtonComponent implements OnInit {
    @Input() tooltipText: string;

    constructor(
        private modalService: ModalService,
    ) { }

    ngOnInit() {
    }

    openModal() {
        this.modalService.openModal(TestModalComponent, { isUpdateRequired: true });
    }
}
