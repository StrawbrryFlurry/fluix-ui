import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';

const BUTTON_ATTRIBUTES = ['fxButton', 'fxIconButton', 'fxSelectButton'];

@Component({
  selector: 'button[fxButton], button[fxIconButton], button[fxLinkButton]',
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
  host: {
    '[class.fx-button-disabled]': 'disabled',
  },
})
export class FxButtonComponent {
  constructor(private readonly elementRef: ElementRef<HTMLButtonElement>) {}

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(state: boolean) {
    this._disabled = state;
  }
  private _disabled: boolean = false;

  @Input()
  get disableRipple() {
    return this._isRippleDisabled;
  }
  set disableRipple(status: boolean) {
    this._isRippleDisabled = status;
  }
  private _isRippleDisabled: boolean = false;

  @HostBinding('class.fx-button')
  get isRegularButton() {
    return this.hasAttribute('fxButton');
  }

  @HostBinding('class.fx-link-button')
  get isLinkButton() {
    return this.hasAttribute('fxLinkButton');
  }

  @HostBinding('class.fx-icon-button')
  get isIconButton() {
    return this.hasAttribute('fxIconButton');
  }

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
