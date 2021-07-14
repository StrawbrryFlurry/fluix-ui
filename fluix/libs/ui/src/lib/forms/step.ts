import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

const STATUS_ICONS: { [state in FxStepState]: string } = {
  open: 'circle',
  selected: 'circle',
  valid: 'check_circle',
  invalid: 'cancel',
};

export type FxStepState = 'valid' | 'invalid' | 'selected' | 'open';

@Component({
  selector: 'fx-step',
  styleUrls: ['./step.scss'],
  template: `
    <div class="fx-step-status">
      <fx-icon [outline]="state === 'open'" size="16">{{
        _getStateIcon()
      }}</fx-icon>
    </div>
    <div class="fx-step-content fx-caption">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-step',
  },
})
export class FxStep {
  @Input()
  state: FxStepState = 'open';

  @HostBinding('class.fx-step-finish')
  get isFinishStep(): boolean {
    return this._isFinishStep;
  }
  set isFinishStep(value: boolean) {
    this._isFinishStep = value;
  }
  private _isFinishStep!: boolean;

  @HostBinding(`class.fx-step-selected`)
  get isSelected(): boolean {
    return this.state === 'selected';
  }

  @HostBinding('class.fx-step-invalid')
  get isInvalid(): boolean {
    return this.state === 'invalid';
  }

  @HostBinding('class.fx-step-valid')
  get isValid(): boolean {
    return this.state === 'valid';
  }

  @HostBinding('class.fx-step-open')
  get isOpen(): boolean {
    return this.state === 'open';
  }

  _getStateIcon() {
    return STATUS_ICONS[this.state];
  }
}
