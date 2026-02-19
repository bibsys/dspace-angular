import { Component } from "@angular/core";
import { AbstractOneboxResultElement } from "../abstract-onebox-result-element.component";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { VarDirective } from "src/app/shared/utils/var.directive";
import { OneboxResultElementComponent } from "../onebox-result-element-decorator";

@OneboxResultElementComponent(["dc.contributor.author"])
@Component({
  selector: 'ds-author-onebox-result-element',
  template: `
      <div class="px-3 py-1">
          <!-- Author name -->
          <label class="text-primary font-weight-bold m-0">{{ entry.value }}</label>
          <!-- Author additional data -->
          <ul *ngIf="entry.hasOtherInformation()" class="list-inline list-inline-with-divider m-0 text-secondary">
              <ng-container *ngVar="otherInformationAsMap as otherInfo">
                  <li *ngIf="hasValue(otherInfo, entity)">
                      <i class="fas fa-sitemap mr-1"></i>
                      {{ otherInfo.get(entity) }}
                  </li>
                  <li *ngIf="hasValue(otherInfo, emailKey)">
                      <i class="fa fa-envelope mr-1"></i>
                      {{ otherInfo.get(emailKey) }}
                  </li>
                  <li *ngIf="hasValue(otherInfo, orcidKey)">
                      <i class="fa-brands fa-orcid mr-1"></i>
                      {{ otherInfo.get(orcidKey) }}
                  </li>
              </ng-container>
          </ul>
      </div>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, VarDirective],
})
export class AuthorOneboxResultElement extends AbstractOneboxResultElement {
  protected readonly emailKey = 'data-authors_email';
  protected readonly orcidKey = 'data-authors_identifier_orcid';
  protected readonly entity = 'data-authors_entity_name';
}