import { EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents=MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents
    .sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
}

getContact(id: string): Document {
    for (const document of this.documents) {
        if (document.id === id) {
            return document;
        }
    }
    return null;
}
}
