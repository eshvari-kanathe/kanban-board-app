import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../redux/slices/authSlice";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-1
         text-cyan-800"
         >
          Sign Up
        </h1>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            dispatch(
              registerUser({ email: values.email, password: values.password })
            );
            actions.resetForm();
            navigate("/");
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
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <button
                  onClick={goToLogin}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Login
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
