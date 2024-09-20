import { Component } from "@angular/core";
import { slide } from "src/app/shared/animations/slide";
import { MenuID } from "src/app/shared/menu/menu-id.model";
import { rendersSectionForMenu } from "src/app/shared/menu/menu-section.decorator";
import {ExpandableNavbarSectionComponent as BaseComponent} from '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';

@Component({
    selector: 'ds-expandable-navbar-section',
    templateUrl: '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.html',
    // styleUrls: ['../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.scss'],
    styleUrls: ['./expandable-navbar-section.component.scss'],
    animations: [slide]
})
@rendersSectionForMenu(MenuID.PUBLIC, true)
export class ExpandableNavbarSectionComponent extends BaseComponent {
}