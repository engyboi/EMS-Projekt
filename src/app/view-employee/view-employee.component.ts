import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../Employee';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee | null = null;
  errorMessage = '';
  showDeleteModal = false;
  showUpdateModal = false;
  editForm!: FormGroup;
  originalEmployeeData!: Employee;
  currentEmployeeId: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentEmployeeId = params.get('id');
      if (this.currentEmployeeId) {
        this.loadEmployee(this.currentEmployeeId);
      } else {
        this.handleError('Keine richtige Mitarbeiter ID');
      }
    });
    this.initForm()
  }

  private initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      street: new FormControl(''),
      postcode: new FormControl(''),
      city: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  onUpdate() {
    if (this.employee) {
      this.originalEmployeeData = {...this.employee};
      this.editForm.patchValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        street: this.employee.street,
        postcode: this.employee.postcode,
        city: this.employee.city,
        phone: this.employee.phone || ''
      });
      this.showUpdateModal = true;
    }
  }

  confirmUpdate() {
    if (this.currentEmployeeId && this.employee) {
      const formData = this.editForm.value;
      const updatePayload: any = {};

      Object.keys(formData).forEach(key => {
        if (formData[key] !== this.originalEmployeeData [key as keyof Employee]) {
          updatePayload[key] = formData[key];
        }
      });

      if (Object.keys(updatePayload).length > 0) {
        this.http.put(`/backend/${this.currentEmployeeId}`, updatePayload, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).subscribe({
          next: () => {
            this.loadEmployee(this.currentEmployeeId!);
            this.showUpdateModal = false;
          },
          error: (error) => {
            this.handleError('Fehler beim Speichern der Änderungen');
            console.error('Update error: ', error);
          }
        });
      } else {
        this.showUpdateModal = false;
      }
    }
  }

  cancelUpdate() {
    this.showUpdateModal = false;
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
