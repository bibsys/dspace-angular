import { DynamicFieldsConfig } from 'src/config/submission-config.interface';
import { environment } from 'src/environments/environment';

export class DynamicFieldsConfigurationLoader {

    private configurationObject: {dynamicFields: DynamicFieldsConfig[] | undefined};
    constructor(){
        this.configurationObject = {dynamicFields: undefined};
        if (environment.submission.dynamicFields){
            this.configurationObject.dynamicFields = environment.submission.dynamicFields;
        }
    }

    /**
     * Returns true if a configuration was detected
     */
    private isConfigPresent(): boolean{
        return Boolean(this.configurationObject.dynamicFields);
    }

    /**
     * Returns true if the given field name is present in the configuration
     */
    public isFieldDynamic(fieldName: string): boolean{
        return this.getTriggeringFields().includes(fieldName);
    }

    /**
     * Retrieves a list of all triggering fields from the configuration
     */
    public getTriggeringFields(): string[]{
        let fields: string[] = [];
        if (this.isConfigPresent()) {
            this.configurationObject.dynamicFields.forEach((config: DynamicFieldsConfig) => {
                fields.push(config.triggeringField);
            });
        }
        return fields;
    }

    /**
     * Recover the config(s) for a given field name
     */
    public getFieldConfiguration(fieldName: string): DynamicFieldsConfig[]{
        return this.isFieldDynamic(fieldName)
            ? this.configurationObject.dynamicFields.filter((config: DynamicFieldsConfig) => config.triggeringField === fieldName)
            : [];
    }
}
