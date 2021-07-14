import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type FxDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'fx-divider',
  template: ``,
  styleUrls: ['./divider.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-divider',
    '[attr.role]': 'divider',
    '[class.fx-divider-horizontal]': 'isHorizontal',
    '[class.fx-divider-vertical]': '!isHorizontal',
  },
})
export class FxDivider {
  @Input()
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation: FxDividerOrientation) {
    this._orientation = orientation;
  }

  get isHorizontal() {
    return this._orientation === 'horizontal';
  }

  private _orientation: FxDividerOrientation = 'horizontal';
}
