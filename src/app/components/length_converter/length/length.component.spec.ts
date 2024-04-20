import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthComponent } from './length.component';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { DBConfig } from '../../../constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LengthComponent', () => {
  let component: LengthComponent;
  let fixture: ComponentFixture<LengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LengthComponent, BrowserAnimationsModule, NgxIndexedDBModule.forRoot(DBConfig)],
      providers:[NgxIndexedDBService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
