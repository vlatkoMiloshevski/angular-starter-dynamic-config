import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponent } from '../../dynamic-module-loader/dynamic.component';
import { LandingService } from '../../home/landing/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: '../../core/landing/landing.component.html',
})
export class LandingComponent implements OnInit {
  @Input() data: any;
  dynamicComponentList: DynamicComponent[];

  constructor(
    private landingService: LandingService,
  ) { }

  ngOnInit() {
    this.dynamicComponentList = this.landingService.getData();
  }
}
