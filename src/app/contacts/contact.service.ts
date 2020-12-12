import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private contacts: Contact[] = [];
    //contactChangedEvent = new EventEmitter<Contact[]>();
    contactListChangedEvent = new Subject<Contact[]>();
    maxContactId: number;
 

    constructor(private http: HttpClient) {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts() {
      this.http.get('http://localhost:3000/contacts')
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;

            this.maxContactId = this.getMaxId();

            this.contacts.sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          //error function
          (error: any) => {
            console.log(error);
          }
        )
    }

    getContact(id: string): Contact {
        for (const contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            }
        }
        return null;
    }

    getMaxId(): number {

        var maxId = 0;
      
        for (const contact of this.contacts) {
             var currentId = parseFloat(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
      }
        return maxId;
      }

      addContact(contact: Contact) {
        if (!contact) {
          return;
        }
      
        // make sure id of the new Contact is empty
        contact.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
          contact,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new contact to contacts
              this.contacts.push(responseData.contact);
              this.sortAndSend();
            }
          );
      }

      updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
          return;
        }
      
        const pos = this.contacts.findIndex(d => d.id === originalContact.id);
      
        if (pos < 0) {
          return;
        }
      
        // set the id of the new Contact to the id of the old Contact
        newContact.id = originalContact.id;
        newContact._id = originalContact._id;
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // update database
        this.http.put('http://localhost:3000/contacts/' + originalContact.id,
          newContact, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.contacts[pos] = newContact;
              this.sortAndSend();
            }
          );
      }
      
      deleteContact(contact: Contact) {

        if (!contact) {
          return;
        }
      
        const pos = this.contacts.findIndex(d => d.id === contact.id);
      
        if (pos < 0) {
          return;
        }
      
        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
          .subscribe(
            (response: Response) => {
              this.contacts.splice(pos, 1);
              this.sortAndSend();
            }
          );
      }

      storeContacts() {
        let contacts = JSON.stringify(this.contacts);

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put('http://localhost:3000/contacts/', contacts, {headers: headers})
          .subscribe(
            () => {
              this.contactListChangedEvent.next(this.contacts.slice());
            }
          );
      }

}