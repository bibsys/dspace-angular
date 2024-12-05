import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SectionDataObject } from '../../sections/models/section-data.model';
import { SectionsService } from '../../sections/sections.service';
import { SectionsDirective } from '../../sections/sections.directive';
import { skipWhile } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-submission-section-shortcut',
  templateUrl: './shortcut-container.component.html',
  styleUrls: ['./shortcut-container.component.scss'],
  imports: [NgIf, AsyncPipe, TranslateModule],
  standalone: true,
})
export class SubmissionSectionShortcutContainerComponent implements OnInit {

  @Input() submissionId: string;
  @Input() sectionData: SectionDataObject;
  @Input() headerComponent?: ElementRef<HTMLElement>;

  sectionRef: SectionsDirective = undefined;

  /** Constructor */
  constructor(
    private sectionService: SectionsService
  ) { }

  /** OnInit hook */
  ngOnInit() {
    this.sectionService
      .getSection(this.sectionData.id)
      .pipe(skipWhile(section => section === null))
      .subscribe(section => this.sectionRef = section);
  }

  /** Scroll the window to the corresponding form section */
  scrollToSection(): void {
    // We need to determine the size of the header element if exists. By default, this header element is sticky. To be
    // correctly visible, we need to add the header height size as an offset to determine the scroll position.
    const targetElement = document.getElementById(this.sectionData.header);
    const headerOffset = (this.headerComponent) ? this.headerComponent.nativeElement.offsetHeight : 0;
    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ behavior: "smooth", top: offsetPosition});
  }
}