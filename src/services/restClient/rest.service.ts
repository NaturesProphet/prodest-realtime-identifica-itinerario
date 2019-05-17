import * as request from 'request-promise';
import { restUri } from '../../common/rest.config';


export async function consultaVeiculo ( parametro: string ) {

  const requestOptions = {
    method: 'GET',
    uri: `${restUri}${parametro}`,
    json: true
  };

  try {
    return await request.get( requestOptions );
  } catch ( erro ) {
    console.log( `Erro ao enviar um GET ao realtime: ${erro.message}` );
  }
}

