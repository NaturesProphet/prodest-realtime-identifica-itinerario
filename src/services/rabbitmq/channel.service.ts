import * as conf from '../../common/rabbit.config';
import { Connection, Channel, connect } from "amqplib";



export async function createChannel () {
  let channel: Channel;
  let conn: Connection;


  try {
    conn = await connect( conf.amqpOptions );

    try {
      channel = await conn.createChannel();

      try {
        await channel.assertExchange( conf.rabbitTopicName, 'topic', { durable: false } );
        return channel;
      }

      catch ( err ) {
        console.log( `[ createChannel ] Falha ao declarar um topico no rabbitMQ. ${err.message}` );
        channel = undefined;
      }
    }

    catch ( err ) {
      console.log( `[ createChannel ] Falha ao declarar um canal no rabbitMQ. ${err.message}` );
      channel = undefined;
    }


  }
  catch ( err ) {
    console.log( `[ createChannel ] Falha ao tentar se conectar ao rabbitMQ. ${err.message}` );
  }
}
