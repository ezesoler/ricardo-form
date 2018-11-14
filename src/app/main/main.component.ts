import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  formid:string = '';

  constructor(private router: 
    Router) {
    }

  ngOnInit() {
  }

  nextStep(){
    GlobalService.nameForm = this.formid;
    document.querySelector<HTMLElement>("#progress").style.width = "20%";
    this.router.navigate(['/estructure'], { skipLocationChange: true});
  }

}
