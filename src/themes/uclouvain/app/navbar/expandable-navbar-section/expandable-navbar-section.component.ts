import { Component } from "@angular/core";
import { slide } from "src/app/shared/animations/slide";
import { ExpandableNavbarSectionComponent as BaseComponent } from "src/app/navbar/expandable-navbar-section/expandable-navbar-section.component";
import { AsyncPipe, NgComponentOutlet, NgFor, NgIf } from "@angular/common";
import { HoverOutsideDirective } from "src/app/shared/utils/hover-outside.directive";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'ds-expandable-navbar-section',
  templateUrl: './expandable-navbar-section.component.html',
  styleUrl: './expandable-navbar-section.component.scss',
  animations: [slide],
  standalone: true,
  imports: [
    AsyncPipe,
    HoverOutsideDirective,
    NgComponentOutlet,
    NgFor,
    NgIf,
    RouterLinkActive,
  ],
})
export class ExpandableNavbarSectionComponent extends BaseComponent {
}
