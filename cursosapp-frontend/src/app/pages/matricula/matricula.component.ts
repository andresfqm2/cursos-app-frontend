import { Component, OnInit } from '@angular/core';
import { CursoEstudianteDto } from 'src/app/_model/cursoEstudianteDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatriculaService } from 'src/app/_service/matricula.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['nombre', 'fechaInicio', 'fechaFin', 'nota'];
  dataSource: MatTableDataSource<CursoEstudianteDto>
  constructor(private matriculaService: MatriculaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.matriculaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.mostrarCursosInscritos(25); //naqui voy hay que mirar el sesion staora para traer el id del Usuario

  }

  mostrarCursosInscritos(idUsuario: number) {
    this.matriculaService.listar(idUsuario).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


}
