import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { LengthService } from '../../../services/length/length.service';
import { Unit } from "convert";
import { AddUnitComponent } from "../add-unit/add-unit.component";
import { FlexLayoutModule } from '@angular/flex-layout';



@Component({
    selector: 'app-length',
    standalone: true,
    providers: [
        LengthService
    ],
    templateUrl: './length.component.html',
    styleUrl: './length.component.scss',
    imports: [
        MatFormFieldModule,
        MatSelectModule, MatInputModule,
        FormsModule, MatIconModule, MatButtonModule,
        ReactiveFormsModule,
        AddUnitComponent,
        FlexLayoutModule
    ]
})
export class LengthComponent {
  units: String[] = [];
  converted: boolean =  false;
  resultFrom: string = ""
  resultTo: string = "";

  form = new FormGroup({
    from: new FormControl<string>('', [Validators.required]),
    to: new FormControl<string>('', [Validators.required]),
    value: new FormControl<number>(0, [Validators.required])
  });

  constructor(
    private lengthService: LengthService
  ) {
    lengthService.initDb();
    this.lengthService.getUnits().then((units) => {
      // console.log()
      this.units = units.map((e) => e.unit);
    });

  }

  public async switchUnits(): Promise<void> {
    const temp = this.form.controls.from.value;
    this.form.controls.from.setValue(this.form.controls.to.value);
    this.form.controls.to.setValue(temp);
    this.converted = false;
    this.convert();
  }

  public async convert(): Promise<void> {
    const result = await this.lengthService.convert(this.form.controls.value.value as number, this.form.controls.from.value as Unit, this.form.controls.to.value as Unit);
    this.resultFrom = `${this.form.controls.value.value} ${this.form.controls.from.value}`;
    this.resultTo = `${result.value} ${this.form.controls.to.value}`;
    this.converted=true;
  }


}
