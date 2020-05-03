import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursoEstudianteDto } from 'src/app/_model/cursoEstudianteDto';
import { MatriculaService } from 'src/app/_service/matricula.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['nombre', 'fecha_inicio', 'fecha_fin', 'nota'];
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
        console.log(data);
      });
    }

}
