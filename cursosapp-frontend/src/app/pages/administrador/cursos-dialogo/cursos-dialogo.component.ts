import { Component, OnInit, Inject } from '@angular/core';
import { Curso } from 'src/app/_model/curso';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoService } from 'src/app/_service/curso.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-dialogo',
  templateUrl: './cursos-dialogo.component.html',
  styleUrls: ['./cursos-dialogo.component.css']
})
export class CursosDialogoComponent implements OnInit {

  curso : Curso;

  maxFecha: Date = new Date();
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<CursosDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Curso,
    private cursoService : CursoService
  ) { }

  ngOnInit(): void {

    this.curso = new Curso();
    this.curso.idCurso = this.data.idCurso;
    this.curso.nombre = this.data.nombre;
    this.curso.urlImagen = this.data.urlImagen;
    this.curso.fechaInicio = this.data.fechaInicio;
    this.curso.fechaFin = this.data.fechaFin;

  }

  cancelar() {
    this.dialogRef.close();
  }

  operar(){

    let tzoffset = (this.fechaInicio).getTimezoneOffset() * 60000;
    let tzoffset1 = (this.fechaFin).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    let localISOTime1 = (new Date(Date.now() - tzoffset1)).toISOString();
    this.curso.fechaInicio = localISOTime;
    this.curso.fechaFin = localISOTime1;
    
    if (this.curso != null && this.curso.idCurso > 0) {
      //MODIFICAR
      //BUENO PRACTICA
      this.cursoService.modificar(this.curso).pipe(switchMap( () => {
        return this.cursoService.listar();
      })).subscribe(data => {
        this.cursoService.cursoCambio.next(data);
        this.cursoService.mensajeCambio.next('SE MODIFICO');
      });      
    }else{
      //REGISTRAR      
      //PRACTICA COMUN
      this.cursoService.registrar(this.curso).subscribe(() => {
        this.cursoService.listar().subscribe(data => {
          this.cursoService.cursoCambio.next(data);
          this.cursoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

}
