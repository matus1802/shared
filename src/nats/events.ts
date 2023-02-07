import { NotificationType } from './types';
import { VehicleMeasurementsBucketData, VehicleMeasurementsBatchData } from './smartcar.types';
import { HvacDiscoveredEvent, HvacUpdatedEvent, HvacEvent, HvacDeletedEvent } from './hvac.types';

import { ReadPacket } from '@nestjs/microservices';

export type Events =
  | 'event.users.user.deleted'
  | 'event.notifications.pns.send'
  | 'event.ev.measurements.bucket.data'
  | 'event.ev.connector.batch.data'
  | 'event.hvac.connector.hvac.discovered'
  | 'event.hvac.connector.hvac.updated'
  | 'event.hvac.connector.hvac.deleted'
  | 'event.hvac.device';

export type EventInput = {
  'event.users.user.deleted': { id: number; username: string };
  'event.notifications.pns.send': {
    usernames: string[];
    type: NotificationType;
    title: string;
    description?: string;
    content?: string;
  };
  'event.ev.measurements.bucket.data': VehicleMeasurementsBucketData;
  'event.ev.connector.batch.data': VehicleMeasurementsBatchData;
  'event.hvac.connector.hvac.discovered': HvacDiscoveredEvent;
  'event.hvac.connector.hvac.updated': HvacUpdatedEvent;
  'event.hvac.connector.hvac.deleted': HvacDeletedEvent;
  'event.hvac.device': HvacEvent;
};

export type IncomingEvent<T extends keyof EventInput> = ReadPacket<EventInput[T]>;
