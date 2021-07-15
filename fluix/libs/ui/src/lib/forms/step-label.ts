import { CdkStepLabel } from '@angular/cdk/stepper';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'fx-step-label, fxStepLabel',
  template: ``,
})
export class FxStepLabel extends CdkStepLabel {
  template!: TemplateRef<FxStepLabel>;
}
