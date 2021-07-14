import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { isNil } from '../core';
import { FxMenu } from './menu';

type TConnectedXPosition = 'start' | 'center' | 'end';
type TConnectedYPosition = 'top' | 'center' | 'bottom';

@Directive({
  selector: '[fx-menu-trigger-for]',
  exportAs: 'fxMenuTriggerFor',
  host: {
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'isOpen || null',
  },
})
export class FxMenuTriggerFor {
  @Input('fx-menu-trigger-for') _menuRef!: FxMenu;

  private _portal!: TemplatePortal;
  private _overlayRef!: OverlayRef;

  private readonly _isOverlayVisible!: Observable<boolean>;
  private isOpen: boolean = false;
  private isMenuOpen = new BehaviorSubject<boolean>(false);

  @HostListener('click')
  _onClick() {
    const portalRef = this._getPortal();
    this._createOverlay().attach(portalRef);
  }

  @HostListener('blur')
  _onBlur() {
    //this._createOverlay().detach();
  }

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _overlay: Overlay
  ) {}

  private _getPortal() {
    if (isNil(this._portal)) {
      this._portal = new TemplatePortal(
        this._menuRef.menuTemplateRef,
        this._viewContainerRef
      );
    }

    return this._portal;
  }

  private _close() {
    if (!this.isOpen || this._overlayRef) {
      return;
    }
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions(this._getPositionStrategy())
        .withLockedPosition()
        .withGrowAfterOpen()
        .withTransformOriginOn('.fx-menu-panel'),
      // We don't want any backdrop blur
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'fx-menu',
      //scrollStrategy: this._scrollStrategy(),
    });
  }

  private _createOverlay(): OverlayRef {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig();
      this._overlayRef = this._overlay.create(config);

      // Consume the `keydownEvents` in order to prevent them from going to another overlay.
      // Ideally we'd also have our keyboard event logic in here, however doing so will
      // break anybody that may have implemented the `MatMenuPanel` themselves.
      this._overlayRef.keydownEvents().subscribe();
    }

    return this._overlayRef;
  }

  private _getPositionStrategy(): ConnectedPosition[] {
    const { xPosition, yPosition } = this._menuRef;
    let x: TConnectedXPosition, y: TConnectedYPosition;

    switch (xPosition) {
      case 'before':
        x = 'start';
        break;
      case 'center':
        x = 'center';
        break;
      case 'after':
        x = 'end';
        break;
      default:
        x = 'end';
    }

    switch (yPosition) {
      case 'above':
        y = 'top';
        break;
      case 'center':
        y = 'center';
        break;
      case 'below':
        y = 'bottom';
        break;
      default:
        y = 'bottom';
    }

    return [{ originX: x, originY: y, overlayX: x, overlayY: y }];
  }
}
