import { Component, OnInit } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model'


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Subject 1', 'Message Text 1', 'Ali Tykhomyrova'),
    new Message('2', 'Subject 2', 'Message Text 2', 'Ali Tykhomyrova'),
    new Message('3', 'Subject 3', 'Message Text 3', 'Ali Tykhomyrova')
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(id: string, subject: string, msgText: string, sender: string) {
    this.messages.push(new Message(id, subject, msgText, sender));
  }

  addMessageEvent(e) {
    this.messages.push(e);
  }

}
