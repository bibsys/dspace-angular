import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MetricDonutsComponent } from "../metric-donuts.component";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { MetricLoaderComponent } from "src/app/shared/metric/metric-loader/metric-loader.component";

@Component({
	selector: 'ds-metric-donuts-row',
	templateUrl: './metric-donuts-row.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		NgIf,
		AsyncPipe,
		NgForOf,
		MetricLoaderComponent,
	]
})
/**
 * Like {@link MetricDonutsComponent} but displays in a row form.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
export class MetricDonutsRowComponent extends MetricDonutsComponent {
}