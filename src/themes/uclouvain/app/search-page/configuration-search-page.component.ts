import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-page.component';
import { ConfigurationSearchPageComponent as BaseComponent } from 'src/app/search-page/configuration-search-page.component';
import { pushInOut } from 'src/app/shared/animations/push';

@Component({
    selector: 'ds-configuration-search-page',
    styleUrls: ['../../../../app/shared/search/search.component.scss'],
    templateUrl: '../../../../app/shared/search/search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pushInOut],
    providers: [
        {
            provide: SEARCH_CONFIG_SERVICE,
            useClass: SearchConfigurationService
        }
    ]
})
export class ConfigurationSearchPageComponent extends BaseComponent {}
