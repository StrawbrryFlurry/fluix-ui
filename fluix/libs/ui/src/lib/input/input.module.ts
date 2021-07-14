import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FluixInputDirective } from './input.component';

@NgModule({
  declarations: [FluixInputDirective],
  imports: [CommonModule, FxCommonModule],
  exports: [FluixInputDirective, FxCommonModule],
})
export class FluixInputModule {}
