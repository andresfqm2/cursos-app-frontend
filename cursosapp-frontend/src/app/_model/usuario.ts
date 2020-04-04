import { Rol } from './rol';
import { UsuarioRol } from './usuarioRol';

export class Usuario{
    idUsuario: number;
    nombre: string;
    apellidos: string;
    numeroIdentificacion: string;
    edad: string;
    telefono: string;
    email: String;
    pass: String;
    rol: Rol[];
}