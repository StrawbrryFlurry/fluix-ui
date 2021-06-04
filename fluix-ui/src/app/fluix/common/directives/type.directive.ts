import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

export type FxStyleType = 'basic' | 'primary' | 'accent' | 'warn' | 'success';

@Directive({ selector: 'fx-icon[type], button[type]' })
export class FxTypeDirective<T extends HTMLElement>
  implements OnInit, OnChanges {
  @Input()
  get type() {
    return this._type;
  }
  set type(type: FxStyleType) {
    this._type = type;
  }
  _type!: FxStyleType;

  constructor(private readonly elementRef: ElementRef<T>) {}

  public setColorClass(): void;
  public setColorClass<T>(elementRef: ElementRef<T>): void;
  public setColorClass(elementRef?: ElementRef) {
    (elementRef ?? this.elementRef).nativeElement.classList.add(
      `fx-${this._type}`
    );
  }

  /**
   * Checks if the input native element is equal to the
   * native element of the directive
   */
  public matchElementRef<T>(elementRef: ElementRef<T>) {
    return elementRef.nativeElement === elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setColorClass();
  }

  ngOnChanges(): void {
    this.setColorClass();
  }
}
