import { AsyncPipe, NgClass, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AdminSidebarComponent as BaseComponent } from '../../../../../app/admin/admin-sidebar/admin-sidebar.component';

/**
 * Component representing the admin sidebar
 */
@Component({
  selector: 'ds-themed-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  imports: [
    AsyncPipe,
    NgClass,
    NgComponentOutlet,
    NgForOf,
    NgIf,
    TranslateModule,
  ],
  standalone: true
})
export class AdminSidebarComponent extends BaseComponent {
}
