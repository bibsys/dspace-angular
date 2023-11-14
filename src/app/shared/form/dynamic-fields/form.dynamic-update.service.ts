import { Subject } from 'rxjs';
import { DynamicFieldsConfigurationLoader } from './dynamic-fields-configuration-loader';
import { DynamicFieldEndpointConfig, DynamicFieldsConfig } from 'src/config/submission-config.interface';
import { FormDynamicUpdateRequestService } from './form.dynamic-update-request.service';
import { Injectable } from '@angular/core';
import { isNotNull, isNotUndefined } from '../../empty.util';
import { environment } from 'src/environments/environment';
import { replaceAll } from './string.util';

@Injectable({
    providedIn: 'root'
})
export class FormDynamicUpdateService {
    private dynamicFieldsConfiguration: DynamicFieldsConfigurationLoader = new DynamicFieldsConfigurationLoader();

    public dynamicFieldUpdateEvent: Subject<any> = new Subject();

    constructor(protected formDynamicUpdateRequestService: FormDynamicUpdateRequestService) {
    }

    /**
     * Checks if a dynamic field event should be triggered base on the changed field and configuration.
     *
     * @param fieldName - The name of the field being changed.
     * @param value - The value of the field being changed.
     * @param formBuilderInstance - An instance of the FormBuilderService.
     * @return void
     */
    public checkForDynamicFieldsEvent(fieldName: string, value: string, formBuilderInstance: any): void {
        let changedFieldName = replaceAll(fieldName, '_', '.');
        if (this.dynamicFieldsConfiguration.isFieldDynamic(changedFieldName)) {
            // console.log('Field is a triggering field: ', changedFieldName);
            let dynamicConfig: DynamicFieldsConfig[] = this.dynamicFieldsConfiguration.getFieldConfiguration(changedFieldName);
            dynamicConfig.forEach((config: DynamicFieldsConfig) => {
                let { triggeringField, targetFields } = config;
                if (triggeringField === changedFieldName && this.areTargetFieldsPresent(targetFields, formBuilderInstance)) {
                    this.triggerDynamicFieldEvent(config, formBuilderInstance);
                }
            });
        }
    }

    /**
     * Triggers the Http call linked to a specific configuration.
     *
     * @param config - The configuration.
     * @param formBuilderInstance - An instance of the FormBuilderService used to retrieve request params.
     */
    private triggerDynamicFieldEvent(config: DynamicFieldsConfig, formBuilderInstance: any): void {
        let { triggeringField, endpoint, params } = config;
        let requestParams = this.generateParamsString(params, formBuilderInstance);
        let url = requestParams ? (environment.rest.baseUrl + endpoint + '?' + requestParams) : (environment.rest.baseUrl + endpoint);
        this.formDynamicUpdateRequestService.get(url).subscribe(res => this.dynamicFieldUpdateEvent.next(res));
    }

    /**
     * Checks if all the given target fields are present in the user's form.
     *
     * @param targetFields - The name of the fields to check for presence.
     * @param formBuilderInstance - An instance of the FormBuilderService used to find fields in the from.
     */
    private areTargetFieldsPresent(targetFields: string[], formBuilderInstance: any): boolean {
        if (!targetFields.length) {
            return false;
        }
        let res = true;
        targetFields.forEach((targetField: string) => {
            let cleanedTargetField = replaceAll(targetField, '.', '_');
            if (!formBuilderInstance.getMetadataFieldFromId(cleanedTargetField)) {
                res = false;
            }
        });
        return res;
    }

    /**
     * Generate a params string based on the params extracted from the configuration.
     *
     * @param params - params from the configuration.
     * @param formBuilderInstance - An instance of the FormBuilderService used to retrieve request params values.
     * @return The actual params string
     */
    private generateParamsString(params: DynamicFieldEndpointConfig, formBuilderInstance: any): string {
        let finalObject = {};
        let { paramKeys, metadataFields } = params;

        paramKeys.forEach((paramKey: string, index: number) => {
            if (metadataFields[index].includes('raw-')) {
                finalObject[paramKey] = metadataFields[index].replace('raw-', '');
            } else {
                let fieldValue = replaceAll(metadataFields[index], '.', '_');
                let currentMetadataField = formBuilderInstance.getMetadataFieldValueObjectById(fieldValue);
                if (isNotUndefined(currentMetadataField) && isNotNull(currentMetadataField)) {
                    finalObject[paramKey] = currentMetadataField.value;
                }
            }
        });

        return new URLSearchParams(finalObject).toString();
    }
}
