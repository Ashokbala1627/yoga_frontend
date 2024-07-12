import React, { useState } from "react";
import axiosInstance from "../services/axios";

const RegisterForm = () => {
  const initialFormData = {
    name: "",
    age: "",
    qualification: "",
    email: "",
    phonenumber: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //cut default reload
    setSubmitting(true);
    try {
      const response = await axiosInstance.post("/register", {
        ...formData,
        email: formData.email.toLowerCase(), //convert lowercase
      });
      console.log("Form data submitted:", response.data);
      setRegisterSuccess(true);
      setErrorMessage(response.data.message || "Registration successful!");
      setFormData(initialFormData);
      setTimeout(() => {
        setRegisterSuccess(false);
        setErrorMessage("");
      }, 5000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to register. Please try again later."
        );
      } else {
        console.error("Error submitting form:", error);
        setErrorMessage("Failed to register. Please try again later.");
      }
      setTimeout(() => {
        setRegisterSuccess(false);
        setErrorMessage("");
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container border border-light">
      <h1 className="mt-4 mb-4 text-center">Register Form</h1>
      {errorMessage && (
        <div
          className={`alert ${
            registerSuccess ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            className="form-control"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={submitting}
        >
          {submitting ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
