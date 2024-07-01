import { Component, Input } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

// This component is used to display a download URL for a file, and allows a manager to copy it to the clipboard
@Component({
    selector: 'ds-promoter-file-download-url',
    templateUrl: './promoter-file-download-url.component.html'
})
export class PromoterFileDownloadUrlComponent {
    @Input() downloadUrl: string;

    constructor(private notificationsService: NotificationsService) {}

    copyUrlToClipboard(): void {
        // Use DSpace alert system to give feedback to the user
        navigator.clipboard.writeText(this.downloadUrl)
            .then(() => this.notificationsService.success('The download URL has been copied to the clipboard.'))
            .catch(() => this.notificationsService.error('Error while copying the download URL to the clipboard.'));
    }
}
