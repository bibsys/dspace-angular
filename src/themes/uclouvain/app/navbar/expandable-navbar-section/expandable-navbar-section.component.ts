import { Component } from "@angular/core";
import { slide } from "src/app/shared/animations/slide";
import {ExpandableNavbarSectionComponent as BaseComponent} from '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';
import { AsyncPipe, NgComponentOutlet, NgFor, NgIf } from "@angular/common";
import { HoverOutsideDirective } from "src/app/shared/utils/hover-outside.directive";
import { RouterLinkActive } from "@angular/router";

@Component({
    selector: 'ds-expandable-navbar-section',
    templateUrl: '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.html',
    // styleUrls: ['../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.scss'],
    styleUrls: ['./expandable-navbar-section.component.scss'],
    animations: [slide],
    imports: [
        AsyncPipe,
        HoverOutsideDirective,
        NgComponentOutlet,
        NgFor,
        NgIf,
        RouterLinkActive,
    ],
    standalone: true,
})
export class ExpandableNavbarSectionComponent extends BaseComponent {
}