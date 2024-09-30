import axios from "axios";

const baseURL = 'http://localhost:3003/api/products'

const getOne = (id: number) => {
  const request = axios.get<Idata>(`${baseURL}/${id}`)
  .then(response => response.data)
  return request
}

const getMany = (page: number, pageSize: number) => {
  const request = axios.post<Idata>(baseURL, {
    page: page,
    pageSize: pageSize
  })
  .then(response => response.data)
  return request
}

export default {getOne, getMany,}