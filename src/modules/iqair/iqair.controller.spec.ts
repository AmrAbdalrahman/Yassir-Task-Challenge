import { Test, TestingModule } from '@nestjs/testing';
import { Constants } from 'src/common/constants';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageDto } from '../shared/dto/page.dto';
import { CreateIqairCityDto } from './dtos/create-iqair-city.dto';
import { IqaitCityResponse } from './dtos/responses/iqair-city-response';
import { IqairEntity } from './entities/iqair.entity';
import { IqairController } from './iqair.controller';
import { IqairService } from './iqair.service';

describe('IqairController', () => {
  let controller: IqairController;
  let service: IqairService;

  const cityData = {
    id: 4,
    city: 'Paris',
    state: 'Ile-de-France',
    country: 'France',
    location: {
      type: 'Point',
      coordinates: [2.351666, 48.859425],
    },
    pollution: {
      ts: '2024-01-08T19:00:00.000Z',
      aqicn: 20,
      aqius: 55,
      maincn: 'p2',
      mainus: 'p2',
    },
    weather: {
      hu: 74,
      ic: '13n',
      pr: 1026,
      tp: 0,
      ts: '2024-01-08T19:00:00.000Z',
      wd: 40,
      ws: 5.14,
    },
  } as IqairEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IqairController],
      providers: [
        {
          provide: IqairService,
          useValue: {
            create: jest.fn(),
            getCities: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IqairController>(IqairController);
    service = module.get<IqairService>(IqairService);
  });

  describe('create', () => {
    it('should call service method to create a city', async () => {
      const createIqairCityDto = {} as CreateIqairCityDto;

      jest.spyOn(service, 'create').mockResolvedValueOnce(cityData);

      const result = await controller.create(createIqairCityDto);

      expect(service.create).toHaveBeenCalledWith(createIqairCityDto);
      expect(result).toEqual({ Result: { Pollution: cityData.pollution } });
    });
  });

  describe('getUsers', () => {
    it('should call service method to get cities', async () => {
      const pageOptionsDto: PageOptionsDto = {
        skip: Constants.PAGINATION_LIMIT,
      };
      const citiesData = [cityData, cityData, cityData];

      const mockPageDto = {
        data: citiesData,
        meta: {
          page: Constants.PAGINATION_DEFAULT_PAGE,
          take: Constants.PAGINATION_LIMIT,
          itemCount: citiesData.length,
          pageCount: Math.ceil(citiesData.length / Constants.PAGINATION_LIMIT),
          hasPreviousPage: Constants.PAGINATION_DEFAULT_PAGE > 1,
          hasNextPage: Constants.PAGINATION_DEFAULT_PAGE < citiesData.length,
        },
      } as PageDto<IqaitCityResponse>;

      jest.spyOn(service, 'getCities').mockResolvedValueOnce(mockPageDto);

      const result = await controller.getUsers(pageOptionsDto);

      expect(service.getCities).toHaveBeenCalledWith(pageOptionsDto);
      expect(result).toEqual(mockPageDto);
    });
  });
});
