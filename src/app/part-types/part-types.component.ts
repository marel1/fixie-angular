import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartTypesService } from '../Service/part-types.service';
import { PartType } from '../_models/PartType';

@Component({
  selector: 'app-part-types',
  templateUrl: './part-types.component.html',
  styleUrls: ['./part-types.component.css'],
})
export class PartTypesComponent implements OnInit {
  editedData = null;
  partTypeData: PartType[] = [];
  dataFormGroup: FormGroup = new FormGroup({
    codeType: new FormControl('', Validators.required),
    nameType: new FormControl('', Validators.required),
  });

  constructor(private partTypesService: PartTypesService) {
    this.updateData();
  }

  ngOnInit(): void {}

  updateData() {
    this.partTypesService.getPartTypeData().subscribe((data: PartType[]) => {
      console.log('get');
      console.log(data);
      this.partTypeData = data;
    });
  }
  onAddData() {
    this.dataFormGroup.setValue({
      codeType: '',
      nameType: '',
    });
  }

  onDataSubmit() {
    console.log(this.dataFormGroup.value);
    this.partTypesService
      .postPartTypeData(this.dataFormGroup.value)
      .subscribe((data) => {
        console.log('add');

        console.log(data);
        this.updateData();
      });
  }

  onDataDelete(id) {
    this.partTypesService.deletePartTypeData(id).subscribe((data) => {
      this.updateData();
    });
  }
}
