import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  loginSub: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {
    this.loginSub = this.authService.loginSubject.subscribe((val) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {}
  handleLogout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
}
