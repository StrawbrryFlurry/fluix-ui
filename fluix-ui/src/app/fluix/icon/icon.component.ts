import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { FxTypeDirective } from '../common/directives';

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
export class FxIconComponent implements OnInit, OnChanges {
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(state: boolean) {
    this._disabled = state;
  }
  private _disabled: boolean = false;

  @Input()
  get selectable(): boolean {
    return this._selectable;
  }
  set selectable(state: boolean) {
    this._selectable = state;
  }
  private _selectable: boolean = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLParagraphElement>,
    private readonly typeRef: FxTypeDirective<HTMLParagraphElement>
  ) {}

  ngOnInit(): void {
    this.applyTypeFromParent();
  }

  ngOnChanges(): void {
    this.applyTypeFromParent();
  }
  /**
   * If the icon is a child of a button or an other element
   * which has a type defined  we need to get the type from that
   * parent.
   */
  applyTypeFromParent() {
    if (this.typeRef.matchElementRef(this.elementRef)) {
      this.typeRef.setColorClass(this.elementRef);
    }
  }

  ngAcceptInputType_disabled: BooleanInput;
}
