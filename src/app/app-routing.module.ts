import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

const routes: Routes = [
  { path: '', redirectTo: 'conversor', pathMatch: 'full'},
  { path: 'conversor', component: ConverterComponent, title: "Conversor de Numeros Romanos"  },
  { path: 'calculadora', loadChildren: () => import('./calculator/calculator.module').then((m) => m.CalculatorModule), title: "Divisor de Conta de Restaurante" },
  { path: 'jogo-da-vida', component: GameOfLifeComponent, title: "Jogo da Vida"  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
