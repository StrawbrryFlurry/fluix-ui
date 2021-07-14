import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxButton } from './button';

@NgModule({
  declarations: [FxButton],
  exports: [FxButton, FxCommonModule],
  imports: [CommonModule, FxCommonModule],
})
export class FxButtonModule {}
