import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel/carousel.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetailsPage: boolean = false
  image: any;
  slides: any[];
  currentIndex: number = 0;
  timeoutId?: number;
  constructor(private _productService: ProductService,
    private _carouselService: CarouselService) { }
  ngOnInit(): void {
    this.resetTimer();
    this.getCarouselImage();
  }



  getCarouselImage() {
    this._carouselService.getCarouselImage().subscribe({
      next: (res: any) => {
        this.slides = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }


  goToPrevious() {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;
    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext() {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.resetTimer();
    this.currentIndex = newIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].imageUrl}')`;
  }
  goToSlide(slideIndex: any) {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 5000);
  }

}
