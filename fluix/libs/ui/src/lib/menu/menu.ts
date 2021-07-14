import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

export type TYMenuPosition = 'above' | 'center' | 'below';
export type TXMenuPosition = 'before' | 'center' | 'after';

@Component({
  selector: 'fx-menu',
  template: `<ng-template #fxMenuTemplate>
    <div role="menu" class="fx-menu">
      <ng-content></ng-content></div
  ></ng-template>`,
  styleUrls: ['./menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FxMenu {
  @ViewChild('fxMenuTemplate') menuTemplateRef!: TemplateRef<FxMenu>;

  /**
   * The positioning of the menu on the X Axis
   * of the host element.
   */
  @Input() xPosition: TXMenuPosition = 'after';
  /**
   * The positioning of the menu on the Y Axis
   * of the host element.
   *
   * {@link FlexibleConnectedPositionStrategy}
   */
  @Input() yPosition: TYMenuPosition = 'below';
}
