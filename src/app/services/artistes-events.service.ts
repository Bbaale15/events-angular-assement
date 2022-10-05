import { Injectable } from '@angular/core';
import { IArtisteEvent } from '../models/IArtisteEvent';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistesEventsService {

  private DATA_URL: string = "/assets/data/artistes-events.json";

  constructor(private httpClient: HttpClient) { }

  getArtistesEvents():Observable<IArtisteEvent[]> {
    return this.httpClient.get<IArtisteEvent[]>(this.DATA_URL);
  }
}
