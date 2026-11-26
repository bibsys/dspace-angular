import {
  NgFor,
  NgIf,
} from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Item } from 'src/app/core/shared/item.model';
import { PLACEHOLDER_VALUE } from 'src/app/core/shared/metadata.utils';
import { isNotEmpty } from 'src/app/shared/empty.util';

@Component({
  selector: 'ds-item-page-additional-uri-section',
  styleUrls: ['./additional-uri-section.component.scss'],
  templateUrl: './additional-uri-section.component.html',
  standalone: true,
  imports: [
    NgbTooltipModule,
    NgFor,
    NgIf,
    TranslateModule,
  ],
})
export class AdditionalUriSectionComponent implements OnInit {

  @Input() item: Item;
  protected links: { url: string, title: string }[] = [];

  ngOnInit(): void {
    const uris: string[] = this.item.allMetadataValues('dc.additional.uri');
    const titles: string[] = this.item.allMetadataValues('dc.additional.title');

    this.links = uris
      .map((uri: string, index: number) => ({
        url: uri,
        title: (isNotEmpty(titles[index]) && titles[index] !== PLACEHOLDER_VALUE) ? titles[index] : uri,
      }))
      .filter((link) => isNotEmpty(link.url));
  }
}
