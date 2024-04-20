import { Component } from '@angular/core';
import { LengthService } from '../../../services/length/length.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit } from 'convert';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-unit',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule,  MatButtonModule,
    ReactiveFormsModule,FlexLayoutModule, MatCheckboxModule
  ],
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.scss'
})
export class AddUnitComponent {
  unitName = new FormControl('', [Validators.required]);
  showAddunit: boolean = false;
  constructor(
    private lengthService: LengthService
  ) {

  }

  public async addUnit(): Promise<void> {
    console.log(this.unitName);
    if(this.unitName.invalid) {
      alert('Please add a unit');
      return;
    }

    this.lengthService.addUnit(this.unitName.value as Unit);
  }

}
