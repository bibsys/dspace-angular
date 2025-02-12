import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { Context } from '../../../../../../app/core/shared/context.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../../../app/item-page/simple/item-types/shared/item.component';
import { DSpaceObjectType } from '../../../../../../app/core/shared/dspace-object-type.model';
import { isNotEmpty } from '../../../../../../app/shared/empty.util';
import { RouteService } from '../../../../../../app/core/services/route.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../../app/core/roles/role.service';
import { Observable } from 'rxjs';
import { RoleType } from '../../../../../../app/core/roles/role-types';


/** How to find and extract publication identifiers
 *  For each entry we need to define 3 keys:
 *    - field: the metadata field name where to find the identifier
 *    - labelFn: a function to get/extract the identifier label. This function will receive the identifier value as param.
 *    - valueFn: a function to get/extract the identifier value. This function will receive the identifier value as param.
 *               If the extracted value is `null` (or empty), identifier will not be extracted.
 *               If the extracted value isn't a `string`, the value will not be displayed (only the label in this case).
 */
const identifiersExtractors = [
  {
    field: 'dc.identifier.fedora',
    labelFn: () => 'fedora',
    valueFn: (v: string) => v
  }, {
    field: 'dc.identifier.other',
    labelFn: (v: string) =>  v.match(/^([^:]+)::/)?.[1].toLowerCase() || 'other',
    valueFn: (v: string) => v.match(/::(.*)/)?.[1] || v
  }, {
    field: 'dcterms.provenance',
    labelFn: () => 'cataretro',
    valueFn: (v: string) => v.toLowerCase() === 'cataretro' ? true : null,
  }
];


/** Component to render 'MasterThesis' entity type for detailed view */
@listableObjectComponent('MasterThesis', ViewMode.StandalonePage, Context.Any, 'uclouvain')
@Component({
  selector: 'ds-master-thesis',
  styleUrls: ['./master-thesis-page.component.scss'],
  templateUrl: './master-thesis-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterThesisPageComponent extends ItemComponent {
  protected readonly DspaceObjectType = DSpaceObjectType;
  dateFormat = 'yyyy-MM-dd HH:mm:ss';
  dsoDate: string;
  isUserAdmin: Observable<boolean>;
  externalIdentifiers: { [key: string]: any } = {};

  protected readonly isNotEmpty = isNotEmpty;

  /**
   * Constructor
   * @param routeService RouteService
   * @param router       Router
   * @param roleService  RoleService
   */
  constructor(
    protected routeService: RouteService,
    protected router: Router,
    protected roleService: RoleService,
  ) {
    super(routeService, router);
  }

  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    this.isUserAdmin = this.roleService.checkRole(RoleType.Admin);
    this.dsoDate = this.object.firstMetadataValue('dc.date.issued');

    // Load legacy identifiers
    identifiersExtractors.forEach(({ field, labelFn, valueFn }) => {
      this.object.allMetadataValues(field).forEach(mv => {
        const value = valueFn(mv);
        if (isNotEmpty(value)) {
          this.externalIdentifiers[labelFn(mv)] = value;
        }
      });
    });
  }


}
