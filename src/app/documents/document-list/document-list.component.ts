import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  constructor() { }
  
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Ali Tykhomyrova', 'Student in class', 'https', null),
    new Document('2', 'Ivan Tykhomyrov', 'Husband of student', 'https', null),
    new Document('3', 'Thea Tykhomyrova', 'Child of student', 'https', null),
    new Document('4', 'Cergei Tykhomyrov', 'In-Law of student', 'https', null),
    new Document('5', 'Yulia Tykhomyrova', 'In-Law of student', 'https', null),

  ]



  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.onSelectedDocument.emit(document);
  }

}
