import { Message } from '../message.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

 @ViewChild('subject') subject: ElementRef;
 @ViewChild('msgText') msgText: ElementRef;
 //@Output() addMessageEvent = new EventEmitter<Message>(); 
 currentSender = '1';
 
  constructor(private MessageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    const message = new Message(
      '1',
      subjectValue,
      msgTextValue,
      this.currentSender);

      this.MessageService.addMessage(message);

    //this.addMessageEvent.emit(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
