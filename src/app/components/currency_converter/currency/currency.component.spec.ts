import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyComponent } from './currency.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../http-interceptor/auth.interceptor';
import { CurrencyService } from '../../../services/currency/currency.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CurrencyComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        CurrencyService,
            {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
      },
      HttpClient
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
