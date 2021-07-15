import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxIconModule } from '../icon';
import { FxStep } from './step';
import { FxStepControl } from './step-control';
import { FxStepper } from './stepper';
import { FxWizard } from './wizard';

@NgModule({
  declarations: [FxStep, FxStepper, FxWizard, FxStepControl],
  imports: [CommonModule, FxCommonModule, FxIconModule, CdkStepperModule],
  exports: [FxStep, FxStepper, FxWizard, FxStepControl],
})
export class FxFormsModule {}
