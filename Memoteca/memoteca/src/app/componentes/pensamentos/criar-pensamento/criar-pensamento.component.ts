import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  /* pensamento usado no modulo 1, foi apagado no modulo 2 após implementar o FormGroup
    pensamento: Pensamento = {
      //id: 1,
      conteudo: '',
      autoria: '',
      modelo: 'modelo1'
    }
  */
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose ([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],

      autoria: ['', Validators.compose ([
        Validators.required,
        Validators.minLength(3)
      ])],

      modelo: ['modelo1'],

      favorito: [false]
    })
  }

  // aqui deixou de usar o this.pensamento para usar o formulario reativo
  // this.service.criar(this.pensamento).subscribe(() => {
  // console.log(this.formulario.status) // o .status ajudou a checar se estava validando certinho
  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors) // o .get .errors detalha o erro exato para retornar para o usuario
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
    //alert("Novo pensamento")
  }

  cancelarPensamento() {
    this.router.navigate(['/listarPensamento'])
    //alert("Ação cancelada")
  }

  habilitarBotao(): string {
    if (this.formulario.valid){
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
