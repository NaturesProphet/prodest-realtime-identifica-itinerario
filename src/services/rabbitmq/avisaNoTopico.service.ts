import { Channel } from "amqplib";
import * as rabbitConf from '../../common/rabbit.config';
import { Veiculo } from "DTOs/veiculo.dto";


export async function avisaNoTopico ( connection: Channel, veiculo: Veiculo ) {

  connection.publish(
    rabbitConf.rabbitTopicName,
    rabbitConf.rabbitPublishRoutingKey,
    new Buffer( JSON.stringify( veiculo ) ),
    { persistent: false }
  );
}
