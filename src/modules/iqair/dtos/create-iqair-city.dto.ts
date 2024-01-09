import { IsNumber, Max, Min } from 'class-validator';

export class CreateIqairCityDto {
  @IsNumber()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  latitude: number;

  @IsNumber()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  longitude: number;
}
