import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:8889'
})

export default request