import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageDto } from '../shared/dto/page.dto';
import { CreateIqairCityDto } from './dtos/create-iqair-city.dto';
import { IqaitCityResponse } from './dtos/responses/iqair-city-response';
import { IqairEntity } from './entities/iqair.entity';
import { ICityData } from './interfaces';
import { IqairRepository } from './repositories/iqair.repository';

@Injectable()
export class IqairService {
  private readonly logger = new Logger(IqairService.name);

  constructor(
    private readonly iqairRepository: IqairRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(createIqairCityDto: CreateIqairCityDto): Promise<IqairEntity> {
    const cityData = await this.getCityIqairInfo(createIqairCityDto);

    const iqairEntity = this.iqairRepository.create({
      city: cityData.city,
      state: cityData.state,
      country: cityData.country,
      pollution: cityData.current.pollution,
      weather: cityData.current.weather,
      location: cityData.location,
    });

    return await this.iqairRepository.save(iqairEntity);
  }

  public async getCities(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IqaitCityResponse>> {
    return await this.iqairRepository.list(pageOptionsDto);
  }

  private async getCityIqairInfo(
    createIqairCityDto: CreateIqairCityDto,
  ): Promise<ICityData> {
    try {
      const { latitude, longitude } = createIqairCityDto;
      const API_KEY = process.env.IQAIR_API_KEY;

      const apiUrl = `${process.env.AIRVISUAL_API_URL}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;

      const response = await firstValueFrom(
        this.httpService.get(apiUrl).pipe(
          map((response) => response.data.data),
          catchError((error) => {
            this.logger.error(
              `Error occurred while fetching data: ${error.message}`,
            );
            return throwError(
              () => new Error('Failed to fetch data from Iqair API'),
            );
          }),
        ),
      );

      return response;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
