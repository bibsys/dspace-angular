import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchComponent as BaseComponent } from '../../../../../app/shared/search/search.component';
import { pushInOut } from '../../../../../app/shared/animations/push';

@Component({
  selector: 'ds-search',
  styleUrls: ['../../../../../app/shared/search/search.component.scss'],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pushInOut],
})

/**
 * This component renders a sidebar, a search input bar and the search results.
 */
export class SearchComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = false;
  }
}
