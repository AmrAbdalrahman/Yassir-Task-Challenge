import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';

export interface ISuccessResponse {
  code: number;
  message?: string;
  data?: any;
  extra?: any;
}

export interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
