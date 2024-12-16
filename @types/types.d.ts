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

  type simpleFilters = [string, string[]][]
  type rangeFilters = [string, number, number][]
}
export {}