import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";


@Component({
  selector: 'ds-orcid-short-format',
  template: `<div *ngIf="orcid">
    <a [href]="fullUrl" aria-label="View ORCID record" target="_">
      <img src="assets/images/orcid.logo.icon.svg" alt="ORCID iD" class="orcid-logo mr-1"/>
      <span>{{orcid}}</span>
    </a>
  </div>`,
  styles: '.orcid-logo { max-height: 1.2rem; }',
  standalone: true,
  imports: [NgIf],
})
export class OrcidShortFormatComponent implements OnInit {
  @Input() orcid: string;
  
  protected readonly orcidUrl = environment.ui.orcidUrl;
  protected fullUrl: string;

  ngOnInit(): void {
    this.fullUrl = this.orcidUrl + this.orcid;
  }
}