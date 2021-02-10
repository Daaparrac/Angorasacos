import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginUserModel } from '../../../models/login';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: LoginUserModel = new LoginUserModel();
  recordarme = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      icon: 'info',
      text: 'Por favor espere',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.authService.login(this.user).subscribe(
      (res) => {
        if (this.recordarme) {
          localStorage.setItem('email', this.user.email);
        }

        setTimeout(() => {
          Swal.close();
          //this.router.navigateByUrl('/dashboard');
        }, 500);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          text: err.error.error.mensaje,
        });
      }
    );
  }

  /*
  nodemailer = require('nodemailer');

  transporter = this.nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });

  mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
    transporter.sendMail(this.mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });*/

}
