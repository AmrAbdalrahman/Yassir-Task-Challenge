import { Expose } from 'class-transformer';
import { ILocation, IPollution, IWeather } from '../../interfaces';

export class IqaitCityResponse {
  @Expose()
  public id: number;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  country: string;

  @Expose()
  location: ILocation;

  @Expose()
  pollution: IPollution;

  @Expose()
  weather: IWeather;

  @Expose()
  public createdAt: Date;
}
