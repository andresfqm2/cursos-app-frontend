import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from 'src/app/_model/curso';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from 'src/app/_service/curso.service';
import { CursosDialogoComponent } from '../cursos-dialogo/cursos-dialogo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.css']
})
export class AdministrarCursosComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['idCurso', 'nombre', 'fechaInicio', 'fechaFin', 'acciones'];
  dataSource: MatTableDataSource<Curso>
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cursoService: CursoService,
    private dialog : MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.cursoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.cursoService.cursoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.cursoService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

    });
  }


  filtrar(valor: string) {
      this.dataSource.filter = valor.trim().toLowerCase();
    }

  eliminar(idCurso: number) {
      this.cursoService.eliminar(idCurso).subscribe(() => {
        this.cursoService.listar().subscribe(data => {
          this.cursoService.cursoCambio.next(data);
          this.cursoService.mensajeCambio.next('SE ELIMINO');
        });
      });
    }

  mostrarMas(e: any) {
      this.cursoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
        console.log(data);
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
      });
    }

    abrirDialogo(curso? : Curso){
      let med = curso != null ? curso : new Curso();
      this.dialog.open(CursosDialogoComponent, {
        width: '250px',
        data: med
      });
    }

}
