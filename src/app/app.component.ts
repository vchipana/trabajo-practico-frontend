import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Person } from './interfaces/persona.interface';
import { PersonFormComponent } from './components/person-form/person-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trabajo-practico-frontend';
  
  constructor(private dialog: MatDialog) { }
  
  showPersonForm(person?: Person) {
    this.dialog.open(PersonFormComponent, {
      width: 'auto',
      maxHeight: '80vh',
      data: person
    });
  }
  
  onEditPerson(person: Person) {
    this.showPersonForm(person)
  }
}
