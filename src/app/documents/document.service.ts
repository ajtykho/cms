import { Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  //documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    this.documents=MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
  }

  getDocuments() {
    this.http.get('https://cmsproject-5049d-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;

        this.maxDocumentId = this.getMaxId();

        this.documents.sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      //error function
      (error: any) => {
        console.log(error);
      }
    )

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
  
  this.storeDocuments();
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
  
  this.storeDocuments();
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
 
 this.storeDocuments();
}

storeDocuments() {
  let documents = JSON.stringify(this.documents);

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  this.http.put('https://cmsproject-5049d-default-rtdb.firebaseio.com/documents.json', documents, {headers: headers})
    .subscribe(
      () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
}

}
