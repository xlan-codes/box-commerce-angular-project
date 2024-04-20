

export const CURRENCIES = [
    {id: 'ARS', name: 'Argentine Peso'},
    {id: 'AUD', name: 'Australian Dollar'},
    {id: 'USD', name: 'USA Dollar'},
    {id: 'BCH', name: 'Bitcoin Cash'},
    {id: 'BGN', name: 'Bulgarian Lev'},
    {id: 'BNB', name: 'Binance Coin'},
    {id: 'BRL', name: 'Brazilian Real'},
    {id: 'BTC', name: 'Bitcoin'},
    {id: 'CAD', name: 'Canadian Dollar'},
    {id: 'CHF', name: 'Swiss Franc'},
    {id: 'CNY', name: 'Chinese Yuan'},
    {id: 'CZK', name: 'Czech Republic Koruna'},
    {id: 'DKK', name: 'Danish Krone'},
    {id: 'DOGE', name: 'Dogecoin'},
    {id: 'DZD', name: 'Algerian Dinar'},
    {id: 'ETH', name: 'Ethereum'},
    {id: 'EUR', name: 'Euro'},
    {id: 'GBP', name: 'British Pound Sterling'},
    {id: 'HKD', name: 'Hong Kong Dollar'},
    {id: 'HRK', name: 'Croatian Kuna'},
    {id: 'HUF', name: 'Hungarian Forint'},
    {id: 'IDR', name: 'Indonesian Rupiah'},
    {id: 'ILS', name: 'Israeli New Sheqel'},
    {id: 'INR', name: 'Indian Rupee'},
    {id: 'ISK', name: 'Icelandic Króna'},
    {id: 'JPY', name: 'Japanese Yen'},
    {id: 'KRW', name: 'South Korean Won'},
    {id: 'LTC', name: 'Litecoin'},
    {id: 'MAD', name: 'Moroccan Dirham'},
    {id: 'MXN', name: 'Mexican Peso'},
    {id: 'MYR', name: 'Malaysian Ringgit'},
    {id: 'NOK', name: 'Norwegian Krone'},
    {id: 'NZD', name: 'New Zealand Dollar'},
    {id: 'PHP', name: 'Philippine Peso'},
    {id: 'PLN', name: 'Polish Zloty'},
    {id: 'RON', name: 'Romanian Leu'},
    {id: 'RUB', name: 'Russian Ruble'},
    {id: 'SEK', name: 'Swedish Krona'},
    {id: 'SGD', name: 'Singapore Dollar'},
    {id: 'THB', name: 'Thai Baht'},
    {id: 'TRY', name: 'Turkish Lira'},
    {id: 'TWD', name: 'New Taiwan Dollar'},
    {id: 'XRP', name: 'Ripple'},
    {id: 'ZAR', name: 'South African Rand'}
    ];

    export function migrationFactory() {
        // The animal table was added with version 2 but none of the existing tables or data needed
        // to be modified so a migrator for that version is not included.
        return {
          1: (db: any, transaction: { objectStore: (arg0: string) => any; }) => {
            const store = transaction.objectStore('units');
            store.createIndex('unit', 'unit', { unique: true });
          }
        };
      }

   export let DBConfig  = {
        name: 'MyDb',
        version: 1,
        objectStoresMeta: [{
          store: 'units',
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'unit', keypath: 'unit', options: { unique: true } },
          ]
        }],
        migrationFactory
      };