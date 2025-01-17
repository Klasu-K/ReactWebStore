declare global {
  interface productData {
    id: number;
    numberId: number;
    name: string;
    price: number;
    description: string;
    category: string,
    brand: string,
    "operating system": string,
    "storage capacity": number,
    "camera type": string,
    "battery capacity": number, 
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
  type SimpleFilterKey = {
    category: string;
    filter: string;
  };
  type simpleFilter = [string, string[]]
  type rangeFilter = [string, number, number]
  interface productFilters {
    simpleFilters: simpleFilter[],
    rangeFilters: rangeFilter[],
  }
}
export {}