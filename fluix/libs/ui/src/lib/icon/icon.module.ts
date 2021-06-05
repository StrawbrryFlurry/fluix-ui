import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FluixCommonModule } from '../common';
import { FxIconComponent } from './icon.component';

@NgModule({
  declarations: [FxIconComponent],
  exports: [FxIconComponent],
  imports: [CommonModule, FluixCommonModule],
})
export class FxIconModule {}
