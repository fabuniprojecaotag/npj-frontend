export interface ListCacheEntry {
  list: any[];
  firstDoc: any;
  lastDoc: any;
  pageSize: number;
  totalSize: number;
}

export const cache: { [count: number]: ListCacheEntry } = {};
