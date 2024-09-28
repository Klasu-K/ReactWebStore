import axios from "axios";

const baseURL = 'http://localhost:3003/api/products/10'

const get = (id: number) => {
  const request = axios.get<Idata>(`http://localhost:3003/api/products/${id}`)
  return request.then(response => response.data)
}

export default {get}