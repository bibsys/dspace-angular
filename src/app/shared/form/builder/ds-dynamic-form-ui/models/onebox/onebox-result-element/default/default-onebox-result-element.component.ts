import { Component } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { ObjNgFor } from "src/app/shared/utils/object-ngfor.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { AbstractOneboxResultElement } from "../abstract-onebox-result-element.component";
import { hasValue } from "src/app/shared/empty.util";
import { environment } from "src/environments/environment";

/**
 * Default component to use when no component is found for a specific metadata field.
 * This uses the exact same display and logic as what is in 'dynamic-onebox.component.html'.
 */
@Component({
  selector: 'ds-default-onebox-result-element',
  templateUrl: './default-onebox-result-element.component.html',
  styles: [".list-item img { height: 20px; }"],
  standalone: true,
  imports: [
    NgIf,
    ObjNgFor,
    TranslateModule,
    NgFor,
  ],
})
export class DefaultOneboxResultElementComponent extends AbstractOneboxResultElement {
  protected authorithyIcons = environment.submission.icons.authority.sourceIcons;
  
  /**
   * Get configured icon for each authority source
   * @param source
   */
  getAuthoritySourceIcon(source: string, image: HTMLElement): string {
    if (hasValue(this.authorithyIcons)) {
      const iconPath = this.authorithyIcons.find(icon => icon.source === source)?.path;

      if (!hasValue(iconPath)) {
        this.handleImgError(image);
      }

      return iconPath;
    } else {
      this.handleImgError(image);
    }

    return '';
  }

  /**
   * Hide image on error
   */
  handleImgError(image: HTMLElement): void {
    image.style.display = 'none';
  }
}