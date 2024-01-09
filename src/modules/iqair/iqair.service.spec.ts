import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Constants } from 'src/common/constants';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageDto } from '../shared/dto/page.dto';
import { CreateIqairCityDto } from './dtos/create-iqair-city.dto';
import { IqaitCityResponse } from './dtos/responses/iqair-city-response';
import { IqairEntity } from './entities/iqair.entity';
import { IqairService } from './iqair.service';
import { IqairRepository } from './repositories/iqair.repository';

describe('IqairService', () => {
  let service: IqairService;
  let repositoryMock: Partial<IqairRepository>;
  let httpService: HttpService;

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
    repositoryMock = {
      list: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockHttpService = {
      get: jest.fn(() =>
        of({
          data: {
            status: 'success',
            data: {
              city: 'Paris',
              state: 'Ile-de-France',
              country: 'France',
              location: {
                type: 'Point',
                coordinates: [2.351666, 48.859425],
              },
              current: {
                pollution: {
                  ts: '2024-01-09T16:00:00.000Z',
                  aqius: 74,
                  mainus: 'p2',
                  aqicn: 33,
                  maincn: 'p2',
                },
                weather: {
                  ts: '2024-01-09T16:00:00.000Z',
                  tp: -1,
                  pr: 1025,
                  hu: 70,
                  ws: 4.12,
                  wd: 90,
                  ic: '04d',
                },
              },
            },
          },
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        IqairService,
        {
          provide: IqairRepository,
          useValue: repositoryMock,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<IqairService>(IqairService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('create => Should create a new city and return its data', async () => {
    const createUserDto = {
      latitude: Constants.PARIS_ZONE_LATITUDE,
      longitude: Constants.PARIS_ZONE_LONGITUDE,
    } as CreateIqairCityDto;

    jest.spyOn(repositoryMock, 'create');
    jest
      .spyOn(repositoryMock, 'save')
      .mockReturnValue(Promise.resolve(cityData));

    const result = await service.create(createUserDto);

    expect(repositoryMock.create).toHaveBeenCalled();
    expect(repositoryMock.save).toHaveBeenCalled();

    expect(result.pollution).toEqual(cityData.pollution);
  });

  it('getCities => Should retrieve a list of cities', async () => {
    const pageOptionsDto = {
      skip: 0,
      take: 10,
    } as PageOptionsDto;

    const citiesData = [cityData, cityData, cityData];

    repositoryMock.list = jest.fn().mockResolvedValueOnce({
      data: citiesData,
      meta: {
        page: Constants.PAGINATION_DEFAULT_PAGE,
        take: Constants.PAGINATION_LIMIT,
        itemCount: citiesData.length,
        pageCount: Math.ceil(citiesData.length / Constants.PAGINATION_LIMIT),
        hasPreviousPage: Constants.PAGINATION_DEFAULT_PAGE > 1,
        hasNextPage: Constants.PAGINATION_DEFAULT_PAGE < citiesData.length,
      },
    } as PageDto<IqaitCityResponse>);

    const result = await service.getCities(pageOptionsDto);

    expect(repositoryMock.list).toHaveBeenCalledWith(pageOptionsDto);
    expect(result.data.length).toBe(citiesData.length);
  });
});
