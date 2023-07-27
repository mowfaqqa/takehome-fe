import AppLayout from "@/components/Applayout";
import { InputField } from "@/components/Inputfields";
import { FORM_DATA_SCHEMA } from "@/lib/schema/formDataSchema";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { notifyError, notifySuccess } from "@/lib/notification";
import Button from "@/components/Button";

const Dashboard = () => {
  // const router = useRouter();
  const [percentage, setPercentage] = React.useState(0);
  const [userNumbers, setUserNumbers] = React.useState(0);
  const [productNumber, setProductNumber] = React.useState(0);
  const calculatePercentage = (numUsers: number, numProducts: number) => {
    if (numUsers === 0 || numProducts === 0) {
      return 0;
    }
    const percentage = (numUsers / numProducts) * 100;

    setPercentage(percentage);
  };

  const handleFormMutation = useMutation(
    async (data: any) => {
      const res = await axios.post(
        "https://takehome-backend.onrender.com/api/submit",
        { ...data }
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        console.log(res);
        notifySuccess(res.message ?? "FormSUbmitted successfully");
      },
      onError: () => {
        notifyError("An Error occured while submitting Form");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      company: "",
      numUsers: "",
      numProducts: "",
      percentage: percentage,
    },
    validationSchema: FORM_DATA_SCHEMA,
    onSubmit: (values) => {
      const val: any = { ...values, percentage: percentage };
      val.numUsers = parseInt(val.numUsers);
      val.numProducts = parseInt(val.numProducts);
      calculatePercentage(parseInt(val.numUsers), parseInt(val.numProducts));
      handleFormMutation.mutate(val);
    },
  });
  return (
    <div className="px-4">
      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-gray-900">Form Data</h2>
        <p className="text-base text-gray-500 py-1">
          Please fill in the required details below
        </p>
        <div>
          <InputField
            label="Company"
            id="company"
            name="company"
            type="text"
            placeholder="enter company name"
            required
            error={!!formik?.touched?.company && !!formik?.errors?.company}
            helperText={!!formik?.touched?.company && formik?.errors?.company}
            inputProps={{
              value: formik?.values?.company,
              onChange: formik?.handleChange("company"),
              onBlur: formik?.handleBlur("company"),
            }}
          />
          <InputField
            label="Number of Users"
            id="numUsers"
            name="numUsers"
            type="number"
            placeholder="enter number of users"
            required
            error={!!formik?.touched?.numUsers && !!formik?.errors?.numUsers}
            helperText={!!formik?.touched?.numUsers && formik?.errors?.numUsers}
            inputProps={{
              value: formik?.values?.numUsers,
              onChange: formik?.handleChange("numUsers"),
              onBlur: formik?.handleBlur("numUsers"),
            }}
          />
          <InputField
            label="Number of Products"
            id="numProducts"
            name="numProducts"
            type="number"
            placeholder="enter number of products"
            required
            error={
              !!formik?.touched?.numProducts && !!formik?.errors?.numProducts
            }
            helperText={
              !!formik?.touched?.numProducts && formik?.errors?.numProducts
            }
            inputProps={{
              value: formik?.values?.numProducts,
              onChange: formik?.handleChange("numProducts"),
              onBlur: formik?.handleBlur("numProducts"),
            }}
          />
          <InputField
            label="Percentage"
            id="percentage"
            name="percentage"
            type="text"
            placeholder="percentage"
            required
            error={
              !!formik?.touched?.percentage && !!formik?.errors?.percentage
            }
            helperText={
              !!formik?.touched?.percentage && formik?.errors?.percentage
            }
            inputProps={{
              value: percentage,
              onChange: formik?.handleChange("percentage"),
              onBlur: formik?.handleBlur("percentage"),
            }}
          />
        </div>

        <div className="mt-3 flex flex-col">
          <Button variant="primary" onClick={formik.handleSubmit}>
            {handleFormMutation.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
