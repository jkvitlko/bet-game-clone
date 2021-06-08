import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Users, Pager } from '../../../models/userModel';
import  range  from 'lodash/range';

export const MAGIC_NUMBERS = {
  VALUE_FOUR: 4,
  VALUE_FIVE: 5,
  VALUE_SIX: 6,
  VALUE_NINE: 9,
  VALUE_TEN: 10,
  VALUE_THIRTY: 30
};
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements  OnChanges {

  @Input() allResults: Users[];
  @Input() pageSize: number;
  @Output() currentResults = new EventEmitter<Users[]>();

  pager: Pager = {
    totalItems: 0,
    currentPage: 1,
    pageSize: 30,
    totalPages: 1,
    startPage: 1,
    endPage: 1,
    startIndex: 1,
    endIndex: 1,
    pages: []
  };


  constructor() { }

  GetPager(totalItems: number, currentPage: number, pageSize: number): void {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || MAGIC_NUMBERS.VALUE_THIRTY;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= MAGIC_NUMBERS.VALUE_TEN) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= MAGIC_NUMBERS.VALUE_SIX) {
        startPage = 1;
        endPage = MAGIC_NUMBERS.VALUE_TEN;
      } else if (currentPage + MAGIC_NUMBERS.VALUE_FOUR >= totalPages) {
        startPage = totalPages - MAGIC_NUMBERS.VALUE_NINE;
        endPage = totalPages;
      } else {
        startPage = currentPage - MAGIC_NUMBERS.VALUE_FIVE;
        endPage = currentPage + MAGIC_NUMBERS.VALUE_FOUR;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    this.pager.totalItems = totalItems;
    this.pager.currentPage = currentPage;
    this.pager.pageSize = pageSize;
    this.pager.totalPages = totalPages;
    this.pager.startPage = startPage;
    this.pager.endPage = endPage;
    this.pager.startIndex = startIndex;
    this.pager.endIndex = endIndex;
    this.pager.pages = pages;
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.GetPager(this.allResults.length, page, this.pageSize);

    // get current page of items
    // this.items = this.allResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // use setTimeout as a workaround for now....
    setTimeout(() => this.currentResults.emit(this.allResults.slice(this.pager.startIndex,
      this.pager.endIndex + 1)), 0);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName === 'allResults') {
        this.allResults = changedProp.currentValue;
        this.pager.totalPages = 1;
        this.setPage(1);
        break;
      }
    }
  }

}
