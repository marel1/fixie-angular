import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from "../Service/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  @Output() registered = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    //this.router.navigate(['/home']);
    this.registered.emit(true);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {

          //this.router.navigate(['/home']);
          location.href = '/';

        },
        error => {
          this.loading = false;
        });
  }
    registerClicked(){
      this.userService.register(this.registerForm.get(['username']),this.registerForm.get(['password']));
    }
}

