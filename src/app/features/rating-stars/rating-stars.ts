import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.scss',
})
export class RatingStars {
  @Input() rating = 0; 
  @Output() ratingChange = new EventEmitter<number>();

  hoverIndex = 0;

  setHover(index: number) {
    this.hoverIndex = index;
  }

  clearHover() {
    this.hoverIndex = 0;
  }

  select(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  isActive(index: number) {
    return index <= this.rating;
  }

  isHover(index: number) {
    return index <= this.hoverIndex;
  }
}
