import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fx-card-header',
  template: `
    <div class="fx-card-header-title">
      <ng-content
        select="fx-card-title, fx-card-subtitle,
      [fx-card-title], [fx-card-subtitle],
      [fxCardTitle], [fxCardSubtitle]"
      ></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fx-card-header',
    role: 'header',
  },
})
export class FxCardHeader {}

@Component({
  selector: 'fx-card-title',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'fx-card-title fx-subtitle fx-on-surface-high',
  },
})
export class FxCardTitle {}

@Component({
  selector: 'fx-card-subtitle',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'fx-card-subtitle fx-subtitle-bold fx-on-surface-medium',
  },
})
export class FxCardSubtitle {}
