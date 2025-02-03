import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee | null = null;
  errorMessage = '';
  showDeleteModal = false;
  currentEmployeeId: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentEmployeeId = params.get('id');
      if (this.currentEmployeeId) {
        this.loadEmployee(this.currentEmployeeId);
      } else {
        this.handleError('Keine richtige Mitarbeiter ID');
      }
    });
  }

  onDelete() {
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.currentEmployeeId) {
      this.http.delete(`/backend/${this.currentEmployeeId}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe({
        next: () => {
          this.router.navigate(['/employee']);
        },
        error: (err) => {
          this.handleError('Fehler beim Löschen des Mitarbeiters aufgetreten');
          console.error('Fehler beim Löschen:', err);
          this.showDeleteModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }

  protected loadEmployee(id: string): void {
    this.http.get<Employee>(`/backend/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        this.handleError('Fehler beim Laden der Mitarbeiterdaten');
        console.error('API Fehler:', err);
      }
    });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.employee = null;
  }
}
