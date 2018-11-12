import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static url_generator = "./generator"
  static nameForm:string;
  static inputs:any = [];
  static msg:any;
  static subject:string;
  static destination:any;
  static smtp:any;
  constructor() { }
}
