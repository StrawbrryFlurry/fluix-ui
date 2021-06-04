import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { getPointerPositionOnPage, isTouchEvent } from '../core';

export const FX_SLIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FxSliderComponent),
  multi: true,
};

export class FxSliderChange {
  source!: FxSliderComponent;
  value!: number;
}

/** The thumb gap size for a disabled slider. */
const DISABLED_THUMB_GAP = 7;

/** The thumb gap size for a non-active slider at its minimum value. */
const MIN_VALUE_NONACTIVE_THUMB_GAP = 7;

/** The thumb gap size for an active slider at its minimum value. */
const MIN_VALUE_ACTIVE_THUMB_GAP = 10;

const activeEventOptions = normalizePassiveListenerOptions({ passive: false });

@Component({
  selector: 'fx-slider',
  exportAs: 'fxSlider',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focus)': '_onFocus()',
    /**
     * @see https://angular.io/api/forms/ControlValueAccessor#registerontouched
     */
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
    '(keyup)': '_onKeyup()',
    '(mouseenter)': '_onMouseenter()',

    // On Safari starting to slide temporarily triggers text selection mode which
    // show the wrong cursor. We prevent it by stopping the `selectstart` event.
    '(selectstart)': '$event.preventDefault()',
    class: 'fx-slider',
    role: 'slider',
    '[tabIndex]': 'tabIndex',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-valuemax]': 'max',
    '[attr.aria-valuemin]': 'min',
    '[attr.aria-valuenow]': 'value',

    // NVDA and Jaws appear to announce the `aria-valuenow` by calculating its percentage based
    // on its value between `aria-valuemin` and `aria-valuemax`. Due to how decimals are handled,
    // it can cause the slider to read out a very long value like 0.20000068 if the current value
    // is 0.2 with a min of 0 and max of 1. We work around the issue by setting `aria-valuetext`
    // to the same value that we set on the slider's thumb which will be truncated.
    // @angular/material slider
    '[attr.aria-valuetext]': 'valueText == null ? displayValue : valueText',
    '[class.fx-slider-disabled]': 'disabled',
    // Add steps to the component
    // '[class.fx-slider-has-ticks]': 'tickInterval',
    '[class.fx-slider-horizontal]': '!vertical',
    //'[class.fx-slider-axis-inverted]': '_shouldInvertAxis()',
    '[class.fx-slider-vertical]': 'vertical',
    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
    '[class.fx-slider-sliding]': '_isSliding',
    //'[class.fx-slider-thumb-label-showing]': 'thumbLabel',
    //'[class.fx-slider-min-value]': '_isMinValue()',
  },
  providers: [FX_SLIDER_VALUE_ACCESSOR],
})
export class FxSliderComponent implements OnDestroy {
  private _vertical: boolean = false;
  private _disabled: boolean = false;
  private _isSliding: boolean = false;

  private _step: number = 1;

  private _min!: number;
  private _max!: number;
  private _isActive: boolean = false;
  private _value: number | null = null;
  private _valueOnSlideStart: number | null = null;

  /** Keeps track of the last pointer event that was captured by the slider. */
  private _lastPointerEvent!: MouseEvent | TouchEvent | null;

  public valueText: unknown;
  public displayValue: string;

  @Input()
  public get value(): number | null {
    return this._value;
  }
  public set value(value: number | null) {
    this._value = value;
  }

  @Input()
  public get step(): number {
    return this._step;
  }
  public set step(value: number) {
    this._step = value;
  }

