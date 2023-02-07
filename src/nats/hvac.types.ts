export type HvacDiscoveredEvent = {
  createdAt: Date;
  user: {
    id: string;
  };
  hvac: Hvac;
};

export type HvacUpdatedEvent = {
  createdAt: Date;
  user: {
    id: string;
  };
  hvac: Hvac;
};

export type HvacDeletedEvent = {
  createdAt: Date;
  user: {
    id: string;
  };
  hvac: Hvac;
};

export type Hvac = {
  id: string;
  lastSeen: Date;
  isReachable: boolean;
  isActive: boolean;
  currentTemperature: number | null;
  coolSetpoint: number | null;
  heatSetpoint: number | null;
  vendor: string;
  information: HvacInformation;
};

export type HvacInformation = {
  brand: string | null;
  model: string | null;
  displayName: string | null;
};

export type HvacLatestMeasurements = {
  timestamp: Date;
  isReachable: boolean;
  isActive: boolean;
  lastSeen: Date;
  currentTemperature?: number;
  coolSetpoint?: number;
  heatSetpoint?: number;
  holdType?: 'PERMANENT' | 'SCHEDULED';
  mode?: 'OFF' | 'AUTO' | 'COOL' | 'HEAT';
};

export type HvacConfiguration = {
  id: number;
  optimisationTemperatureLimit: number;
  monitorOnly: boolean;
};

export type HvacEvent = HvacEventIdentifier & {
  hvac?: {
    id: string;
    pendingDisconnect?: boolean;
    vendor?: string;
    brand?: string;
    model?: string;
    displayName?: string;
    latestMeasurements?: HvacLatestMeasurements;
    configuration?: HvacConfiguration;
  };
};

export type HvacEventIdentifier = {
  id: string;
  hvacUserId: string;
  username: string;
  operation: 'ADDED' | 'UPDATED' | 'DELETED';
};
