import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FluixCommonModule } from '../common';
import { FxButtonComponent } from './button.component';

@NgModule({
  declarations: [FxButtonComponent],
  exports: [FxButtonComponent, FluixCommonModule],
  imports: [CommonModule, FluixCommonModule],
})
export class FxButtonModule {}
