import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap} from 'rxjs/operators';
import {UserService} from "../Service/user.service";
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @Output() logged = new EventEmitter<boolean>();

  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private userService: UserService,
               private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username: ['',Validators.required],
      password:['',Validators.required]
    });
    //get return url from route parameters or default to '/'
    this.returnUrl=this.route.snapshot.queryParams['returnUrl']||'/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    //this.router.navigate(['/home']);
    this.logged.emit(true);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.authService.successfulLogin(data)

          //this.router.navigate([this.returnUrl]);
          //this.router.navigate(['/home']);
          // location.href = '/';

        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
    loginClicked(){
      this.userService.login(this.loginForm.get(['username']),this.loginForm.get(['password']));
    }
}

