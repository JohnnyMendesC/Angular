// a interface agindo como contrato, ditando como são os atributos e seus valores esperados
export interface Pensamento {
  id?: number
  conteudo: string
  autoria: string
  modelo: string
  favorito: boolean
}
