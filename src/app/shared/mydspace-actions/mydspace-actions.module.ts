/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ClaimedTaskActionsApproveComponent } from './claimed-task/approve/claimed-task-actions-approve.component';
import { ClaimedTaskActionsApproveNoDiffusionComponent } from './claimed-task/approve_no_diffusion/claimed-task-actions-approve-no-diffusion.component';
import { ClaimedTaskActionsRejectComponent } from './claimed-task/reject/claimed-task-actions-reject.component';
import { ClaimedTaskActionsReturnToPoolComponent } from './claimed-task/return-to-pool/claimed-task-actions-return-to-pool.component';
import { ClaimedTaskActionsEditMetadataComponent } from './claimed-task/edit-metadata/claimed-task-actions-edit-metadata.component';
import { ClaimedTaskActionsComponent } from './claimed-task/claimed-task-actions.component';
import { ClaimedTaskActionsLoaderComponent } from './claimed-task/switcher/claimed-task-actions-loader.component';
import { ItemActionsComponent } from './item/item-actions.component';
import { PoolTaskActionsComponent } from './pool-task/pool-task-actions.component';
import { WorkflowitemActionsComponent } from './workflowitem/workflowitem-actions.component';
import { WorkspaceitemActionsComponent } from './workspaceitem/workspaceitem-actions.component';
import { PdfAttestationActionComponent } from './pdf-attestation-action/pdf-attestation-action.component';
import { ClaimedTaskActionsReturnToSubmitterComponent } from './claimed-task/return-to-submitter/claimed-task-actions-return-to-submitter.component';
import { ClaimedTaskActionsWithdrawRejectComponent } from './claimed-task/withdraw-reject/claimed-task-actions-withdraw-reject.component';
import { ClaimedTaskActionsConfirmApproveComponent } from './claimed-task/confirm-approve/claimed-task-actions-confirm-approve.component';

const ENTRY_COMPONENTS = [
  ClaimedTaskActionsApproveComponent,
  ClaimedTaskActionsApproveNoDiffusionComponent,
  ClaimedTaskActionsRejectComponent,
  ClaimedTaskActionsReturnToPoolComponent,
  ClaimedTaskActionsEditMetadataComponent,
  ClaimedTaskActionsReturnToSubmitterComponent,
  ClaimedTaskActionsWithdrawRejectComponent,
  ClaimedTaskActionsConfirmApproveComponent,
];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  ClaimedTaskActionsComponent,
  ClaimedTaskActionsLoaderComponent,
  ItemActionsComponent,
  PdfAttestationActionComponent,
  PoolTaskActionsComponent,
  WorkflowitemActionsComponent,
  WorkspaceitemActionsComponent,
];

/**
 * This module contains Item actions used in MyDSpace
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  providers: [
    ...ENTRY_COMPONENTS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class MyDSpaceActionsModule {

}
