import * as yup from "yup"

export const LOGIN_SCHEMA = yup.object({
  email : yup.string().required().label("Email"),
  password : yup.string().required().label("Password")
})