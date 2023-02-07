import { ExecutionContext, Inject, CanActivate, UnauthorizedException } from '@nestjs/common';
import { CustomClient, CustomClientServiceName } from '../nats/CustomClient';

export class HttpJwtGuard implements CanActivate {
  constructor(@Inject(CustomClientServiceName) private client: CustomClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
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
