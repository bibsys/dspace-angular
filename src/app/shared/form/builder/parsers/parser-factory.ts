import { StaticProvider } from '@angular/core';
import { ParserType } from './parser-type';
import {
  CONFIG_DATA,
  FieldParser,
  INIT_FORM_VALUES,
  PARSER_OPTIONS,
  SECURITY_CONFIG,
  SUBMISSION_ID
} from './field-parser';
import { DateFieldParser } from './date-field-parser';
import { DropdownFieldParser } from './dropdown-field-parser';
import { RelationGroupFieldParser } from './relation-group-field-parser';
import { ListFieldParser } from './list-field-parser';
import { LookupFieldParser } from './lookup-field-parser';
import { LookupNameFieldParser } from './lookup-name-field-parser';
import { OneboxFieldParser } from './onebox-field-parser';
import { NameFieldParser } from './name-field-parser';
import { SeriesFieldParser } from './series-field-parser';
import { TagFieldParser } from './tag-field-parser';
import { TextareaFieldParser } from './textarea-field-parser';
import { NumberFieldParser } from './number-field-parser';
import { CalendarFieldParser } from './calendar-field-parser';
import { DisabledFieldParser } from './disabled-field-parser';
import { LinkFieldParser } from './link-field-parser';
import { YearFieldParser } from './year-field-parser';

const fieldParserDeps = [
  SUBMISSION_ID,
  CONFIG_DATA,
  INIT_FORM_VALUES,
  PARSER_OPTIONS,
  SECURITY_CONFIG
];

/**
 * Method to retrieve a field parder with its providers based on the input type
 */
export class ParserFactory {
  public static getProvider(type: ParserType): StaticProvider {
    switch (type) {
      case ParserType.Calendar: {
        return {
          provide: FieldParser,
          useClass: CalendarFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Date: {
        return {
          provide: FieldParser,
          useClass: DateFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Dropdown: {
        return {
          provide: FieldParser,
          useClass: DropdownFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.RelationGroup:
      case ParserType.InlineGroup: {
        return {
          provide: FieldParser,
          useClass: RelationGroupFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.List: {
        return {
          provide: FieldParser,
          useClass: ListFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Lookup: {
        return {
          provide: FieldParser,
          useClass: LookupFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.LookupName: {
        return {
          provide: FieldParser,
          useClass: LookupNameFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Onebox: {
        return {
          provide: FieldParser,
          useClass: OneboxFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Name: {
        return {
          provide: FieldParser,
          useClass: NameFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Number: {
        return {
          provide: FieldParser,
          useClass: NumberFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Series: {
        return {
          provide: FieldParser,
          useClass: SeriesFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Tag: {
        return {
          provide: FieldParser,
          useClass: TagFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Textarea: {
        return {
          provide: FieldParser,
          useClass: TextareaFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Link: {
        return {
          provide: FieldParser,
          useClass: LinkFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      case ParserType.Year: {
        return {
            provide: FieldParser,
            useClass: YearFieldParser,
            deps: [...fieldParserDeps]
        };
      }
      case undefined: {
        return {
          provide: FieldParser,
          useClass: DisabledFieldParser,
          deps: [...fieldParserDeps]
        };
      }
      default: {
        return undefined;
      }
    }
  }
}
