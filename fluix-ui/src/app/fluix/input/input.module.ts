import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FluixCommonModule } from '../common';
import { FluixInputDirective } from './input.component';

@NgModule({
  declarations: [FluixInputDirective],
  imports: [CommonModule, FluixCommonModule],
  exports: [FluixInputDirective, FluixCommonModule],
})
export class FluixInputModule {}
