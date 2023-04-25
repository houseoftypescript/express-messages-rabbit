import { Body, Post, Route, Tags } from 'tsoa';
import configs from '../../common/environments';
import { rabbitClient } from '../../common/libs/rabbit';

@Tags('Messages')
@Route('messages')
export class MessagesController {
  @Post('produce')
  public async produce(
    @Body() { message }: { message: string }
  ): Promise<void> {
    rabbitClient.sendToQueue(configs.rabbit.queue, message);
    return;
  }
}
