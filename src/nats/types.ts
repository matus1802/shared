export type User = {
  id: number;
  username: string;
  nickname: string;
  forbidden: boolean;
  tariffId?: number;
  timezone: string;
  homeLocation?: Location;
};

export enum TariffType {
  AGILE,
  STANDARD,
  CUSTOM,
}

export type Location = {
  longitude: number;
  latitude: number;
};

export type Tariff = {
  id: number;
  name?: string;
  provider?: string;
  type: TariffType;
};

export type PureTariff = {
  from: string;
  to: string;
  rate: number;
};

export type SimpleSchedulerResult = {
  timestamp: Date;
  price?: number;
};

export enum SimpleSchedulerType {
  CHEAPEST_COST,
  MOST_EXPENSIVE_COST,
  LEAST_CARBON_FOOTPRINT,
  CALCULATE_AT_TIME,
}

export type CarbonIntensity = {
  from: string;
  to: string;
  intensity: number;
};

export enum NotificationType {
  INFO = 'INFO',
  SUGGESTION = 'SUGGESTION',
  VEHICLE_CHARGE_SCHEDULED = 'VEHICLE_CHARGE_SCHEDULED',
  VEHICLE_CHARGE_STARTED = 'VEHICLE_CHARGE_STARTED',
  VEHICLE_CHARGE_FINISHED = 'VEHICLE_CHARGE_FINISHED',
  HVAC_OPTIMISATION_STARTED = 'HVAC_OPTIMISATION_STARTED',
  HVAC_OPTIMISATION_FINISHED = 'HVAC_OPTIMISATION_FINISHED',
}
