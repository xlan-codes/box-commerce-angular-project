import { Injectable } from '@angular/core';
import { IBaseService } from '../base.service';
import { LengthConverter } from '../../models/length_converter.model';
import convert, { Unit } from "convert";
import {db} from './db';


@Injectable({
  providedIn: 'root'
})
export class LengthService implements IBaseService<LengthConverter> {
  constructor(
  ) {

  }
  public async convert(value: number, from: Unit, to: Unit): Promise<LengthConverter> {

    if (isNaN(value)) {
      throw new Error("value should to be a number");
    }

    if (!from) throw new Error("from should to be not null");
    if (!to) throw new Error("to should to be not null");

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
    // db.populate();

  }

  public async getUnits(): Promise<Array<any>> {
    const units = await db.units.toArray();
    return units;
  }

  public async addUnit(unit: Unit) {
    db.units.add({unit: unit as string});
  }

}
