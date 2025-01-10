declare global {
  interface Idata {
    id: number;
    numberId: number;
    name: string;
    price: number;
    description: string;
  }

  interface IproductQuery {
    page: number;
    pageSize: number;
    sortBy: "name" | "price";
    sortOrder: 1 | -1;
    simpleFilters: simpleFilter[];
    rangeFilters: rangeFilter[];
  } 
  type rangeFiltersMap = Map<string, [number, number]>
  type simpleFiltersMap = Map<string, Map<string,boolean>>
  type simpleFilter = [string, string[]]
  type rangeFilter = [string, number, number]
  interface productFilters {
    simpleFilters: simpleFilter[],
    rangeFilters: rangeFilter[],
  }
}
export {}