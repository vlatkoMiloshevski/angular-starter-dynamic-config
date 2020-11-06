import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  insuranceType: string;
  constructor() { }

  ngOnInit() {
    this.insuranceType = window.sessionStorage.getItem('insuranceType');
  }
}
