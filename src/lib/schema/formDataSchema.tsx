import * as yup from "yup";

export const FORM_DATA_SCHEMA = yup.object({
  company: yup.string().required().label("Company"),
  numUsers: yup.string().required().label("Number of Users"),
  numProducts: yup.string().required().label("Number of Products"),
  percentage: yup.string().required().label("Number of Products"),
});
