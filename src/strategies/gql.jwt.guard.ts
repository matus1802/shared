import { ExecutionContext, Inject, CanActivate, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomClient, CustomClientServiceName } from '../nats/CustomClient';

export class GqlJwtGuard implements CanActivate {
  constructor(@Inject(CustomClientServiceName) private client: CustomClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    try {
      const res = await this.client.sharedSend('message.auth.authenticate.jwt', {
        accessToken: req.headers['authorization']?.split(' ')[1],
      });
      req.user = res;
      return Boolean(res);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
