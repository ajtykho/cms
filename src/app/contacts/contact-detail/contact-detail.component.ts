import { Component, Input, OnInit } from '@angular/core';
import {Contact} from '../contact.model'

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
@Input() contact: Contact;

  //contact: Contact = 
   // new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)

  constructor() { }

  ngOnInit(): void {
  }

}
