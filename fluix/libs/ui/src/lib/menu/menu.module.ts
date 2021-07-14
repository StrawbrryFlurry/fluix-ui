import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxMenu } from './menu';
import { FxMenuItem } from './menu-item';
import { FxMenuTriggerFor } from './menu-trigger-for.directive';

@NgModule({
  imports: [CommonModule, FxCommonModule, PortalModule, OverlayModule],
  declarations: [FxMenu, FxMenuItem, FxMenuTriggerFor],
  exports: [FxMenu, FxMenuItem, FxMenuTriggerFor],
})
export class FxMenuModule {}
