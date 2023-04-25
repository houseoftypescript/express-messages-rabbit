import amqp, { Channel, Connection, Message } from 'amqplib/callback_api';
import configs from '../../environments';

export const createChannel = (connection: Connection): Promise<Channel> => {
  return new Promise((resolve, reject) => {
    connection.createChannel((error, channel) => {
      if (error) return reject(error);
      return resolve(channel);
    });
  });
};

export class RabbitClient {
  private url = '';
  private connection: Connection | undefined;
  private channel: Channel | undefined;

  constructor(url: string) {
    this.url = url;
  }

  public async init(): Promise<void> {
    this.connection = await this.connect();
    this.channel = await this.createChannel();
  }

  private async connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      amqp.connect(this.url, (error, connection) => {
        if (error) return reject(error);
        return resolve(connection);
      });
    });
  }

  private async createChannel(): Promise<Channel> {
    return new Promise((resolve, reject) => {
      this.connection?.createChannel((error, channel) => {
        if (error) return reject(error);
        return resolve(channel);
      });
    });
  }

  public async assertQueue(queue: string): Promise<void> {
    this.channel?.assertQueue(queue, { durable: false });
  }

  public async sendToQueue(queue: string, message: string): Promise<void> {
    this.channel?.sendToQueue(queue, Buffer.from(message));
  }

  public async consume(
    queue: string,
    callback: (msg: Message | null) => void
  ): Promise<void> {
    this.channel?.consume(queue, callback, { noAck: true });
  }
}

export const rabbitClient = new RabbitClient(configs.rabbit.url);
