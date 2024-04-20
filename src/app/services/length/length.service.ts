import { Injectable } from '@angular/core';
import { IBaseService } from '../base.service';
import { LengthConverter } from '../../models/length_converter.model';
import convert, { Unit } from "convert";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { firstValueFrom } from 'rxjs';
import { DBConfig } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class LengthService implements IBaseService<LengthConverter> {

  constructor(
    private dbService: NgxIndexedDBService
  ) { }
  public async convert(value: number, from: Unit, to: Unit): Promise<LengthConverter> {

    if(isNaN(value)) {
      throw new Error("value should to be a number");
    }

    if(!from) throw new Error("from should to be not null");
    if(!to) throw new Error("to should to be not null");

    const a = convert(value, from).to(to);
    return {
      base: from,
      target: to,
      value: a
    } as LengthConverter;
  }
  public async history(value: number, date: Date, from: String, to: String): Promise<LengthConverter> {
    throw new Error('Method not implemented.');
  }

  public async initDb(): Promise<void> {
    this.dbService
      .bulkAdd(DBConfig.objectStoresMeta[0].store, [{
        unit: 'yard',
      }, {
        unit: 'meter'
      },
      {
        unit: 'inch'
      }
      ])
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }

  public async getUnits(): Promise<Array<any>> {
    return firstValueFrom(this.dbService.getAll(DBConfig.objectStoresMeta[0].store));
  }

}
