import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    @Output() messageChangedEvent = new EventEmitter<Message[]>();
    messages: Message[] = [];

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());
    }

    getMessage(id: string): Message {
        for (const message of this.messages) {
            if (message.id === id) {
                return message;
            }
        }
        return null;
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }
}