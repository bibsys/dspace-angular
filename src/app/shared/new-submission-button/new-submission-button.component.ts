import { MyDSpaceNewSubmissionDropdownComponent } from 'src/app/my-dspace-page/my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component';
import { Component, OnInit } from '@angular/core';
import { EntityTypeDataService } from 'src/app/core/data/entity-type-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { FeatureID } from 'src/app/core/data/feature-authorization/feature-id';

@Component({
    selector: 'ds-new-submission-button',
    templateUrl: './new-submission-button.component.html',
    styleUrls: ['./new-submission-button.component.scss']
})
export class NewSubmissionButtonComponent extends MyDSpaceNewSubmissionDropdownComponent implements OnInit {

    isAuthorized$: Observable<boolean>;

    constructor(entityTypeService: EntityTypeDataService, modalService: NgbModal, protected authorizationService: AuthorizationDataService, protected notificationService: NotificationsService){
        super(entityTypeService, modalService);
    }

    ngOnInit(): void {
        // If user has no special rights (not manager, librarian or admin), he can only submit once
        this.notificationService.claimedProfile.subscribe(() => {
            this.isAuthorized$ = this.authorizationService.isAuthorized(
                FeatureID.CanCreateSubmission, undefined, undefined, false
            );
        });
    }
}
