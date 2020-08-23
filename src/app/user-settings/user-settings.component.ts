import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { UserData } from '../_models/UserData';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  editMode = false;
  editedData = null;
  userData: UserData[];
  passwordMode: boolean = false;
  dataFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(''),
    postalCode: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),
    city: new FormControl(''),
    taxNumber: new FormControl(''),
  });

  newPassword = new FormControl(null, [
    Validators.required,
    Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}'),
  ]);
  confirmPassword = new FormControl(null);

  constructor(private userService: UserService) {
    this.updateUserData();
  }

  ngOnInit(): void {}

  updateUserData() {
    this.userService.getUsersData().subscribe((data: UserData[]) => {
      this.userData = data;
    });
  }
  onAddData() {
    this.editMode = false;
    this.dataFormGroup.setValue({
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      postalCode: '',
      street: '',
      houseNumber: '',
      city: '',
      taxNumber: '',
    });
  }

  onDataSubmit() {
    if (this.editMode) {
      this.editedData = { ...this.editedData, ...this.dataFormGroup.value };
      console.log(this.editedData);
      this.userService.updateUserData(this.editedData).subscribe(() => {
        this.updateUserData();
      });
    } else {
      this.userService
        .postUserData(this.dataFormGroup.value)
        .subscribe(() => this.updateUserData());
    }
  }

  onChangePassword() {
    this.passwordMode = true;
    this.userService
      .changePassword(this.newPassword.value)
      .subscribe((res) => console.log(res));
  }

  onDataDelete(id) {
    this.userService.deleteUserData(id).subscribe((data) => {
      this.updateUserData();
    });
  }
  onDataEdit(uData) {
    this.editMode = true;
    this.dataFormGroup.setValue({
      firstName: uData.firstName,
      lastName: uData.lastName,
      email: uData.email,
      telephone: uData.telephone,
      postalCode: uData.postalCode,
      street: uData.street,
      houseNumber: uData.houseNumber,
      city: uData.city,
      taxNumber: uData.taxNumber,
    });
    this.editedData = uData;
  }
}
