import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})

export class ContactsEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }

       ngOnInit(): void {
        this.route.params.subscribe (
          (params: Params) => {
             var id = params.id;
             if (!id) { 
                this.editMode = false;
                return
             }
             this.originalContact = this.contactService.getContact(id);
        
             if (!this.originalContact) {
                return
             }
              this.editMode = true
             this.contact = JSON.parse(JSON.stringify(this.originalContact));
        }) 
    
      }

      onSubmit(form: NgForm) {
        var value = form.value; // get values from form’s fields
        const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
        
    
        if (this.editMode) {
         this.contactService.updateContact(this.originalContact, newContact);
        }
        else {
         this.contactService.addContact(newContact);
        }
        this.router.navigateByUrl('/contacts');
     }
    
     onCancel() {
      this.router.navigateByUrl('/contacts');
      }
}
