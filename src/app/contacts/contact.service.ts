import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private contacts: Contact[] = [];
    contactChangedEvent = new EventEmitter<Contact[]>();
    contactListChangedEvent = new Subject<Contact[]>();
    maxContactId: number;
 

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        return this.contacts
        .sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        .slice();
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

      addContact(newContact: Contact) {
        if (!newContact) {
            return;
          }
      
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      }

      updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }
      
        const pos = this.contacts.indexOf(originalContact)
        if (pos < 0) {
            return;
        }
      
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        const contactsListClone = this.contacts.slice()
        this.contactListChangedEvent.next(contactsListClone)
      }
      
      deleteContact(contact: Contact) {
        if (!contact) {
          return;
        }
      
        const pos = this.contacts.indexOf(contact);
      
        if (pos < 0) {
          return;
        }
      
        this.contacts.splice(pos,1);
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      }

}