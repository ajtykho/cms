import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }


  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentList: Document[]) => {
          this.documents =  documentList;
        }
      );

      this.documentService.getDocuments();

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
