import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorComponent } from './calculator.component';
import { FormsModule } from '@angular/forms';
import { CalculatorRoutingRoutes } from './calculator-routing.module';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [CalculatorComponent, FormComponent, ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalculatorRoutingRoutes
  ],
  exports: [CalculatorComponent]
})
export class CalculatorModule { }
