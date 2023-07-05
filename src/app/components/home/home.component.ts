import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel/carousel.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  productDetailsPage: boolean = false

  
  currentIndex: number = 0;
  timeoutId?: number;

  slides: SlideInterface[] = [
    { url: '/assets/images/image-1.png', title: 'mac' },
    { url: '/assets/images/image-2.png', title: 'microphone' },
    { url: '/assets/images/image-3.png', title: 'camera' },
  ];


  constructor(private _productService: ProductService,
    private _carouselService: CarouselService) { }
  ngOnInit(): void {
    this.resetTimer();
  }

  // getSlideTransform(slideIndex: number) {
  //   const difference = slideIndex - this.currentIndex;
  //   const translateXValue = difference * 100; // Adjust this value as needed
  //   return `translateX(${translateXValue}%)`;
  // }
  
  getSlideTransform() {
    const translateXValue = -this.currentIndex * 100; // Adjust this value as needed
    return `translateX(${translateXValue}%)`;
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 6000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }   

}
interface SlideInterface {
  url: string,
  title: string;
}