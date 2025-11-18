import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";

@Component({
  selector: 'app-footer',
  imports: [AuthRoutingModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true,
})
export class Footer {}
