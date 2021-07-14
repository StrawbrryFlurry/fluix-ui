import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxIconComponent } from './icon';

@NgModule({
  declarations: [FxIconComponent],
  exports: [FxIconComponent],
  imports: [CommonModule, FxCommonModule],
})
export class FxIconModule {}
