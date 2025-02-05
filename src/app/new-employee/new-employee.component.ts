import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent {
  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    street: '',
    postcode: ''
  };

  showError: Boolean = false;
  falsePLZ: Boolean = false;

  constructor(private router: Router, private http: HttpClient) {
  }

  onSubmit() {
    const employeeData = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      phone: this.formData.phone,
      city: this.formData.city,
      street: this.formData.street,
      postcode: this.formData.postcode
    };

    if (employeeData.firstName == '' || employeeData.lastName == '' || employeeData.phone == '' || employeeData.city == '' || employeeData.postcode == '' || employeeData.street == '') {
      this.showError = true;

    } else if (employeeData.postcode.length < 5) {
      this.falsePLZ = true;

    } else {
      console.log('Gespeicherte Daten:', employeeData);
      this.http.post('http://localhost:8089/employees', employeeData)
        .subscribe({
          next: (response) => {
            console.log('Gespeicherte Daten:', response);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Fehler beim Speichern des Mitarbeiters:', error)
          }
        });
    }

  }

  onCancel() {
    this.router.navigate(['/']);
  }

  falsePLZOff() {
    this.falsePLZ = false;
  }

  showErrorOff() {
    this.showError = false;
  }
}
