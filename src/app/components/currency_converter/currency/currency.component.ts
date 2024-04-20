import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CURRENCIES } from '../../../constants';
import { CurrencyService } from '../../../services/currency/currency.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../../http-interceptor/auth.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-currency',
  standalone: true,
  providers: [
    CurrencyService,
        {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
  },
  ],
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule, 
    MatIconModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {
  value: number = 0.0;
  // from: String = "";
  // to: String = "";
  currencies: Array<any> = CURRENCIES;
  converted: boolean =  false;
  resultFrom: String = "";
  resultTo: String = "";
  resultInfo: String = "";
  showHistory: boolean = false;
  historyDate: Date = new Date();

  form = new FormGroup({
    from: new FormControl<string>('', [Validators.required]),
    to: new FormControl<string>('', [Validators.required]),
    value: new FormControl<number>(0, [Validators.required])
  });

  constructor(
    private currencyService: CurrencyService
  ) {

  }

  public async switchCurrencies(): Promise<void> {
    const temp = this.form.controls.from.value;
    this.form.controls.from.setValue(this.form.controls.to.value);
    this.form.controls.to.setValue(temp);
    this.converted = false;
    this.convert();
  }

  public async convert(): Promise<void> {
    if(this.form.invalid){
      alert("please complete all the required fields")
      return;
    }
    let result = null;
    if(!this.showHistory)
      result = await this.currencyService.convert(this.form.controls.value.value as number, this.form.controls.from.value as any, this.form.controls.to.value as any);
    else 
      result = await this.currencyService.history(this.form.controls.value.value as number, this.historyDate, this.form.controls.from.value as any, this.form.controls.to.value as any);
    
    if(!result.exchange_rates[`${this.form.controls.to.value}`]){
      this.resultInfo = 'No History Data';
      this.converted = true;
      return;
    }
    this.resultFrom = `${this.form.controls.value.value} ${this.form.controls.from.value}`;
    const diff = this.form.controls.value.value! * result.exchange_rates[`${this.form.controls.to.value}`];
    this.resultTo = `${diff} ${this.form.controls.to.value}`;
    this.resultInfo = `
    1 ${this.form.controls.from.value} = ${result.exchange_rates[`${this.form.controls.to.value}`]} ${this.form.controls.to.value}
    `;
    this.converted = true
  }
}
