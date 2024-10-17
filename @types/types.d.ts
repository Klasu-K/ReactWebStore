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
    filters: [string, string[]][]
  } 
}
export {}