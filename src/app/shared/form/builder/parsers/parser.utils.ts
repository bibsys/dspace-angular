import {
  DynamicFormControlLayout,
  DynamicFormControlLayoutConfig,
} from '@ng-dynamic-forms/core';

import {
  isNull,
  isUndefined,
} from '../../../empty.util';

export function setLayout(model: any, controlLayout: string, controlLayoutConfig: string, style: string) {
  if (isNull(model.layout)) {
    model.layout = {} as DynamicFormControlLayout;
    model.layout[controlLayout] = {} as DynamicFormControlLayoutConfig;
    model.layout[controlLayout][controlLayoutConfig] = style;
  } else if (isUndefined(model.layout[controlLayout])) {
    model.layout[controlLayout] = {} as DynamicFormControlLayoutConfig;
    model.layout[controlLayout][controlLayoutConfig] = style;
  } else if (isUndefined(model.layout[controlLayout][controlLayoutConfig])) {
    model.layout[controlLayout][controlLayoutConfig] = style;
  } else {
    model.layout[controlLayout][controlLayoutConfig] = model.layout[controlLayout][controlLayoutConfig].concat(` ${style}`);
  }
}


/**
 * Retrieves a specific setting from a model configuration setting and optionally formats it.
 *
 * @param config the model configuration containing the `settings` property to search within.
 * @param key The key of the setting to retrieve from `data.settings`.
 * @param format Optional format to apply to the setting's value. Supported formats:
 *    - `Number`: Converts the value to a number.
 *    - `String`: Converts the value to a string.
 *    - `Boolean`: Converts the value to a boolean.
 *    - `Date`: Converts the value to a Date object.
 * @returns {any} The formatted setting value, the raw value if no format is specified,
 *    or `undefined` if the `key` does not exist in `data.settings` or if `data` is invalid.
 *
 *  - If `data` or `data.settings` is not defined, the function returns `undefined`.
 *  - If the `key` is not found within `data.settings`, the function returns `undefined`.
 *  - If a `format` is specified but formatting fails (e.g., invalid date), the function logs an error
 *    and returns `undefined`.
 */
export function getSetting(config: any, key: string, format?: any): any {
  if (!config || !config.settings || !(key in config.settings)) {
    return undefined;
  }
  const value = config.settings[key];
  try {
    switch (format) {
      case Number: return Number(value);
      case String: return String(value);
      case Boolean: return Boolean(String(value).toLowerCase() === 'true');
      case Date: return new Date(value);
      default: return value;
    }
  } catch (error) {
    console.error("Setting format error:", error);
    return undefined;
  }
}