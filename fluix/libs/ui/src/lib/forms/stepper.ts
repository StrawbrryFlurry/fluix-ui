import { NumberInput } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CanBeDisabled } from '../common';

/**
 * Yes, this file has like 10 components in it.
 * We require all of these components to be in
 * the same file to avoid circular dependencies.
 *
 * Most stepper components need to have a reference
 * to the original host stepper to check for their
 * relative index in the list and such.
 */

/* States of a step */
export type FxStepStatus = 'open' | 'selected' | 'valid' | 'invalid';

export interface FxStepStatusChanged {
  previousStatus: FxStepStatus;
  nextStatus: FxStepStatus;
}

@Component({
  selector: 'fx-step, fxStep',
  exportAs: 'fxStep',
  styleUrls: ['./step.scss'],
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-step',
  },
  providers: [],
})
export class FxStep {
  @Input()
  get status(): FxStepStatus {
    return this._status;
  }
  set status(value: FxStepStatus) {
    this._statusChange.next({
      nextStatus: value,
      previousStatus: this._status,
    });
    this._status = value;
  }
  private _status: FxStepStatus = 'open';

  @Input()
  label: string = '';

  get index() {
    return this._stepperRef.stepsList.indexOf(this);
  }

  get hasError() {
    return '';
  }

  get isCompleted() {
    return '';
  }

  get isLastStep() {
    const lastStepIndex = this._stepperRef.stepsList.length - 1;
    return lastStepIndex === this.index;
  }

  get statusChange() {
    return this._statusChange.asObservable();
  }

  private _statusChange = new Subject<FxStepStatusChanged>();

  constructor(
    private readonly _stepperRef: FxStepper,
    private readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  _detectChanges() {
    this._cd.detectChanges();
  }
}

const FX_STEPPER_BASE = CanBeDisabled(
  class {
    constructor(
      readonly _elementRef: ElementRef,
      readonly _renderer: Renderer2
    ) {}
  }
);

@Component({
  selector: `fx-stepper, fxStepper`,
  exportAs: 'fxStepper',
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menubar',
    class: 'fx-stepper-container',
  },
  providers: [],
})
export class FxStepper
  extends FX_STEPPER_BASE
  implements AfterContentInit, OnDestroy
{
  @ContentChildren(FxStep, { descendants: true }) _steps!: QueryList<FxStep>;

  selectedIndex: number = 0;

  get steps() {
    return this._steps;
  }

  get stepsList() {
    return this._steps.toArray();
  }

  protected _destroyed = new Subject<void>();

  constructor(
    readonly _elementRef: ElementRef,
    readonly _renderer: Renderer2,
    protected _cd: ChangeDetectorRef
  ) {
    super(_elementRef, _renderer);
  }

  ngAfterContentInit(): void {
    // Marks the component for cd if the steps change
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._cd.detectChanges();
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this._destroyed.next();
  }
}

const STATUS_ICONS: { [status in FxStepStatus]: string } = {
  open: 'circle',
  selected: 'circle',
  valid: 'check_circle',
  invalid: 'cancel',
};

@Component({
  selector: 'fx-step-label, fxStepLabel',
  styleUrls: ['./step-label.scss'],
  template: `
    <div class="fx-step-label-status">
      <fx-icon [outline]="step.status === 'open'" size="16">{{
        _getStatusIcon()
      }}</fx-icon>
    </div>
    <div class="fx-step-label-text fx-caption">
      {{ step.label }}
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-step-label',
  },
})
export class FxStepLabel implements OnInit, OnDestroy {
  @Input() step!: FxStep;

  @HostBinding('style.gridArea')
  get gridArea() {
    return `${this.gridIndex} / 1 / auto / 4`;
  }

  get gridIndex() {
    return this.step.index + 1;
  }

  @HostBinding('class.fx-step-last')
  get isLastStep() {
    return this._stepperRef.stepsList.length === this.gridIndex;
  }

  private _destroyed = new Subject<void>();

  constructor(
    private _stepperRef: FxStepper,
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    // this.step.statusChange.pipe(takeUntil(this._destroyed)).subscribe();
  }

  @HostBinding('class')
  get stepLabel() {
    return `fx-step-label-${this.step.status}`;
  }

  _getStatusIcon(): any {
    return STATUS_ICONS[this.step.status];
  }

  ngOnDestroy() {
    this._destroyed.next();
  }

  static ngAcceptInputType_index: NumberInput;
}

@Component({
  selector: 'fx-step-label-separator',
  template: ``,
  styles: [
    `
      .fx-step-label-separator {
        background-color: black;
      }
    `,
  ],
  host: {
    class: 'fx-step-label-separator',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FxStepLabelSeparator {
  @Input('index') index!: number;

  get gridIndex() {
    return this.index + 1;
  }

  /**
   * Positions the separator in the
   * center of the parent label icon.
   *
   * Start in row [gridIndex] which
   * is the current row of the label
   *
   * Start in column 2 which is positioned
   * [labelIconWidth] / 2 - 1px from the left
   * which centers this 1px line directly in the
   * center of the label icon.
   *
   * End on the same row. We only want a
   * separator to be responsible for its row
   */
  @HostBinding('style.gridArea')
  get style() {
    return `${this.gridIndex} / 2 / ${this.gridIndex} / auto`;
  }

  ngAcceptInputType_gridIndex: NumberInput;
}
