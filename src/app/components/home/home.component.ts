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
  // image: any;
  // slides: any[];
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
    // this.getCarouselImage();
  }


  // getCarouselImage() {
  //   this._carouselService.getCarouselImage().subscribe({
  //     next: (res: any) => {
  //       this.slides = res;
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }


  // goToPrevious() {
  //   const isFirstSlide = this.currentIndex === 0;
  //   const newIndex = isFirstSlide
  //     ? this.slides.length - 1
  //     : this.currentIndex - 1;
  //   this.resetTimer();
  //   this.currentIndex = newIndex;
  // }

  // goToNext() {
  //   if(this.slides)
  //   {
  //     const isLastSlide = this.currentIndex === this.slides.length - 1;
  //     const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
  //     this.resetTimer();
  //     this.currentIndex = newIndex;
  //   }

  // }

  // getCurrentSlideUrl() {
  //   return `url('${this.slides[this.currentIndex].imageUrl}')`;
  // }
  // goToSlide(slideIndex: any) {
  //   this.resetTimer();
  //   this.currentIndex = slideIndex;
  // }

  // resetTimer() {
  //   if (this.timeoutId) {
  //     window.clearTimeout(this.timeoutId);
  //   }
  //   this.timeoutId = window.setTimeout(() => this.goToNext(), 5000);
  // }

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
interface SlideInterface
{
  url:string,
  title:string;
}