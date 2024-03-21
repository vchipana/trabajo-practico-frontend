import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Person } from '../../interfaces/persona.interface';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  @Output()  onClickEdit = new EventEmitter<Person>();
  
  dataSource: Person[] = [];
  displayedColumns: string[] = [
    'name', 
    'lastName', 
    'secondLastName', 
    'email',
    'dni',
    'age',
    'actions'
  ];

  constructor(
    private personService: PersonService) {
    
    this.personService.updatedPersonsObs.subscribe(() => {
      this.getPersons();
    });
  }
  
  ngOnInit() {
    this.getPersons();       
  }
  
  getPersons() {
    this.personService.getPersons().subscribe(persons => {
      this.dataSource = persons;
    }); 
  }
  
  onEditar(person: Person) {
    this.onClickEdit.emit(person);
  }
  
  onEliminar(person: Person) {
    const index = this.dataSource.indexOf(person);
    
    this.personService.deletePerson(index).subscribe(() => {
      this.getPersons();
    });
  }
}