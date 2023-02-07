import { ClientNats, EventPattern, MessagePattern } from '@nestjs/microservices';
import { Messages, MessageInput, MessageResult } from './messages';
import { Events, EventInput } from './events';

export const CustomClientServiceName = 'SERVICE';

export class CustomClient extends ClientNats {
  sharedSend<T extends Messages>(pattern: T, input: MessageInput[T]): Promise<MessageResult[T]> {
    return this.send(pattern, input).toPromise();
  }
  sharedEmit<T extends Events>(pattern: T, input: EventInput[T]) {
    return this.emit(pattern, input).toPromise();
  }
}

export const CustomEventPattern: {
  <T extends keyof EventInput>(metadata?: T): MethodDecorator;
} = <T = string>(metadata?: T): MethodDecorator => {
  return EventPattern(metadata);
};

export const CustomMessagePattern: {
  <T extends keyof MessageInput>(metadata?: T): MethodDecorator;
} = <T = string>(metadata?: T): MethodDecorator => {
  return MessagePattern(metadata);
};
