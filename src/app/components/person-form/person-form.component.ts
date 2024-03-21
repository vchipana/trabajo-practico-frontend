import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PersonService } from '../../services/person.service';
import { Person } from '../../interfaces/persona.interface';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  personForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonFormComponent>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public person: Person) {
    
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    if(this.person) {
      this.setDefultForm();
    }
  }
  
  setDefultForm() {
    this.personForm.patchValue({
      name: this.person.name,
      lastName: this.person.lastName,
      secondLastName: this.person.secondLastName,
      dni: this.person.dni,
      email: this.person.email,
      age: this.person.age,
    });
  }

  onSave() {
    if (this.personForm.valid) {
      const person = {
        id: new Date().getTime(),
        name: this.personForm.get('name')?.value,
        lastName: this.personForm.get('lastName')?.value,
        secondLastName: this.personForm.get('secondLastName')?.value,
        email: this.personForm.get('email')?.value,
        dni: this.personForm.get('dni')?.value,
        age: this.personForm.get('age')?.value,
      };
      
      this.personService.savePerson(person).subscribe(() => {
          this.dialogRef.close();
          this.personService.updatedPersons.next(null);
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  onUpdate() {
    if (this.personForm.valid) {
      const person = {
        id: this.person.id,
        name: this.personForm.get('name')?.value,
        lastName: this.personForm.get('lastName')?.value,
        secondLastName: this.personForm.get('secondLastName')?.value,
        email: this.personForm.get('email')?.value,
        dni: this.personForm.get('dni')?.value,
        age: this.personForm.get('age')?.value,
      };
      
      this.personService.updatePerson(person).subscribe(() => {
          this.dialogRef.close();
          this.personService.updatedPersons.next(null);
      });
    } else {
      console.error('Formulario inválido');
    }
  }

}