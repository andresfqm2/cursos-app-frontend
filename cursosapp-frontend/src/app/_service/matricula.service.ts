import { Injectable } from '@angular/core';
import { CursoEstudianteDto } from '../_model/cursoEstudianteDto';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  matriculaCambio = new Subject<[CursoEstudianteDto]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/matriculas`; 


  constructor(private http: HttpClient) { }

  listar(idUsuario: number){
    return this.http.get<CursoEstudianteDto[]>(`${this.url}/${idUsuario}`);
  }

  registrar(cursoEstudiante: CursoEstudianteDto) {
    return this.http.post(this.url, cursoEstudiante);
  }

  modificar(cursoEstudiante: CursoEstudianteDto) {
    return this.http.put(this.url, cursoEstudiante);
  }

  eliminar(idCurso: number) {
    return this.http.delete(`${this.url}/${idCurso}`);
  }

}
