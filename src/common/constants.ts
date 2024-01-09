export class Constants {
  public static PAGINATION_LIMIT = 10;
  public static PAGINATION_DEFAULT_PAGE = 1;

  public static PARIS_ZONE_LATITUDE = 48.856613;
  public static PARIS_ZONE_LONGITUDE = 2.352222;

  // API Routes
  public static API_VERSION = 'v1';
  public static API_PREFIX = 'api';

  //Api prefix management
  public static IQAIR_PATH = [
    `${Constants.API_VERSION}/${Constants.API_PREFIX}/iqair-management`,
  ];
  public static ADD_CITY = 'add-city';
  public static LIST_CITIES = 'list-cities';
}
