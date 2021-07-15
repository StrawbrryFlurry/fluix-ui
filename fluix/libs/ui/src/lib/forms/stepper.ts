import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  ExistingProvider,
  forwardRef,
  Inject,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FxStep } from './step';

const FX_STEPPER_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FxStepper),
  multi: true,
};

const CDK_STEPPER_PROVIDER: ExistingProvider = {
  provide: CdkStepper,
  useExisting: forwardRef(() => FxStepper),
};

@Component({
  selector: `fx-stepper, fxStepper`,
  exportAs: 'fxStepper',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./stepper.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menubar',
    class: 'fx-stepper-container',
  },
  providers: [CDK_STEPPER_PROVIDER],
})
export class FxStepper extends CdkStepper implements AfterContentInit {
  @ContentChildren(FxStep, { descendants: true }) _steps!: QueryList<FxStep>;

  stepList: FxStep[] = [];

  constructor(
    _elementRef: ElementRef,
    _dir: Directionality,
    @Inject(DOCUMENT) _document: Document,
    _cd: ChangeDetectorRef
  ) {
    super(_dir, _cd, _elementRef, _document);
  }

  ngAfterContentInit(): void {}

  ngAfterViewInit() {
    console.log(this._steps);
  }
}
