import { NgIf } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';
import {CreativeCommonsLicenseComponent} from "../../../../shared/cc-license/creative-commons-licence.component";

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 100)
@Component({
  template: `
    <ng-container *ngIf="item.hasMetadata('dc.rights.uri')">
      <dt>{{ 'item.page.details.label.licence' | translate }}</dt>
      <dd>
        <a href="{{ url }}" target="_blank">
          <ds-cc-license [licenseUri]="url" [height]="16"></ds-cc-license>
        </a>
      </dd>
    </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent, CreativeCommonsLicenseComponent]
})
export class LicenceMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected url: string;
  ngOnInit() {
    if (this.item.hasMetadata('dc.rights.uri')) {
      this.url = this.item.firstMetadataValue('dc.rights.uri');
    }
  }
}

