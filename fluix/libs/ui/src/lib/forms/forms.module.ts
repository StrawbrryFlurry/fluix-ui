import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxIconModule } from '../icon';
import { FxStepControl } from './step-control';
import { FxStep, FxStepLabel, FxStepLabelSeparator, FxStepper } from './stepper';
import { FxWizard } from './wizard';

@NgModule({
  imports: [CommonModule, FxCommonModule, FxIconModule, CdkStepperModule],
  declarations: [
    FxStep,
    FxStepper,
    FxStepLabel,
    FxStepLabelSeparator,
    FxWizard,
    FxStepControl,
  ],
  exports: [
    FxStep,
    FxStepper,
    FxStepLabel,
    FxStepLabelSeparator,
    FxWizard,
    FxStepControl,
  ],
})
export class FxFormsModule {}
