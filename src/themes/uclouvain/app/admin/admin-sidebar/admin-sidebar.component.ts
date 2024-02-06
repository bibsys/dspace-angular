import { Component } from '@angular/core';

import { AdminSidebarComponent as BaseComponent } from '../../../../../app/admin/admin-sidebar/admin-sidebar.component';
import { AsyncPipe, NgClass, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component representing the admin sidebar
 */
@Component({
  selector: 'ds-themed-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  imports: [NgIf, NgbDropdownModule, NgClass, NgFor, NgComponentOutlet, AsyncPipe, TranslateModule],
  standalone: true,
})
export class AdminSidebarComponent extends BaseComponent {
}
