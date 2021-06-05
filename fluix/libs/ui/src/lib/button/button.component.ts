import { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { booleanInput } from '../core';

@Component({
  selector:
    'button[fxButton], button[fxIconButton], button[fxFabButton], button[fxActionButton]',
  template: `<span class="fx-button-wrapper"><ng-content></ng-content></span>
    <span
      matRipple
      class="fx-button-ripple"
      [class.mat-button-ripple-round]="isIconButton"
      [matRippleDisabled]="disableRipple"
      [matRippleCentered]="isIconButton"
      [matRippleTrigger]="_getHostElement()"
    ></span> `,
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FxButtonComponent {
  @Input()
  @HostBinding('attr.aria-disabled')
  @HostBinding('class.fx-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== booleanInput(value)) {
      this._disabled = !this.disabled;
      this.renderer.setProperty(
        this._getHostElement(),
        'disabled',
        this.disabled
      );
    }
  }
  private _disabled: boolean = false;

  @Input()
  get disableRipple() {
    return this._isRippleDisabled;
  }
  set disableRipple(status: boolean) {
    this._isRippleDisabled = booleanInput(status);
  }
  private _isRippleDisabled: boolean = false;

  @HostBinding('class.fx-button')
  get isRegularButton() {
    return this.hasAttribute('fxButton');
  }

  @HostBinding('class.fx-action-button')
  get isLinkButton() {
    return this.hasAttribute('fxActionButton');
  }

  @HostBinding('class.fx-icon-button')
  get isIconButton() {
    return this.hasAttribute('fxIconButton');
  }

  @HostBinding('class.fx-fab-button')
  get isFabButton() {
    return this.hasAttribute('fxFabButton');
  }

  constructor(
    private readonly elementRef: ElementRef<HTMLButtonElement>,
    private readonly renderer: Renderer2
  ) {}

  public _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private hasAttribute(...attributes: string[]) {
    return attributes.every((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
