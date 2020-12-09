import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    @Output() messageChangedEvent = new EventEmitter<Message[]>();
    messages: Message[] = [];
    maxMessageId: number;

    constructor(private http: HttpClient) {
        this.messages = MOCKMESSAGES;
        this.maxMessageId = this.getMaxId();
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages();
    }

    getMessage(id: string): Message {
        for (const message of this.messages) {
            if (message.id === id) {
                return message;
            }
        }
        return null;
    }

    getMaxId(): number {

        var maxId = 0;

        for (const message of this.messages) {
            var currentId = parseFloat(message.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    getMessages() {
        this.http.get('https://cmsproject-5049d-default-rtdb.firebaseio.com/messages.json')
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;

                this.maxMessageId = this.getMaxId();

                this.messageChangedEvent.next(this.messages.slice());
            },
            //error function
            (error: any) => {
                console.log(error);
            }
        )
    }

    storeMessages() {
        let messages = JSON.stringify(this.messages);

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put('https://cmsproject-5049d-default-rtdb.firebaseio.com/messages.json', messages, {headers: headers})
            .subscribe(
                () => {
                    this.messageChangedEvent.next(this.messages.slice());
                }
            );
    }
}