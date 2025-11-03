import { Component } from "@angular/core";
import { OneboxResultElementComponent } from "../onebox-result-element-decorator";
import { AbstractOneboxResultElement } from "../abstract-onebox-result-element.component";
import { JsonPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ObjNgFor } from "src/app/shared/utils/object-ngfor.pipe";
import { VarDirective } from "src/app/shared/utils/var.directive";


@OneboxResultElementComponent(["dc.relation.journal"])
@Component({
  selector: 'ds-journal-onebox-result-element',
  templateUrl: './journal-onebox-result-element.component.html',
  styles: ['.journal-ceased { background: color-mix(in srgb, var(--bs-warning) 5%, white); }'],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgFor,
    ObjNgFor,
    VarDirective,
    JsonPipe,
    NgClass,
  ],
})
export class JournalOneboxResultElement extends AbstractOneboxResultElement {
  protected readonly infoKey = 'journal.searchresult.info';
  protected readonly ceasedKey = 'journal.searchresult.ceased';

  isCeased(): boolean {
    return this.entry.hasOtherInformation() && this.hasValue(this.otherInformationAsMap, this.ceasedKey);
  }
}