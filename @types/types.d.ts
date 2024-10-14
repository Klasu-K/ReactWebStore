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
  } 
}
export {}