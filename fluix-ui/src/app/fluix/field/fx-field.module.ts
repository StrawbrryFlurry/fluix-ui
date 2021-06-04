import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxFieldComponent } from './fx-field.component';

@NgModule({
  declarations: [FxFieldComponent],
  imports: [CommonModule],
  exports: [FxFieldComponent],
})
export class FxFieldModule {}
