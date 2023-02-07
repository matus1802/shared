import { ExecutionContext, Inject, CanActivate, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomClient, CustomClientServiceName } from '../nats/CustomClient';

export class WsJwtGuard implements CanActivate {
  constructor(@Inject(CustomClientServiceName) private client: CustomClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    try {
      const { authorization } = ctx.getContext();
      const res = await this.client.sharedSend('message.auth.authenticate.jwt', {
        accessToken: authorization?.split(' ')[1],
      });

      return Boolean(res);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
