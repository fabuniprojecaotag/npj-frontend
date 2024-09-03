export interface CacheEntry {
  list: any[];
  firstDoc: any;
  lastDoc: any;
  pageSize: number;
  totalSize: number;
}

export const cache: { [count: number]: CacheEntry } = {};
