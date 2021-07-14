import { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  NgZone,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CanBeColored, CanBeDisabled, CanBeRipplesDisabled, FxColorDirective } from '../common';
import { FxRipple } from '../common/ripple';
import { isButtonSubmitPress } from '../core';

const FX_BUTTON_BASE = CanBeColored(
  CanBeRipplesDisabled(
    CanBeDisabled(
      class {
        constructor(
          public readonly _renderer: Renderer2,
          public readonly _elementRef: ElementRef,
          public readonly _colorDirectiveRef: FxColorDirective
        ) {}
      }
    )
  )
);

@Component({
  selector: `button[fxButton], button[fxIconButton], button[fxFabButton], button[fxActionButton],
     button[fx-button], button[fx-icon-button], button[fx-fab-button], button[fx-action-button]`,
  template: `<span class="fx-button-wrapper"><ng-content></ng-content></span>
    <span
      fxRipple
      class="fx-button-ripple"
      [class.fx-button-ripple-round]="isRoundButton"
      [fxRippleDisabled]="disableRipple"
      [fxRippleCentered]="isRoundButton"
      [fxRippleTrigger]="_getHostElement()"
    ></span> `,
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FxButton extends FX_BUTTON_BASE {
  @ViewChild(FxRipple) _rippleRef!: FxRipple;

  @HostBinding('class.fx-button')
  get isRegularButton() {
    return this.hasAttribute('fxButton', 'fx-button');
  }

  @HostBinding('class.fx-action-button')
  get isLinkButton() {
    return this.hasAttribute('fxActionButton', 'fx-action-button');
  }

  @HostBinding('class.fx-icon-button')
  get isIconButton() {
    return this.hasAttribute('fxIconButton', 'fx-icon-button');
  }

  @HostBinding('class.fx-fab-button')
  get isFabButton() {
    return this.hasAttribute('fxFabButton', 'fx-fab-button');
  }

  get isRoundButton() {
    return this.isIconButton || this.isFabButton;
  }

  @HostListener('focus')
  _onFocus() {
    /*
     * We don't need to run change detection
     * when a key is pressed while the user
     * has focused the button.
     */
    this._ngZone.runOutsideAngular(() => {
      this._rippleListenerSubscription = fromEvent<KeyboardEvent>(
        this._getHostElement(),
        'keypress'
      )
        .pipe(filter(isButtonSubmitPress))
        .subscribe(() => this._rippleRef.launch({ centered: true }));
    });
  }

  private _rippleListenerSubscription!: Subscription;

  @HostListener('blur')
  _onBlur() {
    this._rippleListenerSubscription.unsubscribe();
  }

  constructor(
    private readonly _ngZone: NgZone,
    _elementRef: ElementRef<HTMLButtonElement>,
    _renderer: Renderer2,
    @Optional() _colorDirectiveRef: FxColorDirective
  ) {
    super(_renderer, _elementRef, _colorDirectiveRef);
  }

  public _getHostElement() {
    return this._elementRef.nativeElement;
  }

  private hasAttribute(...attributes: string[]) {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
