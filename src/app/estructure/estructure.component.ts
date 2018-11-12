import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-main',
  templateUrl: './estructure.component.html',
  styleUrls: ['./estructure.component.css']
})
export class EstructureComponent implements OnInit {
  inputSelected = "Seleccioná";
  numInput:number = 0;
  @ViewChild('listInputs') listInputs:ElementRef;
  @ViewChild('content') content:ElementRef;
  constructor(private modalService: NgbModal,private router: 
    Router) { }

  ngOnInit() {
  }


  addInput(content,id = ""){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true});
    // Para la acción de editar:
    if(id != ""){
      this.changeAction("Text")
      document.forms[0].idInput.value = "test";
    }
  }

  saveInput(){
    if((document.forms[0].idInput.value != "") && (document.forms[0].labelInput.value != "")){
      let options = [];
      if(this.inputSelected == "Select" || this.inputSelected == "Checkbox" || this.inputSelected == "Radio"){
        document.querySelectorAll("#selectOptions .card").forEach((element,index)=>{
          let row;
          row = {
            value:element.querySelector<HTMLInputElement>(".optionValue").value,
            label:element.querySelector<HTMLInputElement>(".optionLabel").value
          }
          options.push(row);
        });
      }
      let inputProp = {
        id: document.forms[0].idInput.value,
        type: this.inputSelected.toLocaleLowerCase(),
        label: document.forms[0].labelInput.value,
        placeholder: document.forms[0].placeholderInput.checked,
        requerido: document.forms[0].requeridoInput.checked,
        options:options
      };
      GlobalService.inputs.push(inputProp);
      this.numInput++;
      let row = `
      <div class="card mt-2" id="${inputProp.id}_card">
        <div class="card-body">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-6">
                ${inputProp.label}
              </div>
              <div class="col-5">
                ${inputProp.type}
              </div>
              <!-- Btn Editar:
              <div class="col-1">
                <button type="button" class="btn btn-primary-outline editBtn" style="background-color:transparent" ref="${inputProp.id}" (click)="editInput()">
                  <i class="fas fa-pencil-alt" style="color:green"></i>
                </button>
              </div>
              -->
              <div class="col-1">
                <button type="button" class="btn btn-primary-outline deleteBtn" style="background-color:transparent" ref="${inputProp.id}" (click)="deteteInput()">
                  <i class="fas fa-trash-alt" style="color:red"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      this.listInputs.nativeElement.insertAdjacentHTML('beforeend', row);
      //Btn Editar
      //this.listInputs.nativeElement.querySelector("#"+inputProp.id+"_card .editBtn").addEventListener("click",this.editInput.bind(this));
      this.listInputs.nativeElement.querySelector("#"+inputProp.id+"_card .deleteBtn").addEventListener("click",this.deteteInput.bind(this));
      this.modalService.dismissAll();
      this.inputSelected = "Seleccioná";
    }else{
      document.querySelector("#errorMsg").innerHTML = `
        <div class="alert alert-danger mt-4" role="alert">
          Completá los campos requeridos zapalle!
        </div>
      `
    }
  }

  editInput(e){
    let id = e.currentTarget.getAttribute("ref");
    this.addInput(this.content,id);
  }

  deteteInput(e){
    let id = e.currentTarget.getAttribute("ref");
    this.listInputs.nativeElement.querySelector("#"+id+"_card").remove();
    GlobalService.inputs.forEach( (item, index) => {
      if(item['id'] === id) GlobalService.inputs.splice(index,1);
    });
    this.numInput--;
  }

  changeAction(obj) {
    this.inputSelected = obj
    
      let ops = `
      <div class="form-group">
        <input type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon2" name="idInput">
      </div>
      <div class="form-group">
        <div class="row align-items-center">
          <div class="col">
            <input type="text" class="form-control" placeholder="Label" aria-label="Label" aria-describedby="basic-addon2" name="labelInput">
          </div>
          <div class="col">
            <div class="form-check">
              <input type="checkbox" checked class="form-check-input" id="placeholder" name="placeholderInput">
              <label class="form-check-label" for="placeholder">Placeholder</label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="requerido" name="requeridoInput">
        <label class="form-check-label" for="requerido">Requerido</label>
      </div>
      `;
    let ext = '';
    if(obj == "Select"){
      ext = `
        <div>
          <hr class="my-4">
          <h5>Opciones</h5>
          <hr class="my-4">
          <div id="selectOptions">
            
          </div>
          <hr class="my-4">
          <button type="button" class="btn btn-secondary" id="addOptionBtn" (click)="addOptionSelect()"><i class="fas fa-plus"></i> AGREGAR OPCION</button>
        </div>
      `;
      ops += ext;
    }

    document.querySelector("#opsInput").innerHTML = ops;

    if(obj == "Select"){
      document.querySelector("#addOptionBtn").addEventListener("click",this.addOptionSelect.bind(this));
      this.addOptionSelect();
    }
  }

  addOptionSelect(){
    let rowOption = `
    <div class="card mt-2" >
      <div class="card-body">
        <div class="container">
            <div class="row">
              <div class="col-6">
                <input type="text" class="form-control optionValue" placeholder="Valor" aria-label="Valor" aria-describedby="basic-addon2">
              </div>
              <div class="col-6">
                <input type="text" class="form-control optionLabel" placeholder="Label" aria-label="Label" aria-describedby="basic-addon2">
              </div>
            </div>
        </div>
      </div>
    </div>
    `;
    document.querySelector("#selectOptions").insertAdjacentHTML('beforeend', rowOption);
  }

  nextStep(){
    this.router.navigate(['/messages'], { skipLocationChange: true});
  }

}
