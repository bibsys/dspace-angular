import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BitstreamDataService } from '../../../../../../../../app/core/data/bitstream-data.service';
import { RemoteData } from '../../../../../../../../app/core/data/remote-data';
import { Bitstream } from '../../../../../../../../app/core/shared/bitstream.model';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { ThemedThumbnailComponent } from '../../../../../../../../app/thumbnail/themed-thumbnail.component';

@Component({
  selector: 'ds-order-it',
  templateUrl: './order-it.component.html',
  imports: [
    TranslateModule,
    NgIf,
    ThemedThumbnailComponent,
    AsyncPipe
  ],
  standalone: true
})
export class OrderItComponent implements OnInit {

  @Input() item: Item;

  protected thumbnail$: Observable<RemoteData<Bitstream>>;
  protected gcoi_id: string | null = null;
  protected pul_url: string | null = null;

  constructor(
    private bitstreamDataService: BitstreamDataService
  ) {}


  ngOnInit() {
    this.gcoi_id = this.item.firstMetadataValue("dc.identifier.gcoi");
    if (isNotEmpty(this.gcoi_id)) {
      this.pul_url = "https://pul.uclouvain.be/book/?gcoi=" + this.gcoi_id;
      this.thumbnail$ = this.item.thumbnail ?? this.bitstreamDataService.findByHref(this.item._links.thumbnail.href);
    }
  }

}