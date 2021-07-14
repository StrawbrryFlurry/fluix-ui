import { ChangeDetectionStrategy, Component, ElementRef, Optional, Renderer2, ViewEncapsulation } from '@angular/core';

import { CanBeColored, CanBeDisabled, FxColorDirective } from '../common';

const FX_MENU_ITEM_BASE = CanBeDisabled(
  CanBeColored(
    class {
      constructor(
        public readonly _elementRef: ElementRef,
        public readonly _colorDirectiveRef: FxColorDirective,
        public readonly _renderer: Renderer2
      ) {}
    }
  )
);

@Component({
  selector: 'button[fx-menu-item]',
  template: `
    <ng-content></ng-content>
    <div [fxRippleDisabled]="disabled" fx-ripple class="fx-menu-ripple"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'fx-menu-item', '[attr.role]': 'menuitem' },
})
export class FxMenuItem extends FX_MENU_ITEM_BASE {
  constructor(
    readonly _elementRef: ElementRef,
    readonly _renderer: Renderer2,
    @Optional() _colorDirectiveRef: FxColorDirective
  ) {
    super(_elementRef, _colorDirectiveRef, _renderer);
  }
}
