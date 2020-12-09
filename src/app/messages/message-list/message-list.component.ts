import { Component, OnInit } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';
import {MessageService } from '../message.service';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private MessageService: MessageService) { }

  ngOnInit() {
    this.MessageService.getMessages();

    this.MessageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      });
  }

  onAddMessage(id: string, subject: string, msgText: string, sender: string) {
    this.messages.push(new Message(id, subject, msgText, sender));
  }

  addMessageEvent(e) {
    this.messages.push(e);
  }

}
