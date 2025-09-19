import React, { useState } from "react";

const EyeSlashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228"
    />
  </svg>
);

const EyeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "Shantel",
    lastName: "Salvador",
    email: "shansalvadr@gmail.com",
    phoneNumber: "09981867570",
    password: "******************",
    confirmPassword: "******************",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("You must agree to the Terms and Privacy Policies.");
      return;
    }
    console.log("Creating account with:", formData);
    alert("Check the console for form data. Signup logic not implemented.");
  };

  const renderInputField = (id, name, type, label) => (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required
        value={formData[name]}
        onChange={handleChange}
        className="peer h-12 w-full border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-transparent p-3"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-amber-600"
      >
        {label}
      </label>
    </div>
  );

  const renderPasswordField = (id, name, label, show, toggleShow) => (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        required
        value={formData[name]}
        onChange={handleChange}
        className="peer h-12 w-full border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-transparent p-3"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-amber-600"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={toggleShow}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-amber-600"
      >
        {show ? (
          <EyeIcon className="w-5 h-5" />
        ) : (
          <EyeSlashIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-left">
          <h1 className="text-4xl font-bold">Sign up</h1>
          <p className="mt-2 text-gray-500">
            Let's get you all set up so you can access your personal account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInputField("first-name", "firstName", "text", "First Name")}
            {renderInputField("last-name", "lastName", "text", "Last Name")}
            {renderInputField("email", "email", "email", "Email")}
            {renderInputField(
              "phone-number",
              "phoneNumber",
              "tel",
              "Phone Number"
            )}
            {renderPasswordField(
              "password",
              "password",
              "Password",
              showPassword,
              () => setShowPassword(!showPassword)
            )}
            {renderPasswordField(
              "confirm-password",
              "confirmPassword",
              "Confirm Password",
              showConfirmPassword,
              () => setShowConfirmPassword(!showConfirmPassword)
            )}
          </div>

          <div className="flex items-center">
            <input
              id="agree-to-terms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
            />
            <label
              htmlFor="agree-to-terms"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to all the{" "}
              <a href="#" className="font-medium hover:text-amber-600">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium hover:text-amber-600">
                Privacy Policies
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-amber-500 hover:text-amber-600"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
