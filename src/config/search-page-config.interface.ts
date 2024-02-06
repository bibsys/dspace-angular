import { AdvancedSearchConfig } from './advance-search-config.interface';
import { Config } from './config.interface';

export interface SearchConfig extends Config {

    /**
     * List of standard filter to select in adding advanced Search
     * Used by {@link UploadBitstreamComponent}.
     */
    advancedFilters: AdvancedSearchConfig;

    /**
     * List of settings used to build the search page (showCharts, trackStatistics, ...)
     */
    settings?: SearchSettingConfig;
}

export interface SearchSettingConfig {
  [key: string]: boolean;
}
