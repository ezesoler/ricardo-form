import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-conection',
  templateUrl: './conection.component.html',
  styleUrls: ['./conection.component.css']
})
export class ConectionComponent implements OnInit {
  host = "";
  usuario = "";
  password = "";
  constructor(private router: 
    Router) { }

  ngOnInit() {
  }

  nextStep(){
    GlobalService.smtp = {host:this.host,user:this.usuario,password:this.password};
    this.router.navigate(['/generator'], { skipLocationChange: true});
  }

}
