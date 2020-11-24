import { Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.modalService
      .getModal()
      .subscribe(activeModal => {
        this.modal = activeModal;
        if (this.modal) {
          this.renderer.addClass(document.documentElement, 'no-scroll');
        } else {
          this.renderer.removeClass(document.documentElement, 'no-scroll');
        }
      });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  @HostListener('window:resize', ['$event']) clickout() {
    if (!(this.modal && this.modal.data)) {
      return;
    }
    if (this.modal.data.isClosedOnResize) {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
