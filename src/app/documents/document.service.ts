import { Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() { 
    this.documents=MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
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


getMaxId(): number {

  var maxId = 0;

  for (const document of this.documents) {
       var currentId = parseFloat(document.id);
      if (currentId > maxId) {
          maxId = currentId;
      }
}
  return maxId;
}

addDocument(newDocument: Document) {
  if (!newDocument) {
      return;
    }

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
      return;
  }

  const pos = this.documents.indexOf(originalDocument)
  if (pos < 0) {
      return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
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
  const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}

}
