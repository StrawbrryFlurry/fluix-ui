import { Component } from '@angular/core';

@Component({
  selector: 'fx-wizard',
  template: `
    <form>
      <fx-stepper>
        <ng-content select="fx-step"></ng-content>
      </fx-stepper>
      <ng-content></ng-content>
    </form>
  `,
})
export class FxWizard {}

/*
<fx-wizard>
  <fx-navigation-header></fx-navigation-header>
  <fx-step label="ABC">
    <template></template>
  </fx-step>
  <fx-step label="ABC">
    <template></template>
  </fx-step>
  <fx-step label="ABC">
    <template></template>
  </fx-step>
  <fx-step-control>
    
  </fx-step-control>
</fx-wizard>*/
