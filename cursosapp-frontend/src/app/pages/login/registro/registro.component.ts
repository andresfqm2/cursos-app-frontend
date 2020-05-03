import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RegistroService } from 'src/app/_service/registro.service';
import { Usuario } from 'src/app/_model/usuario';
import { Rol } from 'src/app/_model/rol';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/_service/rol.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  rolSeleccionado: Rol;
  rolesFiltrados: Observable<any[]>;
  roles: Rol[] = [];

  myControlRol: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registroService: RegistroService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellidos': new FormControl('', Validators.required),
      'dni': new FormControl(''),
      'edad': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'rol': this.myControlRol
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      //this.initForm();
    });

    this.listarRoles();

    this.rolesFiltrados = this.myControlRol.valueChanges.pipe(map(val => this.filtrarRoles(val)));
  }

  get f() { return this.form.controls; }

  getFontSize() {
    return Math.max(10, this.myControlRol.value);
  }

  operar() {

    if (this.form.invalid) {
      return;
    }


    let usuario = new Usuario;
    usuario.idUsuario = 0;
    usuario.nombre = this.form.value['nombres'];
    usuario.apellidos = this.form.value['apellidos'];
    usuario.numeroIdentificacion = this.form.value['dni'];
    usuario.edad = this.form.value['edad'];
    usuario.telefono = this.form.value['telefono'];
    usuario.email = this.form.value['email'];
    usuario.pass = this.form.value['password'];
    usuario.rol = this.form.value['rol'];


    this.registroService.registrar(usuario).subscribe(() => {
      this.registroService.mensajeCambio.next('SE REGISTRO');
    });

    this.router.navigate(['login']);
  }

  filtrarRoles(val: any) {
    console.log("Ingreso al metodo filtrarRoles lo que tiene le variavle val es ");
    console.log(val);
    if (val != null && val.idRol > 0) {
      return this.roles.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.roles.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }

  }

  listarRoles() {

    this.rolService.listar().subscribe(data => {
      this.roles = data;

      console.log(data);
    });
  }

  mostrarRol(val: Rol) {
    return val ? `${val.nombre}` : val;
  }

  seleccionarRol(e: any) {
    this.rolSeleccionado = e.option.value;
  }
}