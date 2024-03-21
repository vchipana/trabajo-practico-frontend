import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Person } from '../interfaces/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  updatedPersons = new Subject();
  updatedPersonsObs = this.updatedPersons.asObservable();

  constructor() { }

  getPersons(): Observable<Person[]> {
    const persons = JSON.parse(localStorage.getItem('persons') || '') || [];
    return of(persons);
  }
  
  savePerson(person: Person): Observable<null> {
    const persons = JSON.parse(localStorage.getItem('persons') || '') || [];
    
    persons.push(person);
    
    localStorage.setItem('persons', JSON.stringify(persons));
    
    return of(null);
  }
  
  updatePerson(person: Person): Observable<null> {
    const persons = JSON.parse(localStorage.getItem('persons') || '') || [];
    
    const index = persons.findIndex((item: Person) => item.id === person.id);
    
    persons[index] = person;
    
    localStorage.setItem('persons', JSON.stringify(persons));
    
    return of(null);
  }
  
  deletePerson(index: number): Observable<null> {
    const persons = JSON.parse(localStorage.getItem('persons') || '') || [];
    
    persons.splice(index, 1);
    
    localStorage.setItem('persons', JSON.stringify(persons));
  
    return of(null)
  }
}