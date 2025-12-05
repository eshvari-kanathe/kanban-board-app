import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email id required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);

  const routeChange = () => {
    navigate("/signUp");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-1 text-slate-800">
          Sign In
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            if (!storedUser) {
              toast.error("No account found. Please sign up first.", {
                autoClose: 1500,
                transition: Bounce,
              });
              return;
            }

            const isMatch =
              storedUser.email === values.email &&
              storedUser.password === values.password;

            if (!isMatch) {
              toast.error("Wrong email or password.", {
                autoClose: 1500,
                transition: Bounce,
              });
              actions.resetForm();
              return;
            }

            dispatch(login());
            actions.resetForm();

            navigate("/dashboard");
          }}
        >
          {() => (
            <Form className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Email :</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Password :</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-200 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-500 transition font-semibold"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Don't have an account?{" "}
                <button
                  onClick={routeChange}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
