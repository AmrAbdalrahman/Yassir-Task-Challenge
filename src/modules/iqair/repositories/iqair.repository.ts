import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { Repository } from 'typeorm';
import { IqaitCityResponse } from '../dtos/responses/iqair-city-response';
import { IqairEntity } from '../entities/iqair.entity';

export class IqairRepository extends Repository<IqairEntity> {
  constructor(
    @InjectRepository(IqairEntity)
    private carRepository: Repository<IqairEntity>,
  ) {
    super(
      carRepository.target,
      carRepository.manager,
      carRepository.queryRunner,
    );
  }

  async list(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IqaitCityResponse>> {
    let queryBuilder = this.carRepository.createQueryBuilder('iqair');
    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = await new PageMetaDto({ itemCount, pageOptionsDto });

    return await new PageDto(entities, pageMetaDto);
  }
}
