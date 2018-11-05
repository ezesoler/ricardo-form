import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static nameForm:string;
  static inputs:any = [];
  static msg:any;
  static destination:any;
  constructor() { }
}
