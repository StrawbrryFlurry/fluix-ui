import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fx-icon',
  exportAs: 'fxIcon',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./icon.scss'],
  host: {
    role: 'img',
    class: 'fx-icon notranslate',
    '[class.disabled]': 'disabled',
    '[attr.disabled]': 'disabled',
    '[class.fx-selectable]': 'selectable',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FxIconComponent implements OnInit {
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(state: boolean) {
    this._disabled = state;
  }
  private _disabled: boolean = false;

  @Input()
  get selectable(): boolean {
    return this._selectable;
  }
  set selectable(state: boolean) {
    this._selectable = state;
  }
  private _selectable: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAcceptInputType_disabled: BooleanInput;
}
