import axios from "axios";

const baseURL = 'http://localhost:3003/api/products'

const getOne = (id: number) => {
  const request = axios.get<Idata>(`${baseURL}/${id}`)
  .then(response => response.data)
  return request
}
const getMany = (page: number, pageSize: number) => {
  const productQuery : IproductQuery = {
    page: page,
    pageSize: pageSize,
    sortBy: "price",
    sortOrder: -1,
    simpleFilters: [
      ["brand",["ProCell", "EliteTech", "MegaPixel"]],
    ],
    rangeFilters: [
      ["storageCapacity", 100, 1000]
    ]
  }
  const request = axios.post<Idata>(baseURL, productQuery)
  .then(response => response.data)
  return request
}

export default {getOne, getMany,}