import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Activity } from '../_models/Activity';
import { ActivityDictionariesService } from '../Service/activityDictionaries.service';

@Component({
  selector: 'app-activity-dictionaries',
  templateUrl: './activity-dictionaries.component.html',
  styleUrls: ['../shared_styles.css'],
})
export class ActivityDictionariesComponent implements OnInit {
  editedData = null;
  activityData: Activity[] = [];
  dataFormGroup: FormGroup = new FormGroup({
    actType: new FormControl('', Validators.required),
    actName: new FormControl('', Validators.required),
  });

  constructor(
    private activityDictionariesService: ActivityDictionariesService
  ) {
    this.updateData();
  }

  ngOnInit(): void {}

  updateData() {
    this.activityDictionariesService
      .getPartTypeData()
      .subscribe((data: Activity[]) => {
        this.activityData = data;
      });
  }
  onAddData() {
    this.dataFormGroup.setValue({
      actType: '',
      actName: '',
    });
  }

  onDataSubmit() {
    this.activityDictionariesService
      .postPartTypeData(this.dataFormGroup.value)
      .subscribe((data) => {
        this.updateData();
      });
  }

  onDataDelete(code) {
    this.activityDictionariesService
      .deletePartTypeData(code)
      .subscribe((data) => {
        this.updateData();
      });
  }
}
