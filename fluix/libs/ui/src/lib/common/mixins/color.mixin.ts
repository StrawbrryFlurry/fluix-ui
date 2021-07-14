import { Type } from '@angular/core';

import { isNil } from '../../core';
import { FxColorDirective } from '../directives';
import { HasElementRef } from './base.mixin';

export interface CanBeColored {
  /**
   * `@Optional()`
   * Inject this dependency as optional as it might not exist
   *
   * `@Self()`
   * Inject this dependency as `Self`so that it doesn't use
   * the provider from a parent injector.
   *  @example
   * `@Optional` `@Self` _colorDirectiveRef: FxColorDirective
   */
  _colorDirectiveRef: FxColorDirective;
}

// We can use one interface as the mixin doesn't add
// any additional properties.
export interface CanBeColoredCtor extends CanBeColored, HasElementRef {}

/**
 * Adds a color input to the component / directive which uses {@link FxColorDirective}
 */
export function CanBeColored<T extends Type<CanBeColoredCtor>>(Base: T) {
  return class extends Base {
    constructor(...args: any) {
      super(...args);
      if (isNil(this._colorDirectiveRef)) {
        this._colorDirectiveRef = new FxColorDirective(this._elementRef);
        this._colorDirectiveRef.ngOnInit();
      }
    }

    ngOnChanges() {
      this._colorDirectiveRef.ngOnChanges();
    }
  };
}
