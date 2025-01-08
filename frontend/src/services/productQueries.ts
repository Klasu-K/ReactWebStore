import axios from "axios";

const baseURL = 'http://localhost:3003/api/products'

const getFilters = () => {
  console.log("%crequesting filters", "color: green;")
  const request = axios.get<productFilters>(`${baseURL}/productFilters`)
  .then(response => response.data)
  return request
}

const getOne = (id: number) => {
  const request = axios.get<Idata>(`${baseURL}/${id}`)
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
  const request = axios.post<Idata[]>(baseURL, productQuery)
  .then(response => response.data)
  return request
}

export default {getOne, getMany, getFilters}