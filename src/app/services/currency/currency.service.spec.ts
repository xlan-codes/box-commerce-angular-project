import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptorFn } from '../../http-interceptor/auth.interceptor';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        provideHttpClient(withInterceptors([httpInterceptorFn])),
      ]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Test convert function with valid parameters', async() => {
    const base = 'USD';
    const target = 'EUR';
    const a = await service.convert(300, base, target);
    expect(a.base).toBe(base);

  });


  it('Test convert function when amount is not valid', async() => {
    const base = 'USD';
    const target = 'EUR';
    const amount = "ff" as any
    await expectAsync(service.convert(amount, base, target)).toBeRejected();

  });

  it('Test convert function when from and to parameters are not valid', async() => {
    const base = 'USD';
    const target = 'EUl';
    const amount = "ff" as any
    await expectAsync(service.convert(amount, base, target)).toBeRejected();
  });

  it('Test function history for valid parameters', async() => {
    const base = 'USD';
    const target = 'EUR';
    const a = await service.history(300, new Date(), base, target);
    expect(a.base).toBe(base);
  });

  it('Test history function when date is not valid', async() => {
    const base = 'USD';
    const target = 'EUR';
    const amount = "ff" as any
    await expectAsync(service.history(amount, new Date(), base, target)).toBeRejected();
  });

  it('Test history fucnction when from and to are not valid', async() => {
    const base = 'USD';
    const target = 'EUL';
    const amount = 400;
    await expectAsync(service.history(amount, new Date(), base, target)).toBeRejectedWithError();
  });

});