  @Input()
  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    this._vertical = value;
  }

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input()
  public get min(): number {
    return this._max;
  }
  public set min(value: number) {
    const number = coerceNumberProperty(value);
    this._min = number;
  }

  @Input()
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    const number = coerceNumberProperty(value);
    this._max = number;
  }

  /** Event emitted when the slider value has changed. */
  @Output()
  readonly change: EventEmitter<FxSliderChange> = new EventEmitter<FxSliderChange>();

  /** Event emitted when the slider thumb moves. */
  @Output()
  readonly input: EventEmitter<FxSliderChange> = new EventEmitter<FxSliderChange>();

  /**
   * Emits when the raw value of the slider changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<
    number | null
  > = new EventEmitter<number | null>();

  @ViewChild('sliderWrapper') private _sliderWrapper!: ElementRef;

  get percent(): number {
    return this._clamp(this._percent);
  }

  private _percent: number = 0;

  constructor(
    @Inject(DOCUMENT) private readonly _document: any,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _ngZone: NgZone,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _elementRef: ElementRef
  ) {
    _ngZone.runOutsideAngular(() => {
      const element = _elementRef.nativeElement;
      const pointerDown = this._pointerDown.bind(this);
      element.addEventListener('mousedown', pointerDown, activeEventOptions);
      element.addEventListener('touchstart', pointerDown, activeEventOptions);
    });
  }

  public _onMouseenter() {
    // Hover
  }

  private _pointerDown(event: MouseEvent | TouchEvent) {
    if (
      this.disabled ||
      this._isSliding ||
      (!isTouchEvent(event) && event.button !== 0)
    ) {
      return;
    }

    this._ngZone.run(() => {
      const oldValue = this.value;
      const pointerPosition = getPointerPositionOnPage(event);
      this._isSliding = true;
      this._lastPointerEvent = event;
      event.preventDefault();
      this._focusHostElement();
      this._onMouseenter(); // Simulate mouseenter in case this is a mobile device.
      this._bindGlobalEvents(event);
      this._focusHostElement();
      this._updateValueFromPosition(pointerPosition);
      this._valueOnSlideStart = oldValue;

      // Emit a change and input event if the value changed.
      if (oldValue != this.value) {
        this._emitInputEvent();
      }
    });
  }

  private _bindGlobalEvents(triggerEvent: TouchEvent | MouseEvent) {
    const document = this._document;
    const isTouch = isTouchEvent(triggerEvent);
    const moveEventName = isTouch ? 'touchmove' : 'mousemove';
    const endEventName = isTouch ? 'touchend' : 'mouseup';

    const pointerMove = this._pointerMove.bind(this);
    const pointerUp = this._pointerUp.bind(this);
    const windowBlur = this._windowBlur.bind(this);

    document.addEventListener(moveEventName, pointerMove, activeEventOptions);

    document.addEventListener(endEventName, pointerUp, activeEventOptions);

    if (isTouch) {
      document.addEventListener('touchcancel', pointerUp, activeEventOptions);
    }

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.addEventListener('blur', windowBlur);
    }
  }

  private _unbindGlobalEvents() {
    console.log();
    const document = this._document;
    document.removeEventListener(
      'mousemove',
      this._pointerMove,
      activeEventOptions
    );
    document.removeEventListener(
      'mouseup',
      this._pointerUp,
      activeEventOptions
    );
    document.removeEventListener(
      'touchmove',
      this._pointerMove,
      activeEventOptions
    );
    document.removeEventListener(
      'touchend',
      this._pointerUp,
      activeEventOptions
    );
    document.removeEventListener(
      'touchcancel',
      this._pointerUp,
      activeEventOptions
    );

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('blur', this._windowBlur);
    }
  }

  private _focusHostElement(options?: FocusOptions) {
    this._elementRef.nativeElement.focus();
  }

  private _windowBlur() {
    if (this._lastPointerEvent) {
      this._pointerUp(this._lastPointerEvent);
    }
  }

  private _pointerMove(event: MouseEvent | TouchEvent) {
    if (!this._isSliding) {
      return;
    }

    // Prevent the slide from selecting anything else.
    event.preventDefault();
    const oldValue = this.value;
    this._lastPointerEvent = event;
    this._updateValueFromPosition(getPointerPositionOnPage(event));

    // Native range elements always emit `input` events when the value changed while sliding.
    if (oldValue != this.value) {
      this._emitInputEvent();
    }
  }

  /** Calculate the new value from the new physical location. The value will always be snapped. */
  private _updateValueFromPosition(pos: { x: number; y: number }) {
    if (!this._sliderDimensions) {
      return;
    }

    let offset = this.vertical
      ? this._sliderDimensions.top
      : this._sliderDimensions.left;
    let size = this.vertical
      ? this._sliderDimensions.height
      : this._sliderDimensions.width;
    let posComponent = this.vertical ? pos.y : pos.x;

    // The exact value is calculated from the event and used to find the closest snap value.
    let percent = this._clamp((posComponent - offset) / size);

    // Since the steps may not divide cleanly into the max value, if the user
    // slid to 0 or 100 percent, we jump to the min/max value. This approach
    // is slightly more intuitive than using `Math.ceil` below, because it
    // follows the user's pointer closer.
    if (percent === 0) {
      this.value = this.min;
    } else if (percent === 1) {
      this.value = this.max;
    } else {
      const exactValue = this._calculateValue(percent);

      // This calculation finds the closest step by finding the closest
      // whole number divisible by the step relative to the min.
      const closestValue =
        Math.round((exactValue - this.min) / this.step) * this.step + this.min;

      // The value needs to snap to the min and max.
      this.value = this._clamp(closestValue, this.min, this.max);
      console.log(this.value);
    }
  }

  private _emitChangeEvent() {
    this._onChange(this.value);
    this.valueChange.emit(this.value);
    this.change.emit(this._createChangeEvent());
  }

  /** Calculates the value a percentage of the slider corresponds to. */
  private _calculateValue(percentage: number) {
    return this.min + percentage * (this.max - this.min);
  }

  private _createChangeEvent(value = this.value): FxSliderChange {
    let event = new FxSliderChange();

    event.source = this;
    event.value = value as number;

    return event;
  }

  private _emitInputEvent() {
    this.input.emit();
  }

  private _getWindow() {
    return this._document.defaultView ?? window;
  }

  private _pointerUp(event: MouseEvent | TouchEvent) {
    this._unbindGlobalEvents();
  }

  public _onKeydown(event: KeyboardEvent) {
    if (this._disabled) {
      return;
    }

    const oldValue = this.value;

    switch (event.code) {
      case 'PageUp':
        this._increment(10);
        break;
      case 'PageDown':
        this._increment(-10);
        break;
      case 'End':
        this.value = this.max;
        break;
      case 'Home':
        this.value = this.min;
        break;
      case 'ArrowLeft':
        this._increment(-1);
        break;
      case 'ArrowUp':
        this._increment(1);
        break;
      case 'ArrowRight':
        this._increment(1);
        break;
      case 'ArrowDown':
        this._increment(-1);
        break;
      default:
        return;
    }

    if (oldValue != this.value) {
      this._emitInputEvent();
      this._emitChangeEvent();
    }

    this._isSliding = true;
    event.preventDefault();
  }

  public _onFocus() {
    // Focus
  }

  public _onKeyup() {
    this._isSliding = false;
  }

  public _onBlur() {
    this._onTouched();
  }

  private _increment(steps: number) {
    const stepSize = steps * this._step;
    const increment = this._clamp(stepSize, this._min, this._max);
    this.value = this.value ?? 0 + increment;
  }

  public _getSliderThumbStyle() {
    return {};
  }

  public _getSliderBackgroundStyle() {
    return {};
  }

  public _getSliderActiveStyle() {
    const percent = this.percent;
    const axis = this.vertical ? 'Y' : 'X';
    const scale = this.vertical ? `1, ${percent}, 1` : `${percent}, 1, 1`;

    return {
      // scale3d avoids some rendering issues in Chrome. See #12071.
      transform: `translate${axis}(${this._getThumbGap()}px) scale3d(${scale})`,
      // iOS Safari has a bug where it won't re-render elements which start of as `scale(0)` until
      // something forces a style recalculation on it. Since we'll end up with `scale(0)` when
      // the value of the slider is 0, we can easily get into this situation. We force a
      // recalculation by changing the element's `display` when it goes from 0 to any other value.
      display: percent === 0 ? 'none' : '',
    };
  }

  /** Whether the slider is at its minimum value. */
  _isMinValue() {
    return this.percent === 0;
  }

  /**
   * The amount of space to leave between the slider thumb and the track fill & track background
   * elements.
   */
  _getThumbGap() {
    if (this.disabled) {
      return DISABLED_THUMB_GAP;
    }

    if (this._isMinValue()) {
      return this._isActive
        ? MIN_VALUE_ACTIVE_THUMB_GAP
        : MIN_VALUE_NONACTIVE_THUMB_GAP;
    }
    return 0;
  }

  private get _sliderDimensions(): ClientRect | null {
    return (
      (this._sliderWrapper &&
        this._sliderWrapper.nativeElement.getBoundingClientRect()) ||
      null
    );
  }

  /** Prevents the value form exceeding `max` */
  private _clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

  public ngAfterViewInit() {
    this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe((origin: FocusOrigin) => {
        this._isActive = !!origin && origin !== 'keyboard';
        this._changeDetectorRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    const element = this._elementRef.nativeElement;
    element.addEventListener(
      'mousedown',
      this._pointerDown,
      activeEventOptions
    );
    element.addEventListener(
      'touchstart',
      this._pointerDown,
      activeEventOptions
    );

    this._unbindGlobalEvents();
  }

  static ngAcceptInputType_invert: BooleanInput;
  static ngAcceptInputType_max: NumberInput;
  static ngAcceptInputType_min: NumberInput;
  static ngAcceptInputType_step: NumberInput;
  static ngAcceptInputType_thumbLabel: BooleanInput;
  static ngAcceptInputType_tickInterval: NumberInput;
  static ngAcceptInputType_value: NumberInput;
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_tabIndex: NumberInput;

  /**
   * Implemented as part of ControlValueAccessor
   * @see https://angular.io/api/forms/ControlValueAccessor
   */
  private _onTouched: any = () => {};
  private _onChange: any = () => {};

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
