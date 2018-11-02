import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  msgExito:string = "El mensaje fue enviado con éxito.";
  msgFracaso:string = "Ocurrió un error al enviar los datos, intentelo nuevamente mas tarde.";
  constructor(private router: 
    Router) { }

  ngOnInit() {
  }

  nextStep(){
    GlobalService.msg = {success:this.msgExito,fail:this.msgFracaso};
    this.router.navigate(['/destination'], { skipLocationChange: true});
  }

}
