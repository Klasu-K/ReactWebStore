import axios from "axios";
const baseURL = getApiBaseUrl()

const getFilters = () => {
  console.log("%crequesting filters", "color: green;")
  const request = axios.get<productFilters>(`${baseURL}/productFilters`)
  .then(response => response.data)
  return request
}

const getOne = (id: number) => {
  const request = axios.get<productData>(`${baseURL}/${id}`)
  .then(response => response.data)
  return request
}

type simpleFilters = [string, string[]][]
type rangeFilters = [string, number, number][]

const getMany = (page: number, pageSize: number, simpleFilters : simpleFilters, rangeFilters: rangeFilters) => {
  console.log("%crequesting products", "color: green;")
  const productQuery : IproductQuery = {
    page: page,
    pageSize: pageSize,
    sortBy: "price",
    sortOrder: -1,
    simpleFilters: simpleFilters,
    rangeFilters: rangeFilters,
  }
  const request = axios.post<productData[]>(baseURL, productQuery)
  .then(response => 
    {
      return response.data
    })
  return request
}

function getApiBaseUrl() {
  /* function is hoisted up so it's not arrow function */
  //!COULD cause problems on production, test if error is because of this
  // const baseURL = window.location.href;
  const baseURL = import.meta.env.VITE_API_URL;
  if(!baseURL) {
    console.error("api url not defined")
  }
  return `${baseURL}/api/products`;
};

export default {getOne, getMany, getFilters}