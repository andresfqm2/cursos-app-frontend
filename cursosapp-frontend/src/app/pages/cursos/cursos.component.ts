import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from 'src/app/_service/curso.service';
import { Curso } from 'src/app/_model/curso';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['idCurso', 'nombre', 'urlImagen', 'fechaInicio', 'fechaFin'];
  dataSource: any[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.cursoService.listar().subscribe(data => {
      this.dataSource = data;
    });

  }

}
