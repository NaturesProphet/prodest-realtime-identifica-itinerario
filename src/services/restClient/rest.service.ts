import * as request from 'request-promise';
import { restUri } from '../../common/rest.config';


export async function consultaVeiculo ( rotulo: string ) {

  const requestOptions = {
    method: 'GET',
    uri: `${restUri}${rotulo}`,
    json: true
  };

  try {
    return request.get( requestOptions );
  } catch ( erro ) {
    console.log( `Erro ao enviar um GET ao realtime: ${erro.message}` );
  }
}
