import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
    children: [
      {
        path: '', component: FormComponent
      },
      {
        path: 'resultado', component: ResultComponent
      }
    ]
  },
];

export const CalculatorRoutingRoutes = RouterModule.forChild(routes);
