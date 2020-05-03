import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { MenuService } from './../../_service/menu.service';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import '../../../assets/login-animation.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from 'src/app/_service/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;
  nombreUsuario: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private registroService: RegistroService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {

    this.registroService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      });
  });
}


  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      console.log("llego al metodo iniciar sesion con la avriable data");
      console.log(data);

      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);


      const helper = new JwtHelperService();

      // Esta variable contiene el usuario y los roles
      let decodedToken = helper.decodeToken(data.access_token);

      sessionStorage.setItem("nombre", decodedToken.user_name);
      sessionStorage.setItem("rol", decodedToken.authorities);

      //console.log(decodedToken);
      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        this.menuService.menuCambio.next(data);
      });

      this.router.navigate(['estudiante']);

    });
  }

  procesaPropagar(mensaje) {
    console.log(mensaje);
  }

}
