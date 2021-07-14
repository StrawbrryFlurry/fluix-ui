import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxIconModule } from '../icon';
import { FxStep } from './step';
import { FxStepper } from './stepper';

@NgModule({
  declarations: [FxStep, FxStepper],
  imports: [CommonModule, FxCommonModule, FxIconModule],
  exports: [FxStep, FxStepper],
})
export class FxFormsModule {}
