
export interface ExchangeRates {
    [name: string]: number
  }

export interface CurrencyExhange{
    base: string
    last_updated: number
    exchange_rates: ExchangeRates
}
