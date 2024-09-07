import { Injectable } from '@angular/core';
import { ListCacheEntry } from '../core/types/list-cache-entry';
import { TEN_MINUTES_IN_MILLISECONDS } from '../shared/constants/constants';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class CacheHandlerService {

  constructor(private paginationService: PaginationService) {}

  startCacheCleaner(callback: (cache: ListCacheEntry, currentPageSize: number) => void, intervalTime: number = TEN_MINUTES_IN_MILLISECONDS) {
    setInterval(() => {
      const clearedCache = this.paginationService.clearCache();
      callback(clearedCache, 0);
    }, intervalTime);
  }
}
