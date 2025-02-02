import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{EmployeeListComponent} from "./employee-list/employee-list.component";
import {ViewEmployeeComponent} from "./view-employee/view-employee.component";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent},
  { path: 'viewEmployee/:id', component: ViewEmployeeComponent},
  { path: 'newEmployee', component: NewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
