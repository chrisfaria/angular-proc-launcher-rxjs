import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';


import { Proc } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ProcService {

  private messageSource: BehaviorSubject<string>;
  //private messageSource = new BehaviorSubject('default message');
  public currentMessage: Observable<string>;
  //currentMessage = this.messageSource.asObservable();

  private procsUrl = 'api/procs';  // URL to web api

  constructor(private http: HttpClient) {
    this.messageSource = new BehaviorSubject<string>(localStorage.getItem('currentMessage'));
    this.currentMessage = this.messageSource.asObservable();
  }

  // not good, synchronous
  // getProcs(): Proc[] {
  //   return PROCS;
  // }

  // getProcs(): Observable<Proc[]> {
  //   return of(PROCS);
  // }

  /** GET procs from the server */
  getProcs (): Observable<Proc[]> 
  {
    return this.http.get<Proc[]>(this.procsUrl).pipe(
      delay(50),
      map(resp => {
        console.log('test1');
        console.log(resp);
        //localStorage.setItem('currentMessage', JSON.stringify(resp));
        //this.messageSource.next(resp);
        console.log('test2');
        return resp;
      }));
  }

  postProcess(url: string, params): Observable<any> 
  {
    return this.http.get<any>(this.procsUrl).pipe(
      delay(3000),
      map(resp => {
        console.log('test1');
        console.log(resp);
        localStorage.setItem('currentMessage', JSON.stringify(resp));
        this.messageSource.next(resp);
        console.log('test2');
        return resp;
      }));

    // return this.http.get<Proc[]>(this.procsUrl).pipe(
    //   delay(50),
    //   map(resp => {
    //     console.log('test1');
    //     console.log(resp);
    //     console.log('test2');
    //     return resp;
    //   }));

    // return this.http.get<any>(this.procsUrl)//+'/11')
    //   .pipe(
    //     map(resp => {
    //       localStorage.setItem('currentMessage', JSON.stringify(resp));
    //       this.messageSource.next(resp);
    //       //return resp;
    //     })/*,
    //     delay(3000)*/);
    
  }

  changeMessage(message: string) {
    localStorage.setItem('currentMessage', message);
    this.messageSource.next(message)
  }
}
