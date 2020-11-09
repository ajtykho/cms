import { EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  //documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents=MOCKDOCUMENTS;
  }

  

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.documents.splice(pos,1);

    this.documentChangedEvent.emit(this.documents.slice());
  }

  getDocuments(): Document[] {
    return this.documents
    .sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
}

  getDocument(id: string): Document {
    for (const document of this.documents) {
        if (document.id === id) {
            return document;
        }
    }
    return null;
}
}
