import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = []

  paginaAtual: number = 1;

  haMaisPensamentos: boolean = true;

  filtro: string = '';

  favoritos: boolean = false;

  listaFavoritos: Pensamento[] = []; // se comunica com o pensamento.ts > @Input() listaFavoritos: Pensamento[] = [];

  titulo: string = 'Meu Mural';

  /*
    listaPensamentos: Pensamento[] = [
      // 1 passando como array vazio para pegar os dados da API

      // 2 aqui o conteúdo sendo passado diretamente, antes de aprender a fazer com a API
      {
        conteudo: 'Passo informações para o componente filho',
        autoria: 'Componente pai',
        modelo: 'modelo3'
      },
      {
        conteudo: 'Minha propriedade é decorada com o @Input()',
        autoria: 'Componente filho',
        modelo: 'modelo2'
      },
      {
        conteudo: 'Futuramente essa lista virá do backend',
        autoria: 'API',
        modelo: 'modelo3'
      },
      {
        conteudo: 'Comunicação entre componentes',
        autoria: 'Angular',
        modelo: 'modelo1'
      },
      {
        conteudo: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        autoria: 'API',
        modelo: 'modelo3'
      },
    ];
    */

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    }))
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true; // pra paginação "Carregar Mais" funcionar dentro do pesquisar tbm
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {this.listaPensamentos = listaPensamentos})
  }

  recarregarComponente() { //ele limpa o estado de mostrar somente favoritos
    this.favoritos = false;
    this.paginaAtual = 1;

    //location.reload(); // poderia utilizar o reload, mas ele é um f5, e não é ideal recarregar a pagina toda

    //usando o router ele carrega só o componente, e não a pagina toda
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;    // PS DEPRECATED em versões atuais
    this.router.onSameUrlNavigation = 'reload'                        // PS DEPRECATED em versões atuais
    this.router.navigate([this.router.url])
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true //botão de carregar mais
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }
}
