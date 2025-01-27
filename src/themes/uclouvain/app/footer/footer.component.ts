import { Component, Optional } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { KlaroService } from '../../../../app/shared/cookies/klaro.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { NotifyInfoService } from '../../../../app/core/coar-notify/notify-info/notify-info.service';
import { LocaleService } from '../../../../app/core/locale/locale.service';
import { SiteDataService } from '../../../../app/core/data/site-data.service';
import { ConfigurationDataService } from '../../../../app/core/data/configuration-data.service';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../app/core/shared/operators';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RoleService } from '../../../../app/core/roles/role.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ds-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./../../../../app/footer/footer.component.scss', 'footer.component.scss']
})
export class FooterComponent extends BaseComponent {

  isAdmin: boolean = false;
  backendVersion: Observable<string>;
  frontendVersion: Observable<string>;


  constructor(
    @Optional() protected cookies: KlaroService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    protected locale: LocaleService,
    protected siteService: SiteDataService,
    private configService: ConfigurationDataService,
    private roleService: RoleService
  ) {
    super(cookies, authorizationService, notifyInfoService, locale, siteService);
  }

  ngOnInit() {
    super.ngOnInit();
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
      })
  }
}
