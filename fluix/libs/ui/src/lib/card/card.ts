import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fx-card',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./card.scss'],
  host: {
    class: 'fx-card fx-theme',
    role: 'section',
  },
})
export class FxCard {}
