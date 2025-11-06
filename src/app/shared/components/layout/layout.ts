import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";

@Component({
  selector: 'app-layout',
  imports: [Navbar, Footer, AuthRoutingModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
