import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponent } from 'src/app/shared/dynamic-module-loader/dynamic.component';
import { ReviewService } from './review.service';

@Component({
  templateUrl: '../../core/review/review.component.html',
})
export class ReviewComponent implements OnInit {
  @Input() data: any;
  dynamicComponentList: DynamicComponent[];
  isContinueDisabled: any = true;

  constructor(
    private reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.dynamicComponentList = this.reviewService.getData();
  }

  outputEvent(event) {
    this.isContinueDisabled = event;
  }

}
