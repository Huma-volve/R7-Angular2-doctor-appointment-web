import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthRoutingModule } from '../../../auth/auth-routing-module';
import { AuthService } from '../../../auth/service/auth';
import { take } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Footer, AuthRoutingModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  appInitialized = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.pipe(take(1)).subscribe((res) => {
      this.appInitialized = res;
    });
  }
}
