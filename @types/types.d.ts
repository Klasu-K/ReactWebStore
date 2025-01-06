declare global {
  interface Idata {
    id: number;
    name: string;
    price: number;
    description: string;
  }

  interface IproductQuery {
    page: number;
    pageSize: number;
    sortBy: "name" | "price";
    sortOrder: 1 | -1;
    simpleFilters: [string, string[]][]
    rangeFilters: [string, number, number][]
  } 
  type simpleFilter = [string, string[]]
  type rangeFilter = [string, number, number]
  interface productFilters {
    simpleFilters: simpleFilter[],
    rangeFilters: rangeFilter[]
  }
}
export {}