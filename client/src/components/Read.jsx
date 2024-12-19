import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Read = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);  // To store the employee being edited
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/read");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);  // Set the employee to edit
  };

  const handleChange = (e) => {
    setEditingEmployee({
      ...editingEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`http://localhost:5000/update/${editingEmployee.employee_id}`, editingEmployee);
      toast.success(response.data.message);  // Toast on successful update
      setEditingEmployee(null);  // Close the form after updating
      window.location.reload();  // Refresh the list
    } catch (error) {
      toast.error("Error updating employee data.");  // Toast on error
      console.error("Error updating employee data:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await Axios.delete(`http://localhost:5000/delete/${employeeId}`);
      toast.success(response.data.message);  // Toast on successful delete
      setEmployees(employees.filter((employee) => employee.employee_id !== employeeId));  // Remove the deleted employee from the list
    } catch (error) {
      toast.error("Error deleting employee.");  // Toast on error
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.date_of_joining}</td>
              <td>{employee.role}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.employee_id)}>Delete</button>  {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <div>
          <h2>Edit Employee Details</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingEmployee.name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Employee ID:
              <input
                type="text"
                name="employee_id"
                value={editingEmployee.employee_id}
                onChange={handleChange}
                required
                disabled
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editingEmployee.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={editingEmployee.phone}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={editingEmployee.department}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Date of Joining:
              <input
                type="date"
                name="date_of_joining"
                max={new Date().toISOString().split("T")[0]}
                value={editingEmployee.date_of_joining}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={editingEmployee.role}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      <div>
        <button className="btn btn-success" onClick={() => navigate('/')}>Back</button>
      </div>
      <ToastContainer />  {/* Display toast notifications */}
    </div>
  );
};

export default Read;
