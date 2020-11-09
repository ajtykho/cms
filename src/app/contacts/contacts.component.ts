import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  //selectedContact: Contact;

  constructor(private ContactService: ContactService) { }

  ngOnInit() {
    // this.ContactService.contactSelectedEvent.subscribe(
    //   (contact: Contact) => {
    //     this.selectedContact = contact;
    //   }
    // );
  }

}
