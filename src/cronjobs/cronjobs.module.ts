import { Module } from '@nestjs/common';
import { IqairModule } from 'src/modules/iqair/iqair.module';
import { IqairAirQualityCronjobsService } from './iqair.air.quality.cronjobs.service';

@Module({
  imports: [IqairModule],
  providers: [IqairAirQualityCronjobsService],
})
export class CronjobsModule {}
