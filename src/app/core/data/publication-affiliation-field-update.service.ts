import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AffiliationData } from "./publication-affiliation-data.service";
import { DynamicPathable } from "@ng-dynamic-forms/core";

/**
 * Service that allows the DsDynamicInstitutionAffiliationComponent to communicate with the DsDynamicDepartmentAffiliationComponent.
 * Basically, when an institution is selected, the department select should be updated with the corresponding departments. This is done through this service.
 * To make sure that the corresponding department select component is updated, the parent of the institution select component is sent along with the department data.
 */
@Injectable({
    providedIn: 'root'
})
export class FormAffiliationFieldUpdateService {
    // The subject that should be listened to by the department select component.
    public affiliationFieldUpdateEvent: BehaviorSubject<AffiliationUpdateData> = new BehaviorSubject(null);

    /**
     * This method is used to trigger the event that will update the department select component with all the selectable options.
     * @param target The target affiliation data to be sent to the department select component.
     */
    public triggerFieldUpdateEvent(data: AffiliationUpdateData) {
        this.affiliationFieldUpdateEvent.next(data);
    }
}

/**
 * Class that holds the data to be sent to the department select component.
 */
export class AffiliationUpdateData {
    public data: AffiliationData[];
    public parent: DynamicPathable;
    public clearData: boolean;

    constructor(data: AffiliationData[], parent: DynamicPathable, clearData: boolean) {
        this.data = data;
        this.parent = parent;
        this.clearData = clearData;
    }
}