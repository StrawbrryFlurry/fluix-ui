import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { CanBeColored, CanBeDisabled } from '../common';
import { FxColorDirective } from '../common/directives';
import { booleanInput } from '../core';

const ICON_BASE = CanBeColored(
  CanBeDisabled(
    class {
      constructor(
        readonly _elementRef: ElementRef,
        readonly _renderer: Renderer2,
        readonly _colorDirectiveRef: FxColorDirective
      ) {}
    }
  )
);

const MATERIAL_ICON_CLASSES = {
  normal: 'material-icons-round',
  outlined: 'material-icons-outlined',
};

@Component({
  selector: 'fx-icon',
  exportAs: 'fxIcon',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./icon.scss'],
  host: {
    role: 'img',
    class: 'fx-icon notranslate',
    '[class.disabled]': 'disabled',
    '[attr.disabled]': 'disabled',
    '[class.fx-selectable]': 'selectable',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FxIconComponent extends ICON_BASE implements OnInit, OnChanges {
  @Input()
  get outline(): boolean | string {
    return this._outline;
  }
  set outline(value: boolean | string) {
    this._outline = coerceBooleanProperty(value);
  }
  private _outline: boolean = false;

  @Input()
  get size(): number | string {
    return this._size;
  }
  set size(value: number | string) {
    this._size = coerceNumberProperty(value);
  }
  private _size: number = 24;

  @Input()
  get selectable(): boolean {
    return this._selectable;
  }
  set selectable(state: boolean) {
    this._selectable = booleanInput(state);
  }
  private _selectable: boolean = false;

  constructor(
    readonly _elementRef: ElementRef<HTMLParagraphElement>,
    readonly _renderer: Renderer2,
    @Optional()
    readonly _colorDirectiveRef: FxColorDirective<HTMLParagraphElement>
  ) {
    super(_elementRef, _renderer, _colorDirectiveRef);
  }

  private _getSizeStyle() {
    const size = `${this.size}px`;

    return {
      width: size,
      height: size,
      'font-size': size,
    };
  }

  private _applyStyles() {
    const styles = this._getSizeStyle();

    Object.entries(styles).forEach(([key, value]) => {
      this._renderer.setStyle(this._elementRef.nativeElement, key, value);
    });

    Object.entries(MATERIAL_ICON_CLASSES).forEach(([key, value]) => {
      this._renderer.removeClass(this._elementRef.nativeElement, value);
    });

    const iconClass = this._outline
      ? MATERIAL_ICON_CLASSES['outlined']
      : MATERIAL_ICON_CLASSES['normal'];

    this._renderer.addClass(this._elementRef.nativeElement, iconClass);
  }

  ngOnInit(): void {
    // TODO:
    // This might make the API confusing
    // this.applyTypeFromParent();
    this._applyStyles();
  }

  ngOnChanges(): void {
    // this.applyTypeFromParent();
    this._applyStyles();
  }

  /**
   * If the icon is a child of a button or an other element
   * which has a type defined  we need to get the type from that
   * parent.
   */
  _applyTypeFromParent() {
    if (this._colorDirectiveRef.matchElementRef(this._elementRef)) {
      this._colorDirectiveRef.setColorClass(this._elementRef);
    }
  }

  ngAcceptInputType_size: NumberInput;
  ngAcceptInputType_disabled: BooleanInput;
  ngAcceptInputType_outline: BooleanInput;
  ngAcceptInputType_selectable: BooleanInput;
}
