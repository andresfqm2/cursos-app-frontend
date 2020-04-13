import { Injectable } from '@angular/core';
import { Curso } from '../_model/curso';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  cursoCambio = new Subject<Curso[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/cursos`;
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/pacientes`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Curso[]>(this.url);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idCurso: number) {
    return this.http.get<Curso>(`${this.url}/${idCurso}`);
  }

  registrar(curso: Curso) {
    return this.http.post(this.url, curso);
  }

  modificar(curso: Curso) {
    return this.http.put(this.url, curso);
  }

  eliminar(idCurso: number) {
    return this.http.delete(`${this.url}/${idCurso}`);
  }
}
