import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { UserData } from '../_models/UserData';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  userData: UserData[];
  passwordMode: boolean = false;
  constructor(private userService: UserService) {
    this.userService.getUsersData().subscribe((data: UserData[]) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  ngOnInit(): void {}

  postUserData() {
    this.userService.postUserData().subscribe((data) => console.log(data));
  }

  onChangePassword() {
    this.passwordMode = true;
  }
}
