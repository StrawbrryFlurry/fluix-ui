import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

export type FxColorStyle = 'basic' | 'primary' | 'accent' | 'warn' | 'success';

@Directive({ selector: 'fx-icon[color], button[color]' })
export class FxColorDirective<T extends HTMLElement = any>
  implements OnInit, OnChanges {
  @Input()
  get color() {
    return this._color;
  }
  set color(color: FxColorStyle) {
    this._color = color;
  }
  _color: FxColorStyle = 'basic';

  constructor(private readonly elementRef: ElementRef<T>) {}

  public setColorClass(): void;
  public setColorClass<T>(elementRef: ElementRef<T>): void;
  public setColorClass(elementRef?: ElementRef) {
    (elementRef ?? this.elementRef).nativeElement.classList.add(
      `fx-${this._color}`
    );
  }

  /**
   * Checks if the input native element is equal to the
   * native element of the directive
   */
  public matchElementRef<T>(elementRef: ElementRef<T>) {
    return elementRef.nativeElement === elementRef.nativeElement;
  }

  hasFxColorStyle() {
    return this.elementRef.nativeElement.hasAttribute('color');
  }

  hasColorAttribute(color: FxColorStyle) {
    return this.elementRef.nativeElement.getAttribute('color') === color;
  }

  ngOnInit(): void {
    this.setColorClass();
  }

  ngOnChanges(): void {
    this.setColorClass();
  }
}
