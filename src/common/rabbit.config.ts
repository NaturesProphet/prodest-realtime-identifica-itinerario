import { Options } from "amqplib";

const rabbitHost: string = process.env.RABBIT_HOST;
const rabbitPort: number = Number( process.env.RABBIT_PORT );
const rabbitUser: string = process.env.RABBIT_USER;
const rabbitPassword: string = process.env.RABBIT_PASSWORD;
export const rabbitTopicName: string = process.env.RABBIT_TOPIC_NAME;
export const rabbitConsumerQueueName: string = process.env.RABBIT_CONSUMER_QUEUE_NAME;
export const rabbitPublishQueueName: string = process.env.RABBIT_PUBLISH_QUEUE_NAME;
export const rabbitConsumerRoutingKey: string = process.env.RABBIT_CONSUMER_ROUTING_KEY;
export const rabbitPublishRoutingKey: string = process.env.RABBIT_PUBLISH_ROUTING_KEY;
export const rabbitPublishTTL: number = Number( process.env.RABBIT_PUBLISH_TTL );
export const rabbitConsumerTTL: number = Number( process.env.RABBIT_CONSUMER_TTL );


export const amqpOptions: Options.Connect = {
    hostname: rabbitHost,
    locale: 'pt-br',
    port: rabbitPort,
    username: rabbitUser,
    password: rabbitPassword
};
