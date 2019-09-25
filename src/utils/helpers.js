import axios from "axios"
import Swal from "sweetalert2"

const baseURL = 'https://simple-twitter-api.herokuapp.com'

// customize axios instance with baseURL
const axiosInstance = axios.create({
  baseURL
})

// intercept request and set token to header
axiosInstance.interceptors.request.use(config => {
  // retrieve token from localStorage
  const token = localStorage.getItem('token')
  // set token to header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
},
  err => Promise.reject(err))

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})