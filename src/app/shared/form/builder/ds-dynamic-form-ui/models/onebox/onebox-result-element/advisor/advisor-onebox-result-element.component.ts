import { Component } from "@angular/core";
import { AbstractOneboxResultElement } from "../abstract-onebox-result-element.component";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { VarDirective } from "src/app/shared/utils/var.directive";
import { OneboxResultElementComponent } from "../onebox-result-element-decorator";

@OneboxResultElementComponent(["dc.contributor.advisor"])
@Component({
  template: `
      <div class="px-3 py-1">
          <label class="text-primary font-weight-bold m-0">{{ entry.value }}</label>
          <ul *ngIf="entry.hasOtherInformation()" class="list-inline list-inline-with-divider m-0 text-secondary">
              <ng-container *ngVar="otherInformationAsMap as otherInfo">
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
export class AdvisorOneboxResultElement extends AbstractOneboxResultElement {
  protected readonly emailKey = 'data-advisors_email';
  protected readonly orcidKey = 'data-advisors_identifier_orcid';
}