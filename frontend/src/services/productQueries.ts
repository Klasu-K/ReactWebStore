import axios from "axios";

const baseURL = 'http://localhost:3003/api/products'

const getOne = (id: number) => {
  const request = axios.get<Idata>(`${baseURL}/${id}`)
  .then(response => response.data)
  return request
}

type simpleFilters = [string, string[]][]
type rangeFilters = [string, number, number][]

const getMany = (page: number, pageSize: number, simpleFilters : simpleFilters, rangeFilters: rangeFilters) => {
  const productQuery : IproductQuery = {
    page: page,
    pageSize: pageSize,
    sortBy: "price",
    sortOrder: -1,
    simpleFilters: simpleFilters,
    rangeFilters: rangeFilters,
  }
  const request = axios.post<Idata>(baseURL, productQuery)
  .then(response => response.data)
  return request
}

export default {getOne, getMany,}