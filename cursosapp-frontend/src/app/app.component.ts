import { LoginService } from './_service/login.service';
import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/login/perfil/perfil.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nombreUsuario: String;

  menus: Menu[] = [];

  constructor(
    public loginService: LoginService,
    private menuService: MenuService,
    private dialog: MatDialog) {


  }

  ngOnInit() {
    this.menuService.menuCambio.subscribe(data => {
      this.menus = data;

    });
  }

  abrirDialogo() {
    this.dialog.open(PerfilComponent, {
      width: '300px',
    });
  }

}
