import { Directive, Input, Type } from '@angular/core';

import { booleanInput } from '../../core';
import { HasNoDeps } from './base.mixin';

export interface CanBeRipplesDisabledCtor extends HasNoDeps {}

/**
 * If the component has a ripple effect the input of this mixin can be used to disable
 * said ripple effects on the component.
 */
export function CanBeRipplesDisabled<T extends Type<CanBeRipplesDisabledCtor>>(
  Base: T
) {
  @Directive()
  class Temporary extends Base {
    constructor(...args: any) {
      super(...args);
    }

    @Input()
    get disableRipple() {
      return this._isRippleDisabled;
    }
    set disableRipple(status: boolean) {
      this._isRippleDisabled = booleanInput(status);
    }

    public _isRippleDisabled: boolean = false;
  }

  return Temporary;
}
