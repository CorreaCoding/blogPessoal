import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css'],
})
export class PostagemDeleteComponent implements OnInit {
  postagem: Postagem = new Postagem();
  idPostagem: number;

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);

    if (environment.token == '') {
      // alert("Sua sessão expirou, faça o login novamente.")
      this.router.navigate(['/entrar']);
    }

    this.idPostagem = this.route.snapshot.params['id'];
    this.findPostagemById(this.idPostagem);
  }

  findPostagemById(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  apagar() {
 this.postagemService.deletePostagem(this.idPostagem).subscribe(()=>{
   alert('Postagem removida com sucesso!')
   this.router.navigate(['/inicio'])
 })
  }
}
