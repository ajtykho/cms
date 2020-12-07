import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit {

originalDocument: Document;
document: Document;
editMode: boolean = false;

  constructor(    private documentService: 
                DocumentService,
                  private router: Router,
                  private route: ActivatedRoute) {

      } 


  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
         var id = params.id;
         if (!id) { 
            this.editMode = false;
            return
         }
         this.originalDocument = this.documentService.getDocument(id);
    
         if (!this.originalDocument) {
            return
         }
          this.editMode = true
         this.document = JSON.parse(JSON.stringify(this.originalDocument));
    }) 

  }

  onSubmit(form: NgForm) {
    var value = form.value; // get values from form’s fields
    const newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    

    if (this.editMode) {
     this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
     this.documentService.addDocument(newDocument);
    }
    this.router.navigateByUrl('/documents');
 }

 onCancel() {
  this.router.navigateByUrl('/documents');
  }
}
