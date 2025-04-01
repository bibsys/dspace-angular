import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import { Item } from '../../core/shared/item.model';
import { dsoPageSingleFeatureGuard } from 'src/app/core/data/feature-authorization/feature-authorization-guard/dso-page-single-feature.guard';
import { itemPageResolver } from '../item-page.resolver';

/**
 * Guard for preventing unauthorized access to certain {@link Item} pages requiring specific comment rights
 */
export const commentGuard: CanActivateFn = dsoPageSingleFeatureGuard(
  () => itemPageResolver,
  () => of(FeatureID.CanSeeComment)
)
