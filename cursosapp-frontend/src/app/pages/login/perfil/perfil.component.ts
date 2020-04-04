import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombreUsuario : String;
  rol : any;
  constructor(private dialogRef: MatDialogRef<PerfilComponent>) { }

  ngOnInit(): void {

  this.nombreUsuario = sessionStorage.getItem("nombre");
  this.rol = sessionStorage.getItem("rol");

  }

  cancelar() {
    this.dialogRef.close();
  }



}
