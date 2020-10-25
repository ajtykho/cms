import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;

  constructor(private ContactService: ContactService) { }

  ngOnInit(){
    const contact: Contact = this.ContactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
