import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinations = [];
  subject = "Contacto desde la web";
  extraIndex = 1;
  @ViewChild('extras') extras:ElementRef;
  constructor(private router: 
    Router) { }

  ngOnInit() {
    this.destinations.push({})
    this.destinations[0].type = "from";
    this.destinations[0].email = "";
  }

  addMail(){
    let i = this.extraIndex++;
    let inputs = `
      <div class="form-group w-80 mx-auto text-left">
      <div class="row align-items-center">
          <div class="col-2">
            <select class="selectpicker" id="type_${i}">
              <option value="cc">CC:</option>
              <option value="from">Para:</option>
              <option value="cco">CCO:</option>
            </select>
          </div>
          <div class="col-5">
              <input type="text" class="form-control" id="email_${i}" placeholder="Mail">
          </div>
          <div class="col-5">
              <input type="text" class="form-control" id="nombre_${i}" placeholder="Nombre">
          </div>
        </div>
      </div>
    `;
    this.extras.nativeElement.insertAdjacentHTML('beforeend', inputs);
  }

  nextStep(){
    for (let i=1;i<=this.extraIndex-1;i++){
      let row = {
        type:document.querySelector<HTMLInputElement>("#type_"+i).value,
        email:document.querySelector<HTMLInputElement>("#nombre_"+i).value,
        name:document.querySelector<HTMLInputElement>("#email_"+i).value,
      }
      this.destinations.push(row)
    }
    GlobalService.subject = this.subject;
    GlobalService.destination = this.destinations;
    this.router.navigate(['/conection'], { skipLocationChange: true});
  }

}
