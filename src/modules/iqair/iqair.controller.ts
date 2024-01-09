import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Constants } from 'src/common/constants';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageDto } from '../shared/dto/page.dto';
import { CreateIqairCityDto } from './dtos/create-iqair-city.dto';
import { IqaitCityResponse } from './dtos/responses/iqair-city-response';
import { ICreateCityResponse } from './interfaces';
import { IqairService } from './iqair.service';

@Controller(Constants.IQAIR_PATH)
export class IqairController {
  constructor(private iqairService: IqairService) {}

  @Post(`/${Constants.ADD_CITY}`)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createIqairCityDto: CreateIqairCityDto,
  ): Promise<ICreateCityResponse> {
    const createdCity = await this.iqairService.create(createIqairCityDto);
    return { Result: { Pollution: createdCity.pollution } };
  }

  @Get(`/${Constants.LIST_CITIES}`)
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IqaitCityResponse>> {
    return await this.iqairService.getCities(pageOptionsDto);
  }
}
