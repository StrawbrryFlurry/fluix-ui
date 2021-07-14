import { Component, OnInit, ViewChild } from '@angular/core';

import { FxStep } from './step';

@Component({
  selector: `fx-stepper`,
  template: `
    <div class="fx-stepper-container">
      <ng-content></ng-content>
      <fx-step #finishStep state="open">Finish</fx-step>
    </div>
  `,
  styleUrls: ['./stepper.scss'],
  host: {
    role: 'step',
  },
})
export class FxStepper implements OnInit {
  @ViewChild('finishStep', { static: true }) finishStep!: FxStep;

  ngOnInit(): void {
    this.finishStep.isFinishStep = true;
  }
}
