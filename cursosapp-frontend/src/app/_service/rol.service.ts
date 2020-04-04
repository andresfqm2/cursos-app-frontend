import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../_model/rol';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = `${environment.HOST}/roles`; 
  
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }
}
