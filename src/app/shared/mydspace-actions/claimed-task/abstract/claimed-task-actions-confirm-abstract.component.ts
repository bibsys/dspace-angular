import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ClaimedTaskActionsAbstractComponent } from "./claimed-task-actions-abstract.component";
import { Component, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { TranslateService } from "@ngx-translate/core";
import { SearchService } from "src/app/core/shared/search/search.service";
import { RequestService } from "src/app/core/data/request.service";
import { Observable, of } from "rxjs";
import { RemoteData } from "src/app/core/data/remote-data";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";

@Component({
    template: '',
})
export abstract class ClaimedTaskActionsConfirmAbstractComponent extends ClaimedTaskActionsAbstractComponent {
    option: string;

    /**
    * Reference to the validation modal.
    */
    public modalRef: NgbModalRef;

    constructor(protected injector: Injector,
            protected router: Router,
            protected notificationsService: NotificationsService,
            protected translate: TranslateService,
            protected searchService: SearchService,
            protected requestService: RequestService,
            private modalService: NgbModal) {
        super(injector, router, notificationsService, translate, searchService, requestService);
    }

    /**
    * Submit the action for the task.
    */
    submitTask() {
        this.modalRef.close('Send Button');
        super.submitTask();
    }

    /**
    * Open the confirmation modal.
    * @param content: the content for the modal.
    */
    openConfirmModal(content: any) {
        this.modalRef = this.modalService.open(content);
    }

    reloadObjectExecution(): Observable<RemoteData<DSpaceObject> | DSpaceObject> {
        return of(this.object);
    }
}