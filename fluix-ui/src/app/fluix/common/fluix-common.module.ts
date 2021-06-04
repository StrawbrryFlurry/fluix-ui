import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

import { FxFieldModule } from '../field/fx-field.module';
import { FxTypeDirective } from './directives';

@NgModule({
  declarations: [FxTypeDirective],
  imports: [
    CommonModule,
    FxFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
  ],
  exports: [
    CommonModule,
    FxFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FxTypeDirective,
    MatRippleModule,
  ],
})
export class FluixCommonModule {}
