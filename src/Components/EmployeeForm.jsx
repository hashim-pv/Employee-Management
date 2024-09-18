import React, { useState, useEffect } from 'react';

function EmployeeForm({ addEmployee, updateEmployee, editingEmployee, setEditingEmployee }) {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    status: 'active'
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(formData);
    } else {
      addEmployee(formData);
    }
    setFormData({
      id: '',
      username: '',
      email: '',
      status: 'active'
    });
    setEditingEmployee(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID"
        required
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit">
        {editingEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
      {editingEmployee && <button className='delete' type="button" onClick={() => setEditingEmployee(null)}>Cancel</button>}
    </form>
  );
}

export default EmployeeForm;
