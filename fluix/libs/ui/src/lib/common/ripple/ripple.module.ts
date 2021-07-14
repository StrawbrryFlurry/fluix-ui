import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxRipple } from './ripple';

@NgModule({
  imports: [CommonModule],
  declarations: [FxRipple],
  exports: [FxRipple],
})
export class FxRippleModule {}
