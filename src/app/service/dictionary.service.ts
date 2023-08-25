import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Dictionary} from "../models/dictionary";

@Injectable({providedIn: 'root'})
export class DictionaryService {

  constructor(private http: HttpClient) {}

  public getWord(value: string): Observable<Dictionary[]> {
   return this.http.get<Dictionary[]>(`${environment.dictionaryApiURL}${value}`)
  }
}
