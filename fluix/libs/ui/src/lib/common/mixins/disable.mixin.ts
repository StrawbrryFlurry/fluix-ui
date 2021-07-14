import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input, Type } from '@angular/core';

import { booleanInput } from '../../core';
import { HasElementRef, HasRenderer } from './base.mixin';

export interface CanBeDisabled {
  /**
   * Input for the current state of the
   * component.
   *
   * _disabled also exists on the
   * parent class as a protected
   * property.
   */
  disabled: boolean;
}

export interface CanBeDisabledCtor extends HasRenderer, HasElementRef {}

/**
 * Adds a disabled input to the component / directive
 */
export function CanBeDisabled<T extends Type<CanBeDisabledCtor>>(Base: T) {
  // The temporary class is necessary to
  // use decorators as they are not supported
  // in anonymous classes.
  @Directive()
  class Temporary extends Base {
    @Input()
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.fx-disabled')
    get disabled(): boolean {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const booleanValue = booleanInput(value);
      if (this.disabled !== booleanValue) {
        this._disabled = booleanValue;
        this._renderer.setProperty(
          this._elementRef.nativeElement,
          'disabled',
          this._disabled
        );
      }
    }

    _disabled: boolean = false;
    static ngAcceptInputType_disabled: BooleanInput;
  }

  return Temporary;
}
