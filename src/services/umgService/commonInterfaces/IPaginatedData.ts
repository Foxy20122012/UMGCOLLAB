export interface IPaginatedData<T> {
  items?: T[]
  meta: PaginationData
}

export interface PaginationData {
  currentPage: number
  itemCount: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface ISearchPaginatedData<T> {
  items?: T[]
  meta: PaginationData
  extraData: ISearchPaginatedDataAvailableFilters
}

export interface ISearchPaginatedDataAvailableFilters {
  areas?: string[]
  areasIds?: string[]
}
