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

  private setColorClass() {
    this.elementRef.nativeElement.classList.add(`fx-${this._type}`);
  }

  ngOnInit(): void {
    this.setColorClass();
  }

  ngOnChanges(): void {
    this.setColorClass();
  }
}
