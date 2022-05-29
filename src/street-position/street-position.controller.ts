import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { map } from 'rxjs';
import { AddressInteface, DistanceBeetwenFromTo } from 'src/interfaces/Address';
import { StreetPositionService } from './street-position.service';

@Controller('street')
export class StreetController {
  private provider;
  constructor(
    private StreetPosition: StreetPositionService,
    private httpService: HttpService,
  ) {}

  @Post('duration')
  getDuration(@Body() { from, to }: DistanceBeetwenFromTo) {
    const url = encodeURI(
      `/directions/v2/route?key=a8cZPNfj9do1cgsgSgVUTpd97rHqQJCm&from=${from}&to=${to}`,
    );
    return this.httpService.get(url).pipe(
      map((responce) => {
        const data = responce.data;
        return data;
      }),
    );
  }

  @Post('coordinates')
  getCoordinates(@Body() { street }: AddressInteface) {
    const url = encodeURI(
      `/geocoding/v1/address?key=a8cZPNfj9do1cgsgSgVUTpd97rHqQJCm&location=${street}`,
    );
    return this.httpService.get(url).pipe(
      map((responce) => {
        const data = responce.data;
        return data.results.pop();
      }),
    );
  }
}
