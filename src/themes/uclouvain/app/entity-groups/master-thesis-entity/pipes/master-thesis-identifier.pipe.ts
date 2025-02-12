import { Pipe, PipeTransform } from '@angular/core';
import { isNotEmpty } from '../../../../../../app/shared/empty.util';

@Pipe({
  name: 'masterThesisIdentifierSerialization',
})
export class MasterThesisIdentifierPipe implements PipeTransform {
  transform(identifier: { key: string, value: any }, separator: string = '::'): string {
    let output = identifier.key;
    if (typeof identifier.value === 'string' && isNotEmpty(identifier.value)) {
      output += separator + identifier.value
    }
    return output;
  }
}