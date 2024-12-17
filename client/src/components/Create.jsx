import React, { useState } from "react";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    email: "",
    phone: "",
    department: "",
    date_of_joining: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Register Here👇</h1>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="First and Last Name"
          />
        </div>
        <div>
          <label htmlFor="employee_id">Employee ID:</label>
          <input
            type="text"
            id="employee_id"
            name="employee_id"
            onChange={handleChange}
            maxLength="10"
            placeholder="Unique ID"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            maxLength="10"
            placeholder="10-digit number"
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select id="department" name="department" onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label htmlFor="date_of_joining">Date of Joining:</label>
          <input
            type="date"
            id="date_of_joining"
            name="date_of_joining"
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            onChange={handleChange}
            placeholder="e.g., Manager, Developer"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
