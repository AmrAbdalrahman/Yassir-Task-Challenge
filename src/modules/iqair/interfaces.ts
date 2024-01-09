export interface ILocation {
  type: string;
  coordinates: [number, number];
}

export interface IPollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export interface IWeather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export interface ICurrentData {
  pollution: IPollution;
  weather: IWeather;
}

export interface ICityData {
  city: string;
  state: string;
  country: string;
  location: ILocation;
  current: ICurrentData;
}

export interface ICreateIqair {
  city: string;
  state: string;
  country: string;
  location: ILocation;
  pollution: IPollution;
  weather: IWeather;
}

export interface ICreateCityResponse {
  Result: {
    Pollution: IPollution;
  };
}
