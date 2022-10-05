import { IArtisteEvent } from './models/IArtisteEvent';
import { Component, OnInit } from '@angular/core';
import { ArtistesEventsService } from './services/artistes-events.service';
import { Observable } from 'rxjs';
import {NgForm} from '@angular/forms';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'events-app';
  artistesEvents$: Observable<IArtisteEvent[]>;

  constructor(private artistesEventsService: ArtistesEventsService) {
  }

  ngOnInit(): void {
   this.artistesEvents$ = this.getEvents();
  }

  onFilter(formData: NgForm) {
    let filteredResults$ = this.getEvents();

    const city = formData.value.city.trim();
    const priceStr = formData.value.price.trim();
    const searchQuery = city.toLowerCase();

    if(city){
      filteredResults$ = this.getEvents().pipe(map(items => this.filterByCity(items, searchQuery)));
    }

    if(priceStr !== "" && !isNaN(priceStr)){
      filteredResults$ = this.getEvents().pipe(map(items => this.filterByPrice(items, Number(priceStr))));
    }

    if(city && (priceStr !== "" && !isNaN(priceStr))){
      filteredResults$ = this.getEvents().pipe(map(items => this.filterByCityAndPrice(items, searchQuery, Number(priceStr))));
    }

    this.artistesEvents$ = filteredResults$;
  }

  private filterByCity(artistesEvents:IArtisteEvent[], cityKeyword: string) {
    return artistesEvents.filter(item => item.city.toLowerCase().indexOf(cityKeyword) > -1);
  }

  private filterByPrice(artistesEvents:IArtisteEvent[], priceKeyword: number) {
    return artistesEvents.filter(item => item.price <= priceKeyword);
  }

  private filterByCityAndPrice(artistesEvents:IArtisteEvent[], cityKeyword: string, priceKeyword: number) {
    return artistesEvents.filter(item => ((item.city.toLowerCase().indexOf(cityKeyword) > -1) && (item.price <= priceKeyword)));
  }

  private getEvents(): Observable<IArtisteEvent[]>{
    return this.artistesEventsService.getArtistesEvents();
  }
}
