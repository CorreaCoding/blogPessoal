import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(private http: HttpClient) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>("https://correacoding.herokuapp.com/usuario/logar", usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>("https://correacoding.herokuapp.com/usuario/cadastrar", usuario)
  }

  getUsuarioById(id: number): Observable<Usuario>{
  return this.http.get<Usuario>(`https://correacoding.herokuapp.com/usuario/${id}`, this.token)
  }

  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }
    return ok
  }
}
