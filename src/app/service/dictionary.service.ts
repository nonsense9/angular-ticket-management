import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Word} from "../models/word.";

@Injectable({providedIn: 'root'})
export class DictionaryService {

  constructor(private http: HttpClient) {}

  public getWord(value: string): Observable<Word[]> {
   return this.http.get<Word[]>(`${environment.dictionaryApiURL}${value}`)
  }
}
