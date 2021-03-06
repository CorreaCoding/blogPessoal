import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tituloPostagem: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  descricaoTema: string;

  usuario: Usuario = new Usuario();
  idUsuario = environment.id;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      // alert("Sua sessão expirou, faça o login novamente.")
      this.router.navigate(['/entrar']);
    }

    this.findAllTemas();
    this.getAllPostagens();
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findTemaById() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByIdUsuario() {
    this.authService
      .getUsuarioById(this.idUsuario)
      .subscribe((resp: Usuario) => {
        this.usuario = resp;
      });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.postagem = new Postagem(); //Limpa os campos para realizar uma nova Postagem
        this.getAllPostagens();
      });
  }

  findByTituloPostagem() {
    if (this.tituloPostagem == '') {
      this.getAllPostagens();
    } else {
      this.postagemService
        .getByTituloPostagm(this.tituloPostagem)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  getByDescricaoTema() {
    if ((this.descricaoTema == '')) {
      this.findAllTemas();
    } else {
      this.temaService
        .getByDescricaoTema(this.descricaoTema)
        .subscribe((resp: Tema[]) => {
          this.listaTemas = resp;
        });
    }
  }
}
