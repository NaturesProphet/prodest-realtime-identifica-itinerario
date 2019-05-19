import { setEnvironment } from './services/env.service';
setEnvironment();

import { getConsumerChannel } from './services/rabbitmq/getConsumerChannel.service';
import { getPublishChannel } from './services/rabbitmq/getPublishChannel.service';
import * as rabbitConf from './common/rabbit.config';
import { Channel } from 'amqplib';
import { Veiculo } from './DTOs/veiculo.dto';
import { consultaVeiculo } from './services/restClient/rest.service';
import { avisaNoTopico } from './services/rabbitmq/avisaNoTopico.service';



async function main () {
    const consumerChannel: Channel = await getConsumerChannel();
    const publishChannel: Channel = await getPublishChannel();




    console.log( `-------------------------------------------------------\n` +
        `[ ${new Date()} ]\n\t| ..... Serviço iniciado ..... |\n` +
        `-------------------------------------------------------\n\n` );




    await consumerChannel.consume( rabbitConf.rabbitConsumerQueueName, async ( msg ) => {
        consumerChannel.ack( msg );
        let onibus = JSON.parse( msg.content.toString() );
        if ( onibus != undefined && onibus.ROTULO != undefined ) {

            let dadosRealTime = await consultaVeiculo( onibus.ROTULO );
            if ( dadosRealTime != undefined ) {

                if ( dadosRealTime.length > 0 && dadosRealTime[ 0 ].linha != undefined ) {

                    const veiculo: Veiculo = {
                        IGNICAO: onibus.IGNICAO,
                        ITINERARIO: dadosRealTime[ 0 ].linha,
                        ROTULO: onibus.ROTULO,
                        LOCALIZACAO: {
                            HORARIO: onibus.DATAHORA,
                            LATITUDE: onibus.LATITUDE,
                            LONGITUDE: onibus.LONGITUDE,
                            VELOCIDADE: onibus.VELOCIDADE
                        }
                    }
                    avisaNoTopico( publishChannel, veiculo );
                }
            } else {
                console.log( `A requisição à api realtime retornou undefined.` );
            }
        }
    } );
}

main();
