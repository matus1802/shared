import { ExecutionContext, Inject, CanActivate, HttpException } from '@nestjs/common';
import { CustomClient, CustomClientServiceName } from '../nats/CustomClient';
import { GqlExecutionContext } from '@nestjs/graphql';
import Errors from '../errors/errors';

export class LocalAuthGuard implements CanActivate {
  constructor(@Inject(CustomClientServiceName) private client: CustomClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    try {
      await this.client.sharedSend('message.auth.authenticate.local', { ...ctx.getArgs().input });
      return true;
    } catch (err) {
      throw new HttpException(Errors.USERNAME_OR_PASSWORD_INVALID, 401);
    }
  }
}
