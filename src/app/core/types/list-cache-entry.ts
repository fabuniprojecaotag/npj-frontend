export interface ListCacheEntry<T> {
  list: Array<T>;
  firstDoc: T;
  lastDoc: T;
  pageSize: number;
  totalSize: number;
}

export const cache: { [count: number]: ListCacheEntry<any> } = {};
