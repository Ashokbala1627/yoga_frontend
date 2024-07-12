import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axios";
import "../styles/Table.css";

const RegisterUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [columns, setColumns] = useState({
    name: true,
    age: true,
    qualification: true,
    email: true,
    phonenumber: true,
    address: true,
  });

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/users/${editingUser._id}`,
        editingUser
      );
      setUsers(
        users.map((u) => (u._id === editingUser._id ? response.data.user : u))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const toggleColumn = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName],
    }));
  };

  return (
    <div className="register-user-details">
      <h1>Register User's Details</h1>
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="mb-3">
            <label className="mr-2">Show Columns :</label>
            {Object.keys(columns).map((column) => (
              <div key={column} className="form-check form-check-inline ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={columns[column]}
                  onChange={() => toggleColumn(column)}
                />
                <label className="form-check-label ml-1">{column}</label>
              </div>
            ))}
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                {Object.entries(columns).map(([column, visible]) =>
                  visible ? (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ) : null
                )}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    {Object.entries(columns).map(([column, visible]) =>
                      visible ? (
                        <td key={`${user._id}-${column}`}>{user[column]}</td>
                      ) : null
                    )}
                    <td>
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={Object.keys(columns).length + 2}
                    className="text-center"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {editingUser && (
            <div className="edit-user-form">
              <h2>Edit User</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editingUser.name}
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
                    value={editingUser.age}
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
                    value={editingUser.qualification}
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
                    value={editingUser.email}
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
                    value={editingUser.phonenumber}
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
                    value={editingUser.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegisterUserDetails;
