import { IqairRepository } from 'src/modules/iqair/repositories/iqair.repository';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IqairEntity } from './entities/iqair.entity';
import { IqairController } from './iqair.controller';
import { IqairService } from './iqair.service';

@Module({
  imports: [TypeOrmModule.forFeature([IqairEntity]), HttpModule],
  controllers: [IqairController],
  providers: [IqairService, IqairRepository],
  exports: [IqairService,],
})
export class IqairModule {}
