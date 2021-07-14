import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FxFieldModule } from '../field/fx-field.module';
import { FxColorDirective } from './directives/color.directive';
import { FxRippleModule } from './ripple';

@NgModule({
  declarations: [FxColorDirective],
  imports: [
    CommonModule,
    FxFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FxRippleModule,
  ],
  exports: [
    CommonModule,
    FxFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FxColorDirective,
    FxRippleModule,
  ],
})
export class FxCommonModule {}
