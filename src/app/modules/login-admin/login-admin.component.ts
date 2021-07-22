import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  public IsWait: Boolean = false;
  public userForm: FormGroup;
  public urlLogo1: string;
  public urlLogo2: string;

  public usuario: string = "";
  public password: string = "";
  public userData: any= {};
  userKey: string='USUARIO';
  constructor(
    private loginService: LoginService, 
    private router: Router,
  ) {
    this.urlLogo1 = "../../../assets/cinema.jpg";
    this.urlLogo2 = "../../../assets/logoIngeneo.png";
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

 
  login() {
    this.loginService.loginWeb(this.userForm.value).subscribe(response => {
      this.IsWait = false;
      this.userData = response;
      console.log(response);
      if(response == true){
      this.router.navigate(['/dashboard']);
      }else{
      this.showMsgBadLogin("Autentication incorrecta!!!");
      }
    });
  }

  showMsgBadLogin(mensaje: string) {
    Swal.fire({
      title: '',
      text: mensaje,
      type: 'warning',
      showCancelButton: false,
    });
  }

  autenticar() {
    if (this.userForm.valid) {
      this.login();
    }
  } 
}
