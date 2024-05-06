import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { Context } from '../../../../../../app/core/shared/context.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../../../app/item-page/simple/item-types/shared/item.component';
import { DSpaceObjectType } from '../../../../../../app/core/shared/dspace-object-type.model';

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
}
