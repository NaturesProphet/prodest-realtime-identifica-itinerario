import { setEnvironment } from '../env.service';
setEnvironment();

import * as conf from '../../common/rabbit.config';
import * as amqp from 'amqplib';
import { createChannel } from './channel.service';


export async function getPublishChannel (): Promise<amqp.Channel> {

    let channel: amqp.Channel = await createChannel();
    while ( channel == undefined ) {

        try {
            await channel.assertQueue( conf.rabbitPublishQueueName, { messageTtl: conf.rabbitPublishTTL, durable: false } );
        } catch ( err ) {
            console.log( `[ getPublishChannel ] Falha ao declarar a fila de publicação no rabbitMQ. ${err.message}` );
            channel = undefined;
        }

        try {
            await channel.bindQueue( conf.rabbitPublishQueueName, conf.rabbitTopicName, conf.rabbitPublishRoutingKey );
        } catch ( err ) {
            console.log( `[ getPublishChannel ] Falha ao configurar a chave de roteamento. ${err.message}` );
            channel = undefined;
        }
    }
    return channel;
}
