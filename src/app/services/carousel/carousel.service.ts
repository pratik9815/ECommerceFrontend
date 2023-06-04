import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  apiUrl:string = "https://localhost:7069/api/Carousel/carousel-images";
  constructor(private _httpClient: HttpClient) { }

  getCarouselImage()
  {
    return this._httpClient.get(this.apiUrl);
  }
}
