import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {
  src = input.required<string>();
  alt = input.required<string>();
}
