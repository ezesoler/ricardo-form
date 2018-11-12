import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  data;
  loadingText = "Generando formulario...";
  file = "";
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.data = {
      name:GlobalService.nameForm,
      inputs:GlobalService.inputs,
      messages:GlobalService.msg,
      subject:GlobalService.subject,
      destinations:GlobalService.destination,
      smtp:GlobalService.smtp
    }

    this.send(this.data).then(data => {
      console.log("Respuesta:");
      if(data["status"] == "OK"){
        this.loadingText = "Listo!";
        this.file = "./generator/out/"+data["file"]+".zip";
      }else{

      }
    });
    
  }

  send(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(GlobalService.url_generator,JSON.stringify(data),{headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  download(){
    window.location.href = this.file;
  }

}
