import {Component} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Employee} from "../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent {

  private employeesData$ = new BehaviorSubject<Employee[]>([]);
  filteredEmployees$: Observable<Employee[]>
  searchTerm: string = "";
  private searchTerm$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient, private router: Router) {
    this.fetchData();

    this.filteredEmployees$ = combineLatest([
      this.employeesData$,
      this.searchTerm$.pipe(
        map(term => term.trim().toLowerCase())
      )
    ]).pipe(
      map(([employees, term]) => {
        if (!term) return employees;
        return employees.filter(employee =>
          Object.values(employee).some(value =>
            String(value).toLowerCase().includes(term)
          )
        );
      })
    );
  }

  fetchData() {
    this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(data => this.employeesData$.next(data));
  }

  onSearchInput() {
    this.searchTerm$.next(this.searchTerm);
  }

  navigateToView(employeeId: number | undefined) {
    this.router.navigate(['/viewEmployee', employeeId]);
  }

  navigateToNewEmployee() {
    this.router.navigate(['/newEmployee']);
  }
}
