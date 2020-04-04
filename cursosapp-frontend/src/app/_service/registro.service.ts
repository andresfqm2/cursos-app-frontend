import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/usuarios`; 
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/medicos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(this.url);
  }

  listarPorId(idUsuario: number) {
    return this.http.get<Usuario>(`${this.url}/${idUsuario}`);
  }

  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  modificar(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }

  eliminar(idUsuario: number) {
    return this.http.delete(`${this.url}/${idUsuario}`);
  }

}
