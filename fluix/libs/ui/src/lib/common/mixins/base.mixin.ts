import { ElementRef, Renderer2 } from '@angular/core';

export interface HasElementRef {
  _elementRef: ElementRef;
}

export interface HasRenderer {
  _renderer: Renderer2;
}

/**
 * Used for mixins that don't require any
 * dependencies.
 */
export interface HasNoDeps {}
