import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {

    const intensPorPagina = 6;

    let params = new HttpParams()
    .set("_page", pagina)
    .set("_limit", intensPorPagina)

    if (filtro.trim().length > 1) {
      params = params
      .set("q", filtro)
    }

    if (favoritos){
      params = params.set("favorito",true)
    }


    //GET /posts?_page7&_limit=20
    // Da pra fazer assim, concatenando strings, mas não é o ideal
    //return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${intensPorPagina}`)

    // O melhor é fazer desta forma que o ng fornece atraves do HttpParams
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  /* listarPensamentosFavoritos()
  esse método não funciona com o carregar mais e nem com o buscar, pois eles retornam tudo,
  independente de ser favorito ou não, então esse código será refatorado para agir de dentro
  do proprio listar para fazer o filtro por la e buscar somente o que se pede, somente favoritos
  ou todos
  listarPensamentosFavoritos(pagina: number, filtro: string): Observable<Pensamento[]>{
    const intensPorPagina = 6;

    let params = new HttpParams()
    .set("_page", pagina)
    .set("_limit", intensPorPagina)
    .set("favorito", true)

    if (filtro.trim().length > 1) {
      params = params
      .set("q", filtro)
    }
    return this.http.get<Pensamento[]>(this.API, { params })
  }*/

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }
  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito

    /*como o método ficaria identico ao EDITAR, então é melhor
    chamar o editar para evitar boilerplate
      const url = `${this.API}/${pensamento.id}`
      return this.http.put<Pensamento>(url, pensamento)*/

    return this.editar(pensamento)
  }

  excluir(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }


}
