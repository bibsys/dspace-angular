import { Component } from '@angular/core';
import { renderStartsWithFor, StartsWithType } from 'src/app/shared/starts-with/starts-with-decorator';
import { StartsWithDateComponent as BaseComponent } from '../../../../../../app/shared/starts-with/date/starts-with-date.component';

@Component({
    selector: 'ds-starts-with-date',
    styleUrls: ['../../../../../../app/shared/starts-with/date/starts-with-date.component.scss'],
    templateUrl: './starts-with-date.component.html',
})
@renderStartsWithFor(StartsWithType.date)
export class StartsWithDateComponent extends BaseComponent {
}