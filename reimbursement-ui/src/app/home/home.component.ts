import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token;

  constructor(private authService: AuthService) {
    this.token = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
