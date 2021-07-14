import { NgModule } from '@angular/core';

import { FxButtonModule } from './button/button.module';
import { FxCardModule } from './card/card.module';
import { FxDividerModule } from './divider/divider.module';
import { FxFormsModule } from './forms';
import { FxIconModule } from './icon/icon.module';
import { FluixInputModule } from './input/input.module';
import { FxMenuModule } from './menu/menu.module';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [PopupComponent],
  imports: [
    FluixInputModule,
    FxButtonModule,
    FxIconModule,
    FxCardModule,
    FxDividerModule,
    FxMenuModule,
    FxFormsModule,
  ],
  exports: [
    FluixInputModule,
    FxButtonModule,
    FxIconModule,
    FxCardModule,
    FxMenuModule,
    FxDividerModule,
    FxFormsModule,
  ],
})
export class FluixModule {}
