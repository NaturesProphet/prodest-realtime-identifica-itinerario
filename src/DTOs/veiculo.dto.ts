export interface Veiculo {
  ROTULO: string,
  ITINERARIO: string,
  IGNICAO: boolean,
  LOCALIZACAO:
  {
    LONGITUDE: number,
    LATITUDE: number,
    HORARIO: number,
    VELOCIDADE: number,
  }
}
