import { CdkStep } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { FxStepper } from './stepper';

const STATUS_ICONS: { [state in FxStepState]: string } = {
  open: 'circle',
  selected: 'circle',
  valid: 'check_circle',
  invalid: 'cancel',
};

export type FxStepState = 'valid' | 'invalid' | 'selected' | 'open';

@Component({
  selector: 'fx-step, fxStep',
  exportAs: 'fxStep',
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
export class FxStep extends CdkStep {
  @Input()
  state: FxStepState = 'open';

  index!: number;

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

  @HostBinding('style.gridArea')
  get gridArea() {
    return `${this.index} / 1 / auto / 4`;
  }

  constructor(private _stepperRef: FxStepper) {
    super(_stepperRef);
  }

  ngOnInit(): void {}

  _getStateIcon() {
    return STATUS_ICONS[this.state];
  }
}

/* 
function StepGridStep({ groupName, status, row }: StepProps & { row: number }) {
  return (
    <li
      className="step-grid-step"
      style={{ gridArea: `${row} / 1 / auto / 4` }}
    >
      <button className="step-grid-step-inner">
        <div className={`circle ${status}`} />
        <div>&nbsp;</div>
        <h4 className="group-name">{groupName}</h4>
      </button>
    </li>
  );
}

export default function App() {
  return (
    <div className="App">
      <StepGrid>
        <StepGridStep groupName="foo" row={1} status={Status.FAILED} />
        <StepGridStep groupName="bar" row={2} status={Status.SUCCEEDED} />
        <StepGridStep groupName="bar" row={3} status={Status.SUCCEEDED} />
        <StepGridStep groupName="baz" row={4} status={Status.PENDING} />
      </StepGrid>
    </div>
  );

:root {
  --circle-diameter: 24px;
}

.step-grid {
  display: grid;
  grid-template-columns: calc((var(--circle-diameter) / 2) - 1px) 2px minmax(
      0px,
      1fr
    );
  list-style: none;
  margin: 0px;
  padding: 0px;
  position: relative;
}

.step-grid::before {
  content: "";
  display: block;
  grid-area: 1 / 2 / 5 / auto;
  background-color: rgb(148, 148, 148);
  z-index: 0;
  opacity: 1;
}

.step-grid-step {
  z-index: 2;
  list-style: none;
}

.step-grid-step:not(:last-child) {
  margin-bottom: 36px;
}

.step-grid-step-inner {
  clip-path: inset(-2px -2px -2px -2px);
  outline: transparent;
  position: relative;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  background: none;
  width: 100%;
  border: none;
  text-align: left;
  padding: 0px;
}

.group-name {
  align-self: center;
}

.circle {
  width: calc(var(--circle-diameter) - 4px);
  height: calc(var(--circle-diameter) - 4px);
  border-radius: calc((var(--circle-diameter)) / 2);
  border: 2px solid white;
}
*/
