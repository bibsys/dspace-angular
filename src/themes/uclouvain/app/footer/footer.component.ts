import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotifyInfoService } from '../../../../app/core/coar-notify/notify-info/notify-info.service';
import { ConfigurationDataService } from '../../../../app/core/data/configuration-data.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { SiteDataService } from '../../../../app/core/data/site-data.service';
import { LocaleService } from '../../../../app/core/locale/locale.service';
import { RoleService } from '../../../../app/core/roles/role.service';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../app/core/shared/operators';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { KlaroService } from '../../../../app/shared/cookies/klaro.service';
import { APP_CONFIG, AppConfig } from '../../../../config/app-config.interface';
import { isNotEmpty } from '../../../../app/shared/empty.util';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ds-themed-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./../../../../app/footer/footer.component.scss', 'footer.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    RouterLink,
    AsyncPipe
  ]
})
export class FooterComponent extends BaseComponent {

  isAdmin: boolean = false;
  backendVersion: Observable<string>;
  frontendVersion: Observable<string>;
  remoteAccess: {
    enabled: boolean,
    url?: string
  } = { enabled: false };

  constructor(
    @Optional() public cookies: KlaroService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    protected locale: LocaleService,
    protected siteService: SiteDataService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private configService: ConfigurationDataService,
    private roleService: RoleService
  ) {
    super(cookies, authorizationService, notifyInfoService, locale, siteService, appConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initRemoteAccess();
    this.initAppVersions();
  }

  /**
   * Initialize remote access data based on app configuration.
   * To allow remote access, `ui.ezproxy.enable` must be true AND `ui.ezproxy.proxyUrl` must be configured.
   * @private
   */
  private initRemoteAccess() {
    if (environment.ui?.ezproxy.enabled && isNotEmpty(environment.ui.ezproxy?.proxyUrl)) {
      this.remoteAccess.enabled = true;
      this.remoteAccess.url = environment.ui.ezproxy.proxyUrl;
    } else {
      this.remoteAccess.enabled = false;
    }
  }

  /**
   * Initialize application version (backend & frontend).
   * This allows admin to visualize SHA-1 of deployed commits.
   * @private
   */
  private initAppVersions() {
    this.roleService.isAdmin().subscribe(
      isAdmin => {
        this.isAdmin = isAdmin;
        if (isAdmin) {
          this.backendVersion = this.configService
            .findByPropertyName("uclouvain.project.version")
            .pipe(
              getFirstSucceededRemoteDataWithNotEmptyPayload(),
              map(versions => versions.values[0])
            );
          this.frontendVersion = of(environment?.ui?.releaseVersion);
        }
      });
  }
}
