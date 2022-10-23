import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import localePt from '@angular/common/locales/pt';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent, ConverterComponent, GameOfLifeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
