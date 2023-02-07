import { User, Tariff, PureTariff, SimpleSchedulerResult, CarbonIntensity, SimpleSchedulerType } from './types';
import { MessagePattern } from '@nestjs/microservices';

export type Messages =
  | 'message.auth.authenticate.local'
  | 'message.auth.login'
  | 'message.auth.authenticate.jwt'
  | 'message.auth.signup'
  | 'message.auth.updatePassword'
  | 'message.users.code.generate'
  | 'message.users.user.getById'
  | 'message.users.user.getByUsername'
  | 'message.tariffs.tariff.getById'
  | 'message.tariffs.pureTariff.getById'
  | 'message.scheduler.simpleScheduler.schedule'
  | 'message.scheduler.simpleScheduler.getScheduleResultsById';

export type MessageInput = {
  'message.auth.authenticate.local': { username: string; password: string };
  'message.auth.login': { username: string; password: string };
  'message.auth.authenticate.jwt': { accessToken: string };
  'message.auth.signup': { username: string; password: string };
  'message.auth.updatePassword': { username: string; password: string };
  'message.users.code.generate': { email: string };
  'message.users.user.getById': { id: number };
  'message.users.user.getByUsername': { username: string };
  'message.tariffs.tariff.getById': { id: number };
  'message.tariffs.pureTariff.getById': { id: number; from: string; to: string };
  'message.scheduler.simpleScheduler.schedule': {
    tariffId: number;
    from: string;
    to?: string;
    omit?: {
      from: string;
      to: string;
    };
    durationInMs: number;
    type: SimpleSchedulerType;
  };
  'message.scheduler.simpleScheduler.getScheduleResultsById': { id: number };
};

export type MessageResult = {
  'message.auth.authenticate.local': { username: string };
  'message.auth.login': { accessToken: string };
  'message.auth.authenticate.jwt': { username: string };
  'message.auth.signup': { username: string };
  'message.auth.updatePassword': boolean;
  'message.users.code.generate': { email: string; code: string };
  'message.users.user.getById': { user: User };
  'message.users.user.getByUsername': { user: User };
  'message.tariffs.tariff.getById': { tariff: Tariff };
  'message.tariffs.pureTariff.getById': { tariff: PureTariff[]; carbonIntensity: CarbonIntensity[] };
  'message.scheduler.simpleScheduler.schedule': {
    type: SimpleSchedulerType;
    durationInMs: number;
    resultId?: number;
    start?: string;
    cost?: number;
    carbonFootprint?: number;
    carbonFootprintScore?: number;
  };
  'message.scheduler.simpleScheduler.getScheduleResultsById': {
    id: number;
    results: SimpleSchedulerResult[];
    cheapestStart?: string;
    cheapestPrice?: number;
  };
};

export const CustomMessagePattern: {
  <T extends keyof MessageInput>(metadata?: T): MethodDecorator;
} = <T = string>(metadata?: T): MethodDecorator => {
  return MessagePattern(metadata);
};
