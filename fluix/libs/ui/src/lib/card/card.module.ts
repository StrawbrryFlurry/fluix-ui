import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FxCommonModule } from '../common';
import { FxCard } from './card';
import { FxCardBody } from './card-body';
import { FxCardFooter } from './card-footer';
import { FxCardHeader, FxCardSubtitle, FxCardTitle } from './card-header';

@NgModule({
  imports: [CommonModule, FxCommonModule],
  declarations: [
    FxCard,
    FxCardHeader,
    FxCardBody,
    FxCardFooter,
    FxCardSubtitle,
    FxCardTitle,
  ],
  exports: [
    FxCard,
    FxCardHeader,
    FxCardBody,
    FxCardFooter,
    FxCardSubtitle,
    FxCardTitle,
  ],
})
export class FxCardModule {}
