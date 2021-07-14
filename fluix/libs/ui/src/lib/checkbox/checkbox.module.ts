import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxCheckboxComponent } from './checkbox';

@NgModule({
  declarations: [FxCheckboxComponent],
  imports: [CommonModule, FxCommonModule],
  exports: [FxCheckboxComponent],
})
export class FxCheckboxModule {}
