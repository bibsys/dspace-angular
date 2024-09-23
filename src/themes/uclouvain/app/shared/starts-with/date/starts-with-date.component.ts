import { Component } from '@angular/core';
import { StartsWithDateComponent as BaseComponent } from '../../../../../../app/shared/starts-with/date/starts-with-date.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ds-starts-with-date',
    styleUrls: ['../../../../../../app/shared/starts-with/date/starts-with-date.component.scss'],
    templateUrl: './starts-with-date.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        TranslateModule,
    ],
    standalone: true,
})
export class StartsWithDateComponent extends BaseComponent {
}