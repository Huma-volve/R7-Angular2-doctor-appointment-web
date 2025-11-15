import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { take } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  appInitialized = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.pipe(take(1)).subscribe((res) => {
      console.log(res);
      this.appInitialized = res;
    });
  }
}
