import { TestBed } from '@angular/core/testing';

import { LengthService } from './length.service';
import { LengthConverter } from '../../models/length_converter.model';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { DBConfig } from '../../constants';

describe('LengthService', () => {
  let service: LengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxIndexedDBModule.forRoot(DBConfig)
      ],
      providers: [
        NgxIndexedDBService
      ]
    });
    service = TestBed.inject(LengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test convert function when the values are correct', async () => {
    const value = 1;
    const from = 'yd';
    const to = 'm';
    const expectedResult = {
      value: 0.9144,
      base: from,
      target:  to
    } as LengthConverter;
    const a = await service.convert(value, from, to);
    expect(a.value).toBe(expectedResult.value);
    expect(a.base).toBe(expectedResult.base);
    expect(a.target).toBe(expectedResult.target);
  });

  it('Test convert function when value is not number', async () => {
    const value = "test" as any;
    const from = 'yd';
    const to = 'm';
    await expectAsync(service.convert(value, from, to)).toBeRejected();
  });



  it('Test convert function when form or to parameter are null', async () => {
    const value = "test" as any;
    const from = null as any;
    const to = null as any;
    await expectAsync(service.convert(value, from, to)).toBeRejected();
  });

  it("History should return throw", async() => {
    await expectAsync(service.history(0, new Date(), "", "")).toBeRejected()
  })


});
