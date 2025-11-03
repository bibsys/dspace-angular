import { Component } from "@angular/core";
import { AbstractOneboxResultElement } from "../abstract-onebox-result-element.component";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ObjNgFor } from "src/app/shared/utils/object-ngfor.pipe";
import { VarDirective } from "src/app/shared/utils/var.directive";
import { OneboxResultElementComponent } from "../onebox-result-element-decorator";


@OneboxResultElementComponent(["dc.contributor.author"])
@Component({
  selector: 'ds-author-onebox-result-element',
  templateUrl: './author-onebox-result-element.component.html',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    VarDirective,
    ObjNgFor,
  ],
})
export class AuthorOneboxResultElement extends AbstractOneboxResultElement {
  protected readonly emailKey = 'data-authors_email';
  protected readonly orcidKey = 'data-authors_identifier_orcid';
}