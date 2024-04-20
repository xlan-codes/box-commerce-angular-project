import { Injectable } from '@angular/core';
import { CurrencyExhange } from '../../models/currency_exchange.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IBaseService } from '../base.service';
import moment from 'moment';
import { CURRENCIES } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements IBaseService<CurrencyExhange> {

   endpoint: String = "https://exchange-rates.abstractapi.com/v1";

  constructor(private http: HttpClient) { }
  public async convert(amount: number, from: String, to: String): Promise<CurrencyExhange> {
    if(isNaN(amount)) throw "value should to be number";

    const currencies = CURRENCIES.map((el) => el.id);

    if(!currencies.includes(from.toString()) || !currencies.includes(to.toString())){
      throw "the currency that you added doesn't exists"
    }
    return firstValueFrom(this.http.get<CurrencyExhange>(this.endpoint+ "/live/", {
      params: {
        "base": from.toString(),
        "target": to.toString()
      }
    }))
  }
  history(value: number, date: Date, from: String, to: String): Promise<CurrencyExhange> {
    
    if(isNaN(value)) throw "value should to be number";

    if(!date) throw 'date should to be not null or undefined';

    const currencies = CURRENCIES.map((el) => el.id);

    if(!currencies.includes(from.toString()) || !currencies.includes(to.toString())){
      throw new Error("the currency that you added doesn't exists");
    }

    return firstValueFrom(this.http.get<CurrencyExhange>(this.endpoint+ "/historical", {
      params: {
        "base": from.toString(),
        "target": to.toString(),
        date: moment(date).format('YYYY-MM-DD')
      }
    }));
  }
}


