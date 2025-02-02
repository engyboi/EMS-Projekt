import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    });
  }
}
