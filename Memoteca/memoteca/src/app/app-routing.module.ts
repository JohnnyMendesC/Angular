import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';

const routes: Routes = [
  {
    // o caminho:
    path: 'criarPensamento',

    // renderiza o:
    component: CriarPensamentoComponent
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent
  },
  {
    // o caminho vazio:
    path: '',
    // o pathMatch é necessario para o path vazio
    // prefix ele le só 'localhost:4200', full le a url toda
    pathMatch: 'full',

    // como é primeiro acesso usa o redirectTo:
    redirectTo: 'listarPensamento',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
