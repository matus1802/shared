export type VehicleId = string;
export type VehicleUserId = string;

export type VehicleChargingState = 'CHARGING' | 'NOT_CHARGING' | 'FULLY_CHARGED';

export type VehicleMeasurementsBucketData = {
  vehicleId: VehicleId;
  errors?: string[];
  timestamp: Date;
  data: {
    chargingState?: VehicleChargingState;
    range?: number;
    percentRemaining?: number;
    isPluggedIn?: boolean;
    location?: {
      latitude?: number;
      longitude?: number;
    };
    isInHousehold?: boolean;
    distanceFromHousehold?: number;
    energyConsumed?: number;
    cost?: number;
    carbonFootprint?: number;
    carbonFootprintScore?: number;
    carbonFootprintUkAverage?: number;
    chargeDuration?: number;
  };
};

export type VehicleMeasurementsBatchData = {
  vehicleId: VehicleId;
  timestamp: Date;
  errors?: string[];
  measurements: {
    chargingState?: VehicleChargingState;
    range?: number;
    percentRemaining?: number;
    isPluggedIn?: boolean;
    location?: {
      latitude?: number;
      longitude?: number;
    };
  };
};
