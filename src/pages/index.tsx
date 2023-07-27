import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/components/Applayout";
import Button from "@/components/Button";
import { useFormik } from "formik";
import { InputField } from "@/components/Inputfields";
import { LOGIN_SCHEMA } from "@/lib/schema/authSchema";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface loginProps {
  email: string;
  password: string;
}
export default function Home() {
  const router = useRouter();
  const handlelogin = useMutation(
    async (data: loginProps) => {
      const response = await axios.post(
        "https://takehome-backend.onrender.com/api/auth/login",
        { ...data }
      );
      return response.data;
    },
    {
      onSuccess: (res) => {
        router.push("/dashboard");
        localStorage.setItem('userData', JSON.stringify(res))
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
      handlelogin.mutate(values);
    },
  });
  return (
    <div className="max-w-4xl mx-auto mt-14">
      <div className="  bg-gray-50 ">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Login</h2>
          <p className="text-base text-gray-500 py-1">
            Please fill in the details below
          </p>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-2 mx-auto">
            <div className="flex flex-col">
              <InputField
                label="Email"
                id="email"
                name="email"
                type="text"
                placeholder="example@gmail.com"
                required
                error={!!formik?.touched?.email && !!formik?.errors?.email}
                helperText={!!formik?.touched?.email && formik?.errors?.email}
                inputProps={{
                  value: formik?.values?.email,
                  onChange: formik?.handleChange("email"),
                  onBlur: formik?.handleBlur("email"),
                }}
              />

              <InputField
                label=" Password"
                id="password"
                name="password"
                type="password"
                placeholder="**********"
                required
                error={
                  !!formik?.touched?.password && !!formik?.errors?.password
                }
                helperText={
                  !!formik?.touched?.password && formik?.errors?.password
                }
                inputProps={{
                  value: formik?.values?.password,
                  onChange: formik?.handleChange("password"),
                  onBlur: formik?.handleBlur("password"),
                }}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col">
            <Button variant="primary" onClick={formik.handleSubmit}>
              {handlelogin.isLoading ? "Logging In..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
