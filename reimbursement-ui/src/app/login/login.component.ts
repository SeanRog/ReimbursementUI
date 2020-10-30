import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get formFields() {
    return this.loginForm.controls;
  }

  login() {
    
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService.authenticate(this.formFields.username.value, this.formFields.password.value)
                    .subscribe(
                      () => {
                        this.loading = false;
                        this.router.navigate(['']);
                      },
                      err => {
                        console.log(err);
                        this.loading = false;
                        this.submitted = false;
                      }
                    )

  }

}
