import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Contact} from '../contact.model'
import { ContactService } from '../contact.service';
import { WindRefService } from 'src/app/wind-ref.service';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;
 nativeWindow: any;


  //contact: Contact = 
   // new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)

  constructor(private contactService: ContactService,
              private router: Router,
              private routes: ActivatedRoute,
              private windRefService: WindRefService) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );

    this.nativeWindow = this.windRefService.getNativeWindow();

  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}
