import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalModel } from './modal.data';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-root-modal',
  templateUrl: 'root-modal.component.html',
})
export class RootModalComponent implements OnInit, OnDestroy {
  modal: ModalModel;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.modalService
      .getModal()
      .subscribe(
        activeModal => this.modal = activeModal,
      );
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
