import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShazamService {

  constructor(private http: HttpClient) { }

  getSongs(term: string): Observable<any> {
    const baseUrl = "https://shazam.p.rapidapi.com/search";

    let headers = new HttpHeaders();
    headers = headers.set("X-RapidAPI-Key", "138a05b17emsha092c8968711c7ep13011djsnfe56d6e04d34");
    headers = headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");

    let params = new HttpParams();
    params = params.append("term", term);
    params = params.append("locale", "pt-BR");
    params = params.append("offset", 0);
    params = params.append("limit", 5);

    return this.http.get<any>(baseUrl, { headers, params })
  }
}
