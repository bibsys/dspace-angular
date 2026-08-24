import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { finalize, Observable, of, Subscription } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { Item } from "src/app/core/shared/item.model";
import { AuthorizationDataService } from "src/app/core/data/feature-authorization/authorization-data.service";
import { FeatureID } from "src/app/core/data/feature-authorization/feature-id";
import { SendAttestationEmailService } from "src/app/core/data/send-attestation-emails.service";
import { hasValue } from "src/app/shared/empty.util";

/**
 * Component that renders the actions for a claimed task in the workflow, specifically the action to send attestation emails.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-send-attestation-emails-action',
  templateUrl: './send-attestation-emails-action.component.html',
  imports: [NgIf, AsyncPipe, TranslateModule],
  standalone: true,
})
export class SendAttestationEmailsActionComponent implements OnInit, OnDestroy {

  @Input() object: Item;
  @Input() additionalClasses: string[]= []; // Additional css classes to add to the component

  protected isAuthorized$: Observable<boolean>;
  protected isLoading: boolean;
  private subs: Subscription[] = [];
  private objectId: string;
  
  constructor(
    private authorizationService: AuthorizationDataService,
    private notificationsService: NotificationsService,
    private sendAttestationEmailService: SendAttestationEmailService,
    private translationService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.subs.push(
      this.notificationsService.claimedProfile.subscribe(() => {
        this.isAuthorized$ = this.authorizationService.isAuthorized(
          FeatureID.CanSendAttestationEmails, this.object.self, undefined, false
        );
      })
    );
    this.objectId = this.object.id;
  }

  sendAttestationEmails() {
    this.isLoading = true;
    this.subs.push(
      this.sendAttestationEmailService.sendAttestationEmails(this.objectId).pipe(
        // finalize() will be always triggered whether the response is an error or not.
        finalize(() => {
          // Always disable loading when a result is returned.
          this.isLoading = false;
          // Important to mark the component for check to trigger a visual refresh.
          this.cdr.markForCheck();
        })
      ).subscribe({
        next: (res) => {
          this.notificationsService.success(
            this.translationService.get('submission.workflow.generic.attestation.email.success.title'),
            this.translationService.get('submission.workflow.generic.attestation.email.success.content')
          );
        },
        error: (error) => {
          console.error(error);
          this.notificationsService.error(
            this.translationService.get('submission.workflow.generic.attestation.email.error.title'),
            this.translationService.get('submission.workflow.generic.attestation.email.error.content')
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs
      .filter((sub) => hasValue(sub))
      .forEach((sub) => sub.unsubscribe());
  }
}