import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    postalCode: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Gespeicherte Daten:', this.formData);
    this.router.navigate(['/']); // Zurück zur Startseite
  }

  onCancel() {
    this.router.navigate(['/']); // Zurück zur Startseite
  }
}
