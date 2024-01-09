import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Constants } from 'src/common/constants';
import { IqairService } from 'src/modules/iqair/iqair.service';

@Injectable()
export class IqairAirQualityCronjobsService {
  private readonly logger = new Logger(IqairAirQualityCronjobsService.name);

  constructor(private iqairService: IqairService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getParisZoneAirInfo() {
    const createdCityData = await this.iqairService.create({
      latitude: Constants.PARIS_ZONE_LATITUDE,
      longitude: Constants.PARIS_ZONE_LONGITUDE,
    });
    this.logger.log(`Created City Data${JSON.stringify(createdCityData)}`);
  }
}
