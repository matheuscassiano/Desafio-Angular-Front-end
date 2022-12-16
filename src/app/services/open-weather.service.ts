import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<IWeather> {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    let params = new HttpParams();
    params = params.append("lat", lat);
    params = params.append("lon", lon);
    params = params.append("units", "metric");
    params = params.append("appid", "0bb82d7936625fe0c5bac3e995560c8a");

    return this.http.get<IWeather>(baseUrl, { params })
  }
}
