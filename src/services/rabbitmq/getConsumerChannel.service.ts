import { setEnvironment } from '../env.service';
setEnvironment();

import * as conf from '../../common/rabbit.config';
import * as amqp from 'amqplib';
import { createChannel } from './channel.service';



export async function getConsumerChannel (): Promise<amqp.Channel> {
    let channel: amqp.Channel = await createChannel();
    while ( channel == undefined ) {
        try {
            await channel.bindQueue( conf.rabbitConsumerQueueName, conf.rabbitTopicName, conf.rabbitConsumerRoutingKey );
        }
        catch ( err ) {
            console.log( `[ getConsumerChannel ] Falha ao configurar a chave de roteamento. ${err.message}` );
            channel = undefined;
        }
    }
    return channel;
}
