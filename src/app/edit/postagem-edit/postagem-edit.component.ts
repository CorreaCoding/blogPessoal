import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemDeleteComponent } from 'src/app/delete/postagem-delete/postagem-delete.component';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(private postagemService: PostagemService, private temaService: TemaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (environment.token == '') {
      // alert("Sua sessão expirou, faça o login novamente.")
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id']
    this.findPostagemById(id)
    this.findAllTemas()
}

findAllTemas(){
  this.temaService.getAllTema().subscribe((resp: Tema[]) => {
    this.listaTemas = resp;
  })
}

findTemaById(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
    this.tema = resp
  })
 }

 findPostagemById(id: number){
this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
  this.postagem = resp
})
 }


}
