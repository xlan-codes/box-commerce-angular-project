import { Routes } from '@angular/router';
import { CurrencyComponent } from './components/currency_converter/currency/currency.component';
import { LengthComponent } from './components/length_converter/length/length.component';

export const routes: Routes = [
    {
        title: 'Length Converter',
        path: 'length-converter',
        component: LengthComponent
    },
    {
        title: 'Currency Converter',
        path: 'currency-converter',
        component: CurrencyComponent
    }
];
