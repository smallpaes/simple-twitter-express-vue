import { apiHelper } from "../utils/helpers"

export default {
  logIn({ email, password }) {
    return apiHelper.post('/users/login', {
      email,
      password
    })
  },
  signUp({ name, email, password, passwordCheck }) {
    return apiHelper.post('/users/signup', {
      name,
      email,
      password,
      passwordCheck
    })
  }
}