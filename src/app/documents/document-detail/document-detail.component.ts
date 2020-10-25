import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService} from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {

 document: Document;
 id: string;
 nativeWindow: any;

//   constructor(
//     private documentService: DocumentService,
//     private router: Router,
//     private route: ActiveatedRoute,
//     private windRefService: WindRefService
//   ) {}

   ngOnInit() {
//     this.route.params.subscribe(
//       (params: Params) => {
//         this.id = params.id;
//         this.document = this.windRefService.//something
       }
///     );

//     this.nativeWindow = this.windRefService.g//something
//   }

//   onDelete() {
//     this.documentService.deleteDocument()//this.)//something);
//     ;
//     this.router.navigateByUrl('/documents');
  }

