import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent {
  // Datenmodell für den Mitarbeiter
  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    street: '',
    postcode: ''
  };


  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const employeeData = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      phone: this.formData.phone,
      city: this.formData.city,
      street: this.formData.street,
      postcode: this.formData.postcode
    };

    console.log('Gespeicherte Daten:', employeeData);
    this.http.post('/employees', employeeData) //TODO URL funktioniert noch nicht
      .subscribe({
        next: (response) => {
          console.log('Gespeicherte Daten:', response);
          this.router.navigate(['/']); // Zurück zur Startseite
        },
        error: (error) => {
          console.error('Fehler beim Speichern des Mitarbeiters:', error)
        }
      });
  }

  onCancel() {
    this.router.navigate(['/']); // Zurück zur Startseite
  }
}
