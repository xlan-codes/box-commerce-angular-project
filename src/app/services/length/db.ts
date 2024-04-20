import Dexie, { Table } from 'dexie';


export interface Units {
    id?: number;
    unit: string;
  }
  
  export class AppDB extends Dexie {
    units!: Table<Units, number>;
  
    constructor() {
      super('ngdexieliveQuery');
      this.version(3).stores({
        units: '++id, unit',
      });
      this.on('populate', () => this.populate());
    }
  
    async populate() {

      await db.units.bulkAdd([
        {
          unit: 'yard',
        },
        {
          unit: 'meter',
        },
        {
          unit: 'inch',
        },
      ]);
    }
  }
  
  export const db = new AppDB();
  